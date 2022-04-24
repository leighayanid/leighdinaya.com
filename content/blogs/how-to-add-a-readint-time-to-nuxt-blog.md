---
title: Adding estimated reading time with Nuxt Content
published: true
tags:
  - nuxtjs
date: 2022-04-18
modified: 2022-04-18
featured: false
---

One of the things I've learned while building an earlier version of my personal portfolio and blogging site was to add a reading time to a written article. It's critical to let readers know how much time they'll be spending reading the content. Adding the estimated read time can increase the content engagement. The more time they spend reading, the more likely they are to engage with the content.

In this quick blog post, learn how to add an estimated reading time to an existing Nuxt content blog.

<table-of-content :toc="toc"></table-of-content>

## Add reading-time package

For calculating estimated reading time of an article, we'll use [reading-time](https://github.com/ngryman/reading-time) package.

Install the package in your project.

```bash
npm install reading-time --production
```

## the `readTime` property

Nuxt content module provides some hooks which can be used inside a Nuxt.js project.

### `content:file:beforeParse`

### `content:file:beforeInsert`

### `content:options`

We'll use `content:file:beforeInsert` which will allow us to add the `readingTime` property to a document before it is stored.

In nuxt.config.js, append the following code:

```javascript
import readingTime from 'reading-time'

export default {
  modules: [, '@nuxt/content'],
  hooks: {
    'content:file:beforeInsert': (document) => {
      if (document.extension === '.md') {
        document.readingTime = readingTime(document.text)
      }
    },
  },
}
```

We import `reading-time` package inside `nuxt.config.js`. Then inside the hooks property, we add the `content:file:beforeInsert` hook provided by the @nuxt/content module. It will check the markdown file, read all the body content, calculate the estimated time and finally, generates the `readingTime` object variable and injects it into the document.

## Display estimated reading time

If you check the Vue.js dev tools, you will see a <marked>readingTime</marked> object which includes properties such as `text`, `minutes`, `time`, and `words`. We can then use these properties inside our page to display the estimated reading time.

Say for example on a Nuxt blog page, estimated reading time can be displayed like the following:

```javascript
<template>
	<div>
		...

		<small> {{ blog.readingTime.text }}</small>

		<nuxt-content :document="blog"/>
	</div>
</template>

<script>
	export default {
		async asyncData({ $content, params, error }) {
			const slug = params.slug;
			const blog = await $content(slug).fetch()

		return {
			blog
		};
	}
};
</script>

```

Additionally, you can display the number of words in an article by displaying the readingTime `word` property.

```javascript

<p>{{ blog.readingTime.words }}</p>
```
