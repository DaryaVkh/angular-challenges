#!/usr/bin/env node
/**
 * Migrate Nx workspace to Angular CLI workspace.
 *
 * Usage:
 *   node scripts/migrate-nx-to-angular.js --dry-run            # preview
 *   node scripts/migrate-nx-to-angular.js --dry-run --verbose  # preview + full angular.json
 *   node scripts/migrate-nx-to-angular.js                      # apply
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// ─── Executor map: Nx → Angular CLI ──────────────────────────────────────────

const EXECUTOR_MAP = {
  '@nx/angular:application': '@angular/build:application',
  '@angular-devkit/build-angular:application': '@angular/build:application',
  '@angular/build:application': '@angular/build:application',
  '@nx/angular:dev-server': '@angular-devkit/build-angular:dev-server',
  '@angular-devkit/build-angular:dev-server': '@angular-devkit/build-angular:dev-server',
  '@nx/angular:browser': '@angular-devkit/build-angular:browser',
  '@angular-devkit/build-angular:browser': '@angular-devkit/build-angular:browser',
  '@nx/angular:server': '@angular-devkit/build-angular:server',
  '@angular-devkit/build-angular:server': '@angular-devkit/build-angular:server',
  '@nx/angular:extract-i18n': '@angular-devkit/build-angular:extract-i18n',
  '@angular-devkit/build-angular:extract-i18n': '@angular-devkit/build-angular:extract-i18n',
  '@nx/jest:jest': '@angular-devkit/build-angular:jest',
  '@nx/eslint:lint': '@angular-eslint/builder:lint',
  '@angular-eslint/builder:lint': '@angular-eslint/builder:lint',
  '@nx/angular:ng-packagr-lite': 'ng-packagr:build',
  'ng-packagr:build': 'ng-packagr:build',
  '@nx/js:tsc': '@angular-devkit/build-angular:ng-packagr',
};

function translateExecutor(executor) {
  return EXECUTOR_MAP[executor] ?? executor;
}

// ─── Walk directories looking for project.json ───────────────────────────────

function findProjectJsonFiles(baseDir) {
  const results = [];

  function walk(dir) {
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      const sub = path.join(dir, entry.name);
      const projectJson = path.join(sub, 'project.json');
      if (fs.existsSync(projectJson)) {
        results.push(projectJson);
      } else {
        walk(sub);
      }
    }
  }

  if (fs.existsSync(baseDir)) walk(baseDir);
  return results;
}

// ─── Parse project.json and build Angular CLI project entry ──────────────────

function parseProject(projectJsonPath) {
  let config;
  try {
    config = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
  } catch (e) {
    console.warn(`  ⚠ Cannot parse ${projectJsonPath}: ${e.message}`);
    return null;
  }

  const absRoot = path.dirname(projectJsonPath);
  const root = path.relative(ROOT, absRoot).replace(/\\/g, '/');
  const sourceRoot = config.sourceRoot?.replace(/\\/g, '/') ?? `${root}/src`;

  const architect = {};
  for (const [targetName, target] of Object.entries(config.targets ?? {})) {
    const entry = { builder: translateExecutor(target.executor) };
    if (target.options && Object.keys(target.options).length) {
      entry.options = target.options;
    }
    if (target.configurations && Object.keys(target.configurations).length) {
      entry.configurations = target.configurations;
    }
    if (target.defaultConfiguration) {
      entry.defaultConfiguration = target.defaultConfiguration;
    }
    architect[targetName] = entry;
  }

  return {
    name: config.name,
    entry: {
      projectType: config.projectType,
      root,
      sourceRoot,
      architect,
    },
  };
}

// ─── Build output angular.json ────────────────────────────────────────────────

function buildAngularJson(projects) {
  return {
    $schema: './node_modules/@angular/cli/lib/config/schema.json',
    version: 1,
    cli: { packageManager: 'npm' },
    projects,
  };
}

// ─── Dry-run report ───────────────────────────────────────────────────────────

function printReport(projects, filesToBackup, angularJsonPath) {
  console.log('\n════════════════════════════════════════════');
  console.log('  DRY RUN — no files will be changed');
  console.log('════════════════════════════════════════════\n');

  const exists = fs.existsSync(angularJsonPath);
  console.log(`FILES TO ${exists ? 'UPDATE' : 'CREATE'}:\n`);
  console.log(`  angular.json`);

  const apps = Object.entries(projects).filter(([, p]) => p.projectType === 'application');
  const libs = Object.entries(projects).filter(([, p]) => p.projectType === 'library');

  console.log(`\nAPPLICATIONS (${apps.length}):\n`);
  for (const [name, proj] of apps) {
    const targets = Object.keys(proj.architect);
    const builders = targets.map((t) => proj.architect[t].builder).join(', ');
    console.log(`  ${name}`);
    console.log(`    root:     ${proj.root}`);
    console.log(`    targets:  ${targets.join(', ') || '(none)'}`);
    if (VERBOSE) console.log(`    builders: ${builders}`);
  }

  if (libs.length) {
    console.log(`\nLIBRARIES (${libs.length}):\n`);
    for (const [name, proj] of libs) {
      const targets = Object.keys(proj.architect);
      console.log(`  ${name}`);
      console.log(`    root:    ${proj.root}`);
      console.log(`    targets: ${targets.join(', ') || '(none)'}`);
    }
  }

  if (filesToBackup.length) {
    console.log('\nFILES TO BACK UP (rename, not delete):\n');
    for (const f of filesToBackup) {
      console.log(`  ${path.relative(ROOT, f)} → ${path.relative(ROOT, f)}.bak`);
    }
  }

  if (VERBOSE) {
    console.log('\n────────── angular.json preview ──────────\n');
    const angularJson = buildAngularJson(projects);
    console.log(JSON.stringify(angularJson, null, 2));
  } else {
    console.log('\nTip: add --verbose to see full angular.json content.');
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log(`\nNx → Angular CLI migration`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'APPLY'}\n`);

  const allFiles = [
    ...findProjectJsonFiles(path.join(ROOT, 'apps')),
    ...findProjectJsonFiles(path.join(ROOT, 'libs')),
  ];

  console.log(`Found ${allFiles.length} project.json file(s).\n`);

  const projects = {};

  for (const p of allFiles) {
    const result = parseProject(p);
    if (!result) continue;
    if (projects[result.name]) {
      console.warn(`  ⚠ Duplicate project name "${result.name}" — skipping ${p}`);
      continue;
    }
    projects[result.name] = result.entry;
  }

  const filesToBackup = ['nx.json'].map((f) => path.join(ROOT, f)).filter(fs.existsSync);
  const angularJsonPath = path.join(ROOT, 'angular.json');

  if (DRY_RUN) {
    printReport(projects, filesToBackup, angularJsonPath);
    return;
  }

  // Apply
  const angularJson = buildAngularJson(projects);
  fs.writeFileSync(angularJsonPath, JSON.stringify(angularJson, null, 2) + '\n', 'utf-8');
  console.log(`✓ Written angular.json (${Object.keys(projects).length} projects)`);

  for (const f of filesToBackup) {
    fs.renameSync(f, f + '.bak');
    console.log(`✓ Backed up ${path.relative(ROOT, f)} → ${path.relative(ROOT, f)}.bak`);
  }

  console.log('\nDone. Next steps:');
  console.log('  1. Review angular.json — verify builder options per app');
  console.log('  2. Remove @nx/* devDependencies from package.json');
  console.log('  3. Replace "ng": "nx" → "ng": "ng" in package.json scripts');
  console.log('  4. npm install && ng build <app-name> to verify');
}

main();
