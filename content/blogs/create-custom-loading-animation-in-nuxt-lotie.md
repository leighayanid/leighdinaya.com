---
title: Create a custom loading animation component in Nuxt.js with Lottie
date: 2020-10-23
published: true
featured: true
tags: ['Nuxt']
series: false
cover_image: ./images/loading-cover.jpg
unsplash_author: Pankaj Patel
unsplash_link: https://unsplash.com/@pankajpatel
logo_image: ./images/lottie.png
canonical_url: false
---

If you want to make a custom loading animation for your Nuxt application, Nuxt has a quick solution for you. Instead of a simple progress bar only (similar to nprogress), why not make it a little bit fancier?

In this tutorial, I will teach you how to create a custom loading animation component. We're going to use Lottie.

## What is Lottie?

Lottie is a library for Android, iOS, Web, and Windows developed by Airbnb. It parses Adobe After Effects animations exported as JSON with Bodymovin and renders them natively on mobile and on the web! If you want to know more about Lottie, you can visit its official [documentation](https://airbnb.design/lottie/).

## What is BodyMovin?

From its official documentation, Bodymovin is an After Effects plugin created by Hernan Torrisi that exports After effects files as json and includes a javascript web player.

## Lottiefiles

For this tutorial, we will download free animation resources from Lottiefiles - a platform that hosts thousands of free and paid After Effects animations from motion designers/creators from around the world.

## Why not GIF?

Sure. You can use gif as you want. However, Gif has larger size compare to Bodymovin JSON. Gif also has a fixed size and is not scalable.

## Check the code

If you want to just check the code, you can fork the the codesandbox below.

https://codesandbox.io/embed/keen-gauss-32yr3?fontsize=14&hidenavigation=1&theme=dark

# Important!

This tutorial assumes you are already familiar with Nuxt.js and have a working knowledge of the framework.

# Prerequisites

1. VS Code
2. Node.js
3. npm

# 1. Create a Nuxt app

On your preferred project location, create a nuxt app from scratch. Open your terminal or command prompt and type in the following:

```
npx create-nuxt-app lottie-project
```

Let the CLI finishes the installation of project dependencies. Once it is done, open your project in VS Code or to your preferred text editor. Open index.vue in the pages folder. Delete all generated code inside and copy and paste the code below.

```html
<template>
  <section class="container">
    <h1>Index page</h1>
  </section>
</template>

<style>
  .container {
    min-height: 100vh;
    display: grid;
    place-items: center;
  }
</style>
```

# 2. Create pages.

For this example, we will create more pages. We will show the loading component on the center of our page during the transition from one page to another page.

Inside the pages folder, create 2 more sample pages aside from the index page.
Create the following pages - About.vue and Contact.vue.

```html
About.vue
<template>
  <section class="container">
    <h1>About Page</h1>
  </section>
</template>
```

```html
Contact.vue
<template>
  <section class="container">
    <h1>Contact Page</h1>
  </section>
</template>
```

# 3. Create a Navbar Component

We need navigation for our routes. Inside the components folder, create the Navbar.vue component. Copy and paste the code below.

```html
<template>
  <div class="navbar">
    <nuxt-link to="/">Home</nuxt-link>
    <nuxt-link to="/about">About</nuxt-link>
    <nuxt-link to="/contact">Contact</nuxt-link>
  </div>
</template>

<style scoped>
  .navbar {
    background: #0089a7;
    width: 100%;
    padding: 1rem;
    text-align: center;
    position: relative;
    z-index: 1000;
  }

  .navbar a {
    text-decoration: none;
    color: white;
    margin-right: 1rem;
    text-transform: uppercase;
  }

  .nuxt-link-exact-active {
    border-bottom: 2px solid black;
    padding-bottom: 8px;
  }
</style>
```

Then import and use this component in layouts -> default.vue.

```javascript
<template>
  <div>
    <nav-bar></nav-bar>
    <nuxt />
  </div>
</template>
<script>
import NavBar from "@/components/Navbar.vue";
export default {
  components: {
    NavBar
  }
};
</script>
<style>
...
</style>
```

# 4. Download a Lottie JSON file for our animation

For this tutorial, we will use this animation by Tood Rocheford. Download the JSON file: https://lottiefiles.com/9825-loading-screen-loader-spinning-circle and save it inside the project > assets folder. Rename it to loading.json.

![Image](https://i.imgur.com/8VDmiH5.gif)

# 5. Install vue-lottie

Next, we need to install vue-lottie. A wrapper of [Bodymovin](https://aescripts.com/bodymovin/). This library will handle all the amazing work to display our animation inside our loading component.

Open the terminal in VS Code and type in the following:

```
npm install --save vue-lottie
```

# 6. Create a loading component

Inside project folder -> src -> components folder, create Loading.vue file. Copy and paste the following code inside the file.

```js
<template>
  <div v-if="loading" class="loading">
    <lottie
      :width="250"
      :height="250"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    />
  </div>
</template>

<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/loading.json";
export default {
  components: {
    lottie,
  },
  data() {
    return {
      loading: false,
      anim: null, // for saving the reference to the animation
      lottieOptions: { animationData: animationData.default },
    };
  },
  methods: {
    handleAnimation: function(anim) {
      this.anim = anim;
    },
    start() {
      this.loading = true;
    },
    finish() {
      this.loading = false;
    },
  },
};
</script>

<style>
.loading {
  background: white;
  width: 100%;
  height: 100vh;
  display: grid;
  place-items: center;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
```

Let's have a walkthrough of the code.

```html
<script>
  import lottie from "vue-lottie/src/lottie.vue";
  import * as animationData from
  "@/assets/loading.json";
  ...
</script>
```

We import lottie component from vue-lottie library in our script.

We also import the JSON file from assets folder and assigned it to animationData. The animationData is the object with the exported animation data.

lottie will be the name of our component.

```javascript
<script>
import lottie from "vue-lottie/src/lottie.vue";
import * as animationData from "@/assets/loading.json";
...

export default {
	components: {
		lottie
	}
}
</script>
```

Then define lottie in components

```html
<script>
  ...

  export default {
  ...

  data() {
  		return {
  			loading: false,
  			anim: null, // for saving the reference to the animation
  			lottieOptions: { animationData: animationData.default },
  		};
  	},
  }
</script>
```

The loading state of our Nuxt app is set to false by default. Once the user clicks one of the route, the loading state will be set to true.

anim is just the reference to the animation and lottieOptions are options for our animation. Full list of configurations and options can be found on vue-lottie official Github [repo](https://github.com/chenqingspring/vue-lottie).

```html
<script>
  export default {
  	...

  	 methods: {
      handleAnimation: function(anim) {
        this.anim = anim;
      },
      start() {
        this.loading = true;
      },
      finish() {
        this.loading = false;
      },
    },

  }
</script>
```

We create a method that handles the animation.

We also added start() and finish() methods that set the loading state to true or false when the loading starts or ends. The documentation for custom loading property in Nuxt can be found [here](https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading).

```html
<template>
  <div v-if="loading" class="loading">
    <lottie
      :width="250"
      :height="250"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    />
  </div>
</template>
```

Lastly, we define lottie component inside our template with properties and the animation function that plays our animation.

## 7. Import Loading component

To use this loading component, open nuxt.config.js and simply change the loading property to the following code below.

```
nuxt.config.js

loading: '~/components/Loading.vue'
```

Now, if you test the code below, you probably won't see the new loading component when you jump from one page to another. That's because Nuxt.js is fast. Unless you work on large data sets on your page and or in an area with a slow internet connection, the loading component won't show up. But trust me, it's there.

To demonstrate how this works, we will delay the transition of the page. To do that, we need to create a middleware that will delay the transition to the next page.

Inside the middleware folder, create delay.js and copy/paste the code below.

```js
export default ({ isServer }) => {
  // Don't use the middleware on server-side
  if (isServer) return
  // Return a promise to tell nuxt.js to wait for the end of it
  return new Promise((resolve) => {
    // Wait 1 second between each route
    setTimeout(resolve, 1000)
  })
}
```

And import this code in nuxt.config.js.

```js
module.exports = {
  router: {
    middleware: 'delay',
  },
}
```

Try running your app once again and see the loading component works.

## Summary

In this tutorial, you learned how to create a custom loading in Nuxt.js with Lottie.
You learned how to use Adobe after effects animation inside a Nuxt app.

That's all for now. Until the next blog. Thanks for reading!

## Happy Coding!
