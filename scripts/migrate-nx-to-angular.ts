#!/usr/bin/env ts-node
/**
 * Migrate Nx workspace to Angular CLI workspace.
 *
 * Usage:
 *   ts-node scripts/migrate-nx-to-angular.ts --dry-run   # preview changes
 *   ts-node scripts/migrate-nx-to-angular.ts             # apply changes
 *
 * What this script does:
 *   1. Scans apps/** for all project.json files (each is an Nx app)
 *   2. Also scans libs/** for library project.json files
 *   3. Translates Nx targets -> Angular CLI architect entries
 *   4. Writes a unified angular.json at project root
 *   5. Backs up nx.json -> nx.json.bak (doesn't delete)
 */

import * as fs from 'fs';
import * as path from 'path';

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// ─── Types ───────────────────────────────────────────────────────────────────

interface NxTarget {
  executor: string;
  options?: Record<string, unknown>;
  configurations?: Record<string, unknown>;
  defaultConfiguration?: string;
  dependsOn?: string[];
}

interface NxProjectConfig {
  name: string;
  projectType: 'application' | 'library';
  sourceRoot?: string;
  root?: string;
  targets?: Record<string, NxTarget>;
  tags?: string[];
  implicitDependencies?: string[];
}

interface AngularProjectEntry {
  projectType: string;
  root: string;
  sourceRoot: string;
  prefix?: string;
  architect: Record<string, unknown>;
}

// ─── Executor translation: Nx → Angular CLI ─────────────────────────────────

const EXECUTOR_MAP: Record<string, string> = {
  '@nx/angular:application': '@angular/build:application',
  '@angular-devkit/build-angular:application': '@angular/build:application',
  '@angular/build:application': '@angular/build:application',
  '@nx/angular:dev-server': '@angular-devkit/build-angular:dev-server',
  '@angular-devkit/build-angular:dev-server':
    '@angular-devkit/build-angular:dev-server',
  '@nx/angular:browser': '@angular-devkit/build-angular:browser',
  '@angular-devkit/build-angular:browser':
    '@angular-devkit/build-angular:browser',
  '@nx/angular:server': '@angular-devkit/build-angular:server',
  '@angular-devkit/build-angular:server':
    '@angular-devkit/build-angular:server',
  '@nx/angular:extract-i18n': '@angular-devkit/build-angular:extract-i18n',
  '@angular-devkit/build-angular:extract-i18n':
    '@angular-devkit/build-angular:extract-i18n',
  '@nx/jest:jest': '@angular-devkit/build-angular:jest',
  '@nx/eslint:lint': '@angular-eslint/builder:lint',
  '@angular-eslint/builder:lint': '@angular-eslint/builder:lint',
  '@nx/angular:ng-packagr-lite': 'ng-packagr:build',
  'ng-packagr:build': 'ng-packagr:build',
};

function translateExecutor(executor: string): string {
  return EXECUTOR_MAP[executor] ?? executor;
}

// ─── File discovery ──────────────────────────────────────────────────────────

