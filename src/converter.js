const builder = require('junit-report-builder');

exports.convert = function (json, className = 'package.json') {
    const suite = builder.testSuite().name('depcheck');

    json.dependencies.forEach((dependency) => {
        suite.testCase().className(className).name(`Unused dependency: ${dependency}`).failure();
    });

    json.devDependencies.forEach((dependency) => {
        suite.testCase().className(className).name(`Unused devDependency: ${dependency}`).failure();
    });

    const missingDependencies = Object.keys(json.missing);

    missingDependencies.forEach((dependency) => {
        suite.testCase().className(className).name(`Missing dependency: ${dependency}`).failure();
    });

    return builder.build();
};
