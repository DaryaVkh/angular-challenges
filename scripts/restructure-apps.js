#!/usr/bin/env node
/**
 * Restructure apps/ → lessons/
 *
 * apps/<category>/<app>  →  lessons/<category>/tasks/<app>
 * Each category also gets an empty lessons/<category>/lecture/ directory.
 *
 * Usage:
 *   node scripts/restructure-apps.js --dry-run
 *   node scripts/restructure-apps.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DRY_RUN = process.argv.includes('--dry-run');

const APPS_DIR = path.join(ROOT, 'apps');
const LESSONS_DIR = path.join(ROOT, 'lessons');

function log(action, from, to) {
  if (to) {
    console.log(`  [${action}] ${from}  →  ${to}`);
  } else {
    console.log(`  [${action}] ${from}`);
  }
}

function mkdirIfNeeded(dir) {
  if (!DRY_RUN) fs.mkdirSync(dir, { recursive: true });
}

function main() {
  console.log(`\nRestructure apps/ → lessons/`);
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'APPLY'}\n`);

  if (!fs.existsSync(APPS_DIR)) {
    console.error('apps/ directory not found');
    process.exit(1);
  }

  if (!DRY_RUN && fs.existsSync(LESSONS_DIR)) {
    console.error('lessons/ already exists — remove it first');
    process.exit(1);
  }

  const categories = fs
    .readdirSync(APPS_DIR, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name);

  for (const category of categories) {
    const categoryDir = path.join(APPS_DIR, category);
    const tasksDir = path.join(LESSONS_DIR, category, 'tasks');
    const lectureDir = path.join(LESSONS_DIR, category, 'lecture');

    const apps = fs
      .readdirSync(categoryDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name);

    log('MKDIR', path.relative(ROOT, tasksDir));
    log('MKDIR', path.relative(ROOT, lectureDir));

    mkdirIfNeeded(tasksDir);
    mkdirIfNeeded(lectureDir);

    for (const app of apps) {
      const src = path.join(categoryDir, app);
      const dest = path.join(tasksDir, app);
      log('MOVE', path.relative(ROOT, src), path.relative(ROOT, dest));
      if (!DRY_RUN) fs.renameSync(src, dest);
    }
  }

  if (!DRY_RUN) {
    fs.rmdirSync(APPS_DIR, { recursive: true });
    console.log(`\n  [REMOVE] apps/`);
  } else {
    console.log(`\n  [REMOVE] apps/`);
  }

  console.log(`\n${DRY_RUN ? 'Dry run complete.' : 'Done.'}`);
}

main();
