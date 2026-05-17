#!/usr/bin/env node
/**
 * Fix stale paths in angular.json for application projects.
 *
 * Scans lessons/*\/tasks\/* to build actual paths, then replaces
 * all stale path prefixes (apps/...) in each project's config.
 *
 * Usage:
 *   node scripts/fix-angular-json-paths.js --dry-run
 *   node scripts/fix-angular-json-paths.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');
const ANGULAR_JSON = path.join(ROOT, 'angular.json');
const LESSONS_DIR = path.join(ROOT, 'lessons');

// Build map: appDirName -> "lessons/<category>/tasks/<appDirName>"
function buildAppMap() {
  const map = {};
  for (const category of fs.readdirSync(LESSONS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)) {
    const tasksDir = path.join(LESSONS_DIR, category, 'tasks');
    if (!fs.existsSync(tasksDir)) continue;
    for (const app of fs.readdirSync(tasksDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)) {
      map[app] = `lessons/${category}/tasks/${app}`;
    }
  }
  return map;
}

function fixProject(name, project, appMap) {
  // Actual dir name from the last segment of root
  const appDirName = project.root.split('/').pop();
  const actualPath = appMap[appDirName];

  if (!actualPath) {
    console.warn(`  ⚠  ${name}: no match found for dir "${appDirName}" in lessons/`);
    return { project, changed: false };
  }

  if (project.root === actualPath) {
    return { project, changed: false }; // already correct
  }

  // Collect all stale prefixes used inside this project's config
  const staleRoot = project.root; // e.g. "apps/best-practices/default-vs-onpush"
  const staleSourceBase = (project.sourceRoot || '').replace(/\/src(\/.*)?$/, '');
  // e.g. "apps/performance/34-default-vs-onpush"

  const stalePrefixes = [...new Set([staleRoot, staleSourceBase].filter(Boolean))];

  let json = JSON.stringify(project);
  for (const stale of stalePrefixes) {
    json = json.split(stale).join(actualPath);
  }

  const fixed = JSON.parse(json);
  fixed.root = actualPath;
  fixed.sourceRoot = `${actualPath}/src`;

  return { project: fixed, changed: true };
}

function main() {
  console.log(`\nFix angular.json paths`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'APPLY'}\n`);

  const appMap = buildAppMap();
  console.log(`Found ${Object.keys(appMap).length} apps in lessons/\n`);

  const data = JSON.parse(fs.readFileSync(ANGULAR_JSON, 'utf-8'));

  let fixedCount = 0;
  let skippedCount = 0;

  for (const [name, project] of Object.entries(data.projects)) {
    if (project.projectType !== 'application') continue;

    const { project: fixed, changed } = fixProject(name, project, appMap);

    if (changed) {
      fixedCount++;
      console.log(`  ✓ ${name}`);
      console.log(`      ${project.root}  →  ${fixed.root}`);
      if (project.sourceRoot !== fixed.sourceRoot) {
        console.log(`      ${project.sourceRoot}  →  ${fixed.sourceRoot}`);
      }
      if (!DRY_RUN) data.projects[name] = fixed;
    } else {
      skippedCount++;
    }
  }

  console.log(`\nFixed: ${fixedCount}, already correct: ${skippedCount}`);

  if (!DRY_RUN) {
    fs.writeFileSync(ANGULAR_JSON, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log('angular.json updated.');
  }
}

main();
