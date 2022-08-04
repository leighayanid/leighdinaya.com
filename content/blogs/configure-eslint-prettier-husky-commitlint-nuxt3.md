---
title: Configure Eslint, Prettier, Commitlint, Husky and lint-staged for Nuxt 3
published: true
cover_img: banner.png
tags:
  - nuxt3
date: 2022-07-04
---

Eslint module for Nuxt.js is not currently supported in Nuxt 3. As of the writing, it is in active development and you can find the issue in the module Github [repository](https://github.com/nuxt-community/eslint-module/issues/69). Keep an eye on this issue for updates about the module.

In the meantime, if you want to use Eslint and Prettier in a Nuxt 3 project, you must manually configure them.

In this article, you will learn:

- How to configure Eslint and Prettier for a Nuxt 3 project
- How to automate Eslint and Prettier using Husky and lint-staged
- How to lint your commits using Commitlint

Before we begin, I assume you already have an existing Nuxt 3 app up and running and that you have already familiar with the framework. Also, I expect you to know the basics or at least have some knowledge of linting, git hooks, and code formatting.

If you're new to these topics, I recommend you read the following articles first before continuing:

- [Automating linting: using husky and lint-staged](https://stephencharlesweiss.com/automating-linting-husky-lintstaged)
- [Git Hooks](https://www.atlassian.com/git/tutorials/git-hooks)
- [Code formatting](https://www.atlassian.com/git/tutorials/code-formatting)

## Let's get started

<table-of-content :toc="toc"></table-of-content>

## Configure Eslint and Prettier

### Eslint

In your existing Nuxt 3 project, install the dependencies needed to use Eslint and Prettier.

```shell
yarn add -D eslint typescript prettier @typescript-eslint/eslint-plugin@^5.6.0 @typescript-eslint/parser@^5.6.0 @vue/eslint-config-standard eslint-config-prettier eslint-plugin-prettier eslint-plugin-nuxt eslint-plugin-vue
```

Create a`.eslintrc.js` file in the root project directory and paste the following code:

```javascript
module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
  },

  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },

  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:nuxt/recommended',
    'plugin:vue/vue3-recommended',
    'plugin:prettier/recommended',
  ],

  plugins: ['@typescript-eslint'],

  rules: {
    'vue/script-setup-no-uses-vars': 'off',
  },
}
```

### Prettier

Create `.prettierrc` file in the root project directory and add whatever custom rules you want to apply.

```json
{
  "semi": false,
  "singleQuote": true
}
```

Then in `package.json`, append the following scripts:

```json
"lint": "eslint --ext \".ts,.js,.vue\" --ignore-path .gitignore .",
"lintfix": "eslint --fix --ext \".ts,.js,.vue\" --ignore-path .gitignore .",
```

Now you can test `yarn lint` and `yarn lintfix` in the terminal.

Next, we will automate ESLint and Prettier as a pre-commit git hook using husky and lint-staged.

## Automate ESLint and Prettier using Husky

### Husky

We'll use Husky for configuring git hooks. Install husky by running the following command in the terminal.

```shell
npx husky-init && yarn // if you're using yarn
npx husky-init && npm install // if you're using npm
```

## lint-staged

Next, install [`lint-staged`](https://github.com/okonet/lint-staged). lint-staged runs linters against our staged files.

```shell
yarn add -D lint-staged
```

## Git hooks

Now, let's add a command to `pre-commit` hook.

```shell
npx husky add .husky/pre-commit "yarn lint-staged" // yarn
npx husky add .husky/pre-commit "npm run lint-staged" // npm
```

Next, we'll add our lint-staged configuration. You can separate lint_staged in its own config file, but for simplicity let's just add it directly in package.json. Inside the root `package.json`, add the `lint_staged` property. Append the following code:

```json
"lint-staged": {
	"**/*.{js,ts,vue,html,css}": [
	  "yarn lintfix"
	]
}
```

## Lint your commits using Commitlint

### Commitlint

We're using commitlint for linting our git commits. Let's first install the dependencies for it.

```shell
yarn add -D @commitlint/cli @commitlint/config-conventional
```

Inside the root project directory, create the `commitlint.config.js` config file and paste the following code:

```javascript
module.exports = {
  extends: ['@commitlint/config-conventional'],

  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'chore',
        'style',
        'refactor',
        'ci',
        'test',
        'revert',
        'perf',
        'build',
      ],
    ],
  },
}
```

Lastly we need to run commitlint as a pre-commit git hook, again, using Husky.

Add a new husky hook `commit-msg` that runs before the code is committed. It checks if the commit type and message in the commit are valid.

```shell
npx husky add .husky/commit-msg "npx --no-install commitlint --edit"
```

That's it.

We're done setting up ESLint, Prettier, Commitlint, Husky and lint-staged for our Nuxt 3 app.

Thanks for reading!

Happy coding!
