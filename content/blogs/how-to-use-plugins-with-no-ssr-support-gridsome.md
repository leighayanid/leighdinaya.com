---
title: How to use Vue plugins with no SSR support on a Gridsome project
date: 2021-03-06
published: false
tags: ['gridsome']
---

Ever use a Gridsome plugin that doesn't support SSR? Followed all the instructions on the documentation re how to use the plugin but you still stumble upon errors? Or the plugin works on development but not during build time?

Try this simple fix.

Inside main.js, add your plugin like this:

```javascript
...

export default function(Vue) {
 Vue.component("Layout", DefaultLayout);

 // browse code only
 if (process.isClient) {
  Vue.use(require("pluginName").default, {
   //properties
  });
 }
}
```

Say for example you're using a vue-scroll-reveal plugin on your Gridsome project, adding your plugin like this works.

```javascript
import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue) {
  Vue.component('Layout', DefaultLayout)

  // browse code only
  if (process.isClient) {
    Vue.use(require('vue-scroll-reveal').default, {
      reset: true,
      class: 'v-scroll-reveal',
      duration: 500,
      distance: '20px',
      mobile: true,
      interval: 600,
    })
  }
}
```

That's it. Quick and easy. Hope this helps!

Additional readings:

[vue-scroll-reveal in Gridsome SSR not building #543](https://github.com/gridsome/gridsome/issues/543)

[Gridsome Full Calendar build error - no SSR](https://stackoverflow.com/questions/62327434/gridsome-full-calendar-build-error-no-ssr)

## Happy Coding
