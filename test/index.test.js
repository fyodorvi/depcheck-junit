const assert = require('assert');
const { convert } = require('../src/index');
const XmlReader = require('xml-reader');

const testJSON = {
    "dependencies": [
        "request"
    ],
    "devDependencies": [
        "lodash"
    ],
    "missing": {
        "moment": [
            "/Users/fyodor/Work/sauce-v5/packages/sauce-identity/tests/unit/services/SauceAuthService.test.ts",
            "/Users/fyodor/ Work/sauce-v5/packages/sauce-identity/src/services/SauceIdentityService.ts",
            "/Users/fyodor/Work/sauce-v5/packages/sauce-identity/src/services/SauceAuthService.ts"
        ]
    },
    "using": {},
    "invalidFiles": {},
    "invalidDirs": {}
};

describe('converter', () => {
    it('should convert correctly', () => {
        const resultXML = convert(testJSON);

        const result = XmlReader.parseSync(resultXML, {parentNodes : false});

        assert.strictEqual(result.children[0].attributes.failures, '3');
        assert.strictEqual(result.children[0].children[0].attributes.name, 'Unused dependency: request');
        assert.strictEqual(result.children[0].children[1].attributes.name, 'Unused devDependency: lodash');
        assert.strictEqual(result.children[0].children[2].attributes.name, 'Missing dependency: moment');
    });
});
