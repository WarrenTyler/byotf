# Build Your Own Test Framework (Forked Version)
This is a forked version of the companion repository for the book Build Your Own Test Framework.

Note: This repository is not the official companion repository. It has been forked for personal use and following along with the book's instructions.

Original Repository: [Build Your Own Test Framework by Daniel Irvine](https://github.com/Apress/Build-your-Own-Test-Framework-by-Daniel-Irvine)



Each starting point consists of two directories: `concise-test`, which is an NPM package containing a test runner, and `todo-example`, which is an example project that has the first package as a dependency.

## Getting started

The five steps are:

1. Upgrade to (or install) the latest Node version
2. Fork this repo and clone it to your local machine
3. Choose the chapter you wish to work on (e.g. `Chapter01`), and then which starting point you need. If you're working through the chapter then its `Start`, or if it's the _Practical Exercises_, use `Exercises`.
4. In a terminal, navigate to your starting point and follow the _Link the projects_ instructions below.

## Compatibility Considerations
Please note the following compatibility considerations when working with this repository:

- Node.js Version: The code examples and instructions in this repository are designed to work with Node.js 18.12 or above. If you encounter any compatibility issues, ensure that you have the latest Node.js version installed. Currently, I am using Node.js version 19.6 for development and testing.

- Error Message Differences: It's important to note that there might be slight differences in the error messages you receive when running the code examples on different versions of Node.js. Specifically, if you're using Node.js 19.6, you may see a different error message compared to the book's mentioned error in Chapter 1, Section: Verify That It Works by Breaking a Test.

    - Node.js 18.12 Error (as mentioned in the book):
        (node:94430) UnhandledPromiseRejectionWarning: Error: wrong message in guard clause
        when adding an empty todo
        at file:///Users/dan/todo-example/test/tests.mjs:16:11
        at ModuleJob.run (internal/modules/esm/module_job.mjs:109:37)
        at async Loader.import (internal/modules/esm/loader.mjs:133:24)
        at async run (file:///Users/dan/concise-test/src/runner.mjs:4:3)
        (node:94430) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This
        error originated either by throwing inside of an async function without a catch
        block, or by rejecting a promise which was not handled with catch(). (rejection
        id: 1)

    - Node.js 19.6 Error:
        file:///C:/Users/Warren/zcode/TDD/byotf/Chapter01/Start/todo-example/test/tests.mjs:20
        throw new Error(
        ^

        Error: wrong message in guard clause when adding an empty todo
        at file:///C:/Users/Warren/zcode/TDD/byotf/Chapter01/Start/todo-example/test/tests.mjs:20:11
        at ModuleJob.run (node:internal/modules/esm/module_job:193:25)

      ### Compatibility Note
      The original book recommends using Node.js 18.12 or above. This is because Node.js 18.12 throws an UnhandledPromiseRejectionWarning error if a promise is rejected and there is no catch block to handle it. However, starting from Node.js 19.6, the error is logged to the console and the program continues to run without throwing the warning. Keep this in mind while following along with the book's examples.
Please keep in mind that while the error messages may differ, the underlying issue and solution remain the same.


## Link the projects

The `todo-example` project makes use of this new library you'll be building, so we need to link the two so it can be accessed.

In a terminal, follow these instructions:

```bash
cd Chapter01/Start    # choose the starting point that you want
cd concise-test
npm link
cd ../todo-example
npm link concise-test
```

These instructions are also covered in _Chapter 1_ of the book.
