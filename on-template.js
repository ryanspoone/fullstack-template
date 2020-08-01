#!/usr/bin/env node

import { writeFileSync, readFileSync, unlinkSync } from 'fs';

import packageJson from './package.json';

const TEMPLATE_AUTHOR = 'Ryan Spoone';
const TEMPLATE_GITHUB_REPOSITORY = 'ryanspoone/fullstack-template';
const { GITHUB_REPOSITORY, GITHUB_ACTOR } = process.env;

if (GITHUB_REPOSITORY === TEMPLATE_GITHUB_REPOSITORY) {
    // eslint-disable-next-line no-console
    console.info(`Not running inside ${TEMPLATE_GITHUB_REPOSITORY} repo.`);
    process.exit();
}

if (!GITHUB_REPOSITORY) {
    throw new Error('Unknown GITHUB_REPOSITORY.');
}

// eslint-disable-next-line no-console
console.log(`${GITHUB_ACTOR}'s ${GITHUB_REPOSITORY}`);

const TEMPLATE_PACKAGE_NAME = packageJson.name;
const PACKAGE_NAME = `@${GITHUB_REPOSITORY.toLowerCase()}`;

/**
 * package.json
 */

packageJson.name = PACKAGE_NAME;
packageJson.homepage = packageJson.homepage.replace(TEMPLATE_GITHUB_REPOSITORY, GITHUB_REPOSITORY);
packageJson.author = packageJson.author.replace(TEMPLATE_AUTHOR, GITHUB_ACTOR);
writeFileSync('./package.json', JSON.stringify(packageJson, null, 4), { encoding: 'utf8' });

/**
 * README.md
 */

const readme = readFileSync('./README.md', { encoding: 'utf8' });
const newReadme = readme
    .split(TEMPLATE_PACKAGE_NAME)
    .join(PACKAGE_NAME)
    .split(TEMPLATE_GITHUB_REPOSITORY)
    .join(GITHUB_REPOSITORY);

writeFileSync('./README.md', newReadme, { encoding: 'utf8' });

/**
 * LICENSE
 */

const license = readFileSync('./LICENSE', { encoding: 'utf8' });
const newLicense = license.split(TEMPLATE_AUTHOR).join(GITHUB_ACTOR);

writeFileSync('./LICENSE', newLicense, { encoding: 'utf8' });

/**
 * CLEAN UP
 */
unlinkSync('./on-template.js');
unlinkSync('./.github/workflows/on-template.yml');
