#!/usr/bin/env node

import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import _ from 'lodash';
import rootPackage from './package.json';
import clientPackage from './client/package.json';
import serverPackage from './server/package.json';

const TEMPLATE_AUTHOR = 'Ryan Spoone';
const TEMPLATE_GITHUB_REPOSITORY = 'ryanspoone/fullstack-template';
const { GITHUB_REPOSITORY, GITHUB_ACTOR } = process.env;
const TEMPLATE_REPO_NAME = _(TEMPLATE_GITHUB_REPOSITORY)
    .split('/')
    .last();
const GITHUB_REPO_NAME = _(GITHUB_REPOSITORY)
    .split('/')
    .last();

if (GITHUB_REPOSITORY === TEMPLATE_GITHUB_REPOSITORY) {
    // eslint-disable-next-line no-console
    console.log(`Not running inside ${TEMPLATE_GITHUB_REPOSITORY} repo.`);
    process.exit();
}

if (!GITHUB_REPOSITORY) {
    // eslint-disable-next-line no-console
    console.error('Unknown GITHUB_REPOSITORY.');
    process.exit(1);
}

// eslint-disable-next-line no-console
console.log(`${GITHUB_ACTOR}'s ${GITHUB_REPOSITORY}`);

const PACKAGE_NAME = `@${GITHUB_REPOSITORY.toLowerCase()}`;

/**
 * package.json
 */

rootPackage.name = PACKAGE_NAME;
rootPackage.homepage = rootPackage.homepage.replace(TEMPLATE_GITHUB_REPOSITORY, GITHUB_REPOSITORY);
rootPackage.author = rootPackage.author.replace(TEMPLATE_AUTHOR, GITHUB_ACTOR);
writeFileSync('./package.json', JSON.stringify(rootPackage, null, 4), { encoding: 'utf8' });

/**
 * client/package.json
 */

clientPackage.name = clientPackage.name.replace(TEMPLATE_REPO_NAME, PACKAGE_NAME);
writeFileSync('./client/package.json', JSON.stringify(clientPackage, null, 4), { encoding: 'utf8' });

/**
 * server/package.json
 */

serverPackage.name = serverPackage.name.replace(TEMPLATE_REPO_NAME, PACKAGE_NAME);
writeFileSync('./server/package.json', JSON.stringify(serverPackage, null, 4), { encoding: 'utf8' });

/**
 * README.md
 */

const readme = readFileSync('./README.md', { encoding: 'utf8' });
const newReadme = readme
    .split(TEMPLATE_GITHUB_REPOSITORY)
    .join(GITHUB_REPOSITORY)
    .split(TEMPLATE_REPO_NAME)
    .join(GITHUB_REPO_NAME);

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
unlinkSync('./.github/workflows/on-template.yml');
unlinkSync('./on-template.js');