function findProjectJsonFiles(baseDir: string): string[] {
  const results: string[] = [];

  function walk(dir: string) {
    let entries: fs.Dirent[];
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

  walk(baseDir);
  return results;
}

// ─── Config translation ───────────────────────────────────────────────────────

function translateTargets(
  targets: Record<string, NxTarget>,
): Record<string, unknown> {
  const architect: Record<string, unknown> = {};

  for (const [name, target] of Object.entries(targets)) {
    const entry: Record<string, unknown> = {
      builder: translateExecutor(target.executor),
    };
    if (target.options && Object.keys(target.options).length) {
      entry['options'] = target.options;
    }
    if (target.configurations && Object.keys(target.configurations).length) {
      entry['configurations'] = target.configurations;
    }
    if (target.defaultConfiguration) {
      entry['defaultConfiguration'] = target.defaultConfiguration;
    }
    architect[name] = entry;
  }

  return architect;
}

function parseProject(
  projectJsonPath: string,
): { name: string; entry: AngularProjectEntry } | null {
  let config: NxProjectConfig;
  try {
    config = JSON.parse(fs.readFileSync(projectJsonPath, 'utf-8'));
  } catch (e) {
    console.warn(`  ⚠ Cannot parse ${projectJsonPath}: ${e}`);
    return null;
  }

  const absRoot = path.dirname(projectJsonPath);
  const root = path.relative(ROOT, absRoot).replace(/\\/g, '/');
  const sourceRoot = config.sourceRoot?.replace(/\\/g, '/') ?? `${root}/src`;

  const entry: AngularProjectEntry = {
    projectType: config.projectType,
    root,
    sourceRoot,
    architect: config.targets ? translateTargets(config.targets) : {},
  };

  return { name: config.name, entry };
}

// ─── Dry-run report ───────────────────────────────────────────────────────────

function printDryRunReport(
  projects: Record<string, AngularProjectEntry>,
  filesToBackup: string[],
  angularJsonPath: string,
) {
  console.log('\n════════════════════════════════════════');
  console.log('  DRY RUN — no files will be changed');
  console.log('════════════════════════════════════════\n');

  console.log('📁 FILES TO CREATE/UPDATE:\n');
  const exists = fs.existsSync(angularJsonPath);
  console.log(`  ${exists ? '[UPDATE]' : '[CREATE]'} angular.json`);

  console.log('\n📦 PROJECTS IN angular.json:\n');
  const apps = Object.entries(projects).filter(
    ([, p]) => p.projectType === 'application',
  );
  const libs = Object.entries(projects).filter(
    ([, p]) => p.projectType === 'library',
  );

  console.log(`  Applications (${apps.length}):`);
  for (const [name, proj] of apps) {
    const targets = Object.keys(proj.architect);
    console.log(`    • ${name}`);
    console.log(`        root:    ${proj.root}`);
    console.log(`        targets: ${targets.join(', ') || '(none)'}`);
  }

  if (libs.length) {
    console.log(`\n  Libraries (${libs.length}):`);
    for (const [name, proj] of libs) {
      const targets = Object.keys(proj.architect);
      console.log(`    • ${name}`);
      console.log(`        root:    ${proj.root}`);
      console.log(`        targets: ${targets.join(', ') || '(none)'}`);
    }
  }

  if (filesToBackup.length) {
    console.log('\n🔒 FILES TO BACK UP (rename, not delete):\n');
    for (const f of filesToBackup) {
      console.log(
        `  ${path.relative(ROOT, f)} → ${path.relative(ROOT, f)}.bak`,
      );
    }
  }

  if (VERBOSE) {
    console.log('\n📄 angular.json preview:\n');
    const angularJson = buildAngularJson(projects);
    console.log(JSON.stringify(angularJson, null, 2));
  } else {
    console.log('\n  Run with --verbose to see the full angular.json content.');
  }
}

// ─── Build angular.json ───────────────────────────────────────────────────────

function buildAngularJson(
  projects: Record<string, AngularProjectEntry>,
): Record<string, unknown> {
  return {
    $schema: './node_modules/@angular/cli/lib/config/schema.json',
    version: 1,
    cli: { packageManager: 'npm' },
    projects,
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

function main() {
  console.log(`\nNx → Angular CLI migration script`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (--dry-run)' : 'APPLY'}\n`);

  // Discover all project.json files
  const appsDir = path.join(ROOT, 'apps');
  const libsDir = path.join(ROOT, 'libs');

  const allProjectJsonFiles = [
    ...findProjectJsonFiles(appsDir),
    ...findProjectJsonFiles(libsDir),
  ];

  console.log(`Found ${allProjectJsonFiles.length} project.json file(s).\n`);

  // Parse each
  const projects: Record<string, AngularProjectEntry> = {};
  const skipped: string[] = [];

  for (const p of allProjectJsonFiles) {
    const result = parseProject(p);
    if (!result) {
      skipped.push(p);
      continue;
    }
    if (projects[result.name]) {
      console.warn(
        `  ⚠ Duplicate project name "${result.name}" at ${p} — skipping`,
      );
      continue;
    }
    projects[result.name] = result.entry;
  }

  if (skipped.length) {
    console.log(`Skipped ${skipped.length} unparseable file(s):\n`);
    for (const s of skipped) console.log(`  ${path.relative(ROOT, s)}`);
    console.log('');
  }

  // Determine files to back up
  const filesToBackup = ['nx.json']
    .map((f) => path.join(ROOT, f))
    .filter(fs.existsSync);

  const angularJsonPath = path.join(ROOT, 'angular.json');

  if (DRY_RUN) {
    printDryRunReport(projects, filesToBackup, angularJsonPath);
    return;
  }

  // Apply changes
  const angularJson = buildAngularJson(projects);
  fs.writeFileSync(
    angularJsonPath,
    JSON.stringify(angularJson, null, 2) + '\n',
    'utf-8',
  );
  console.log(
    `✓ Written angular.json (${Object.keys(projects).length} projects)`,
  );

  for (const f of filesToBackup) {
    const bak = f + '.bak';
    fs.renameSync(f, bak);
    console.log(
      `✓ Backed up ${path.relative(ROOT, f)} → ${path.relative(ROOT, bak)}`,
    );
  }

  console.log('\nDone. Next steps:');
  console.log(
    '  1. Review angular.json — verify builder options match your apps',
  );
  console.log(
    '  2. Remove @nx/* devDependencies from package.json if no longer needed',
  );
  console.log(
    '  3. Replace "ng": "nx" scripts in package.json with "ng": "ng"',
  );
  console.log('  4. Run: ng build <app-name> to verify');
}

main();
