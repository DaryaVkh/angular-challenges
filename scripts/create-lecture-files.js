#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');

const LESSONS_DIR = path.resolve(__dirname, '../lessons');

const dirs = fs.readdirSync(LESSONS_DIR, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => path.join(LESSONS_DIR, e.name, 'lecture'));

for (const lectureDir of dirs) {
  fs.mkdirSync(lectureDir, { recursive: true });
  fs.writeFileSync(path.join(lectureDir, 'basics.md'), '# Базовые знания\n');
  fs.writeFileSync(path.join(lectureDir, 'advanced.md'), '# Расширенные знания\n');
  console.log(`created: ${path.relative(path.resolve(__dirname, '..'), lectureDir)}`);
}
