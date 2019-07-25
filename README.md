# depcheck-junit

![CircleCI](https://img.shields.io/circleci/build/gh/fyodorvi/depcheck-junit/master)
![npm](https://img.shields.io/npm/v/depcheck-junit)

Junit out for [depcheck](https://github.com/depcheck/depcheck) utility, handy for CI.

## Install

```bash
npm i -g depcheck-junit
```

## Usage

All you need to do - pipe or `depcheck` json result into `depcheck-junit`:

```bash
depcheck --junit | depcheck-unit
``` 

Output:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="depcheck" tests="3" failures="3" errors="0" skipped="0">
    <testcase classname="package.json" name="Unused dependency: request">
      <failure/>
    </testcase>
    <testcase classname="package.json" name="Unused devDependency: lodash">
      <failure/>
    </testcase>
    <testcase classname="package.json" name="Missing dependency: moment">
      <failure/>
    </testcase>
  </testsuite>
</testsuites>
```

Optionally, you may specify className (by default, `package.json`):

```bash
depcheck --junit | depcheck-unit --className my-module/package.json
``` 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuites>
  <testsuite name="depcheck" tests="3" failures="3" errors="0" skipped="0">
    <testcase classname="my-module/package.json" name="Unused dependency: request">
      <failure/>
    </testcase>
    <testcase classname="my-module/package.json" name="Unused devDependency: lodash">
      <failure/>
    </testcase>
    <testcase classname="my-module/package.json" name="Missing dependency: moment">
      <failure/>
    </testcase>
  </testsuite>
</testsuites>
```

The app will exit with non-zero code if there was a depcheck issue (handy for CI).
