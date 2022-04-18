## Installation

```bash
$ cd webdev-13
$ npm install
```

## Environment Variables

Edit `.env` file to add relevant variables.
E.p.

```
MONGO_URL=<Database URL>
```

You can then access those variables after `require("dotenv").config()` by calling `process.env.<VARIABLE>`.

## Prettier

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

Run below command **before creating any pull requests!**

```bash
$ npm run prettier
```
