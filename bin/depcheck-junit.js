#!/usr/bin/env node
const fs = require('fs');
const { convert } = require('../src/index');

const argv = require('yargs')
    .usage('Reads json output from depcheck from stdin and outputs junit compatible xml. E.g. depcheck --json > depcheck-junit > result.xml')
    .option('className')
    .describe('className', 'Optional className for junit output')
    .default('className', 'package.json')
    .argv;

if(!process.stdin.isTTY) {
    const data = fs.readFileSync(0, 'utf-8');

    let parsedJson;

    try {
        parsedJson = JSON.parse(data);
    } catch (e) {
        console.error(e);
        console.error(`Error parsing JSON. Are you piping valid output from depcheck?`);
        process.exit(1);
    }

    const resultXML = convert(parsedJson, argv.className);
    const hasError = parsedJson.dependencies.length > 0 || parsedJson.devDependencies.length > 0 || Object.keys(parsedJson.missing).length > 0;

    console.log(resultXML);

    if (hasError) {
        // still exit with error if there was a missing dependency
        process.exit(1);
    }
} else {
    console.error('No stdin provided! Run with --help for more info');
    process.exit(1);
}
