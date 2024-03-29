---
title: Create a newsletter sign up form for Gridsome and Nuxt.js static site using Buttondown and Netlify Serverless Functions
cover_img: gridsome-newsletter-buttondown.png
published: true
tags:
  - buttondown
  - netlify
  - serverless
  - nuxtjs
  - gridsome
date: 2022-03-16
featured: true
---

In my last blog post, I share how to create a comment system for a Gridsome site. Today I'd like to share how to build a newsletter form that works for Gridsome and Nuxt.js, or basically for any Vue-powered site deployed on Netlify. We'll use Netlify serverless function to send form submissions to Buttondown.

<table-of-content :toc="toc"></table-of-content>

## Prerequisites

1. Buttondown account and a generated API Key
2. Netlify CLI installed globally on your machine
3. Existing Nuxt.js or Gridsome static site already deployed on Netlify

## Note

This tutorial is not for beginners. I assume you are an experienced developer accustomed to concepts and technologies like serverless functions, Node.js, Vue.js, and the command-line interface. I expect you already know how to use Netlify to set up and deploy websites.

Say you've got your existing Gridsome or Nuxt.js static site up and running on Netlify. Let's get started on building our newsletter.

## Obtain Buttondown API Key

First up, log in to [Buttondown](https://buttondown.email) using your account. Click the menu from the top right side of the page. From Menu -> go to Settings and then click `Programming`. It will redirect you to the page where you can find the API key. Copy the API key.

Open your existing Nuxt.js or Gridsome project in VS Code or your preferred text editor. Create a .env file in the root project directory. Add BUTTONDOWN_API_KEY and set the value to the key you just copied.

Since we're using the env file in our project, don't forget to install the dotenv package by running npm install --save dotenv` from command line in your project.

We also need to declare this variable in our site setting on Netlify. So go ahead and visit Netlify Dashboard and open your site.

In `Site settings > Build & deploy > Environment > Environment variables`, add a new variable `BUTTONDOWN_API_KEY` and set the value to API Key generated from Buttondown.

## Create a serverless function

Next, we'll make a Netlify serverless function that will send form submissions containing the user's email address to Buttondown. This serverless function will send a request via BUTTONDOWN API.

From the root project directory of your static site, create a new folder `functions`. Inside the `functions` folder directory, create a file `buttondown.js`. Copy and paste the following code to the file:

```javascript
require('dotenv').config()
const fetch = require('node-fetch')
const { BUTTONDOWN_API_KEY } = process.env

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  const errorGen = (msg) => {
    return { statusCode: 500, body: msg }
  }

  try {
    const { email } = JSON.parse(event.body)

    if (!email) {
      return errorGen('Missing Email')
    }

    const subscriber = {
      email,
    }

    const response = await fetch(
      'https://api.buttondown.email/v1/subscribers',
      {
        method: 'POST',
        headers: {
          Authorization: `Token ${BUTTONDOWN_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscriber),
      }
    )

    const data = await response.json()
    if (!response.ok) {
      return { statusCode: data.status, body: data.detail }
    }
    return {
      statusCode: 200,
      body: JSON.stringify({
        msg: "You've signed up to the mailing list!",
        detail: data,
      }),
    }
  } catch (err) {
    console.log(err) // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    }
  }
}
```

## Create a sign up form component

Next, create a sign up form component. From the `components` folder, create `NewsletterForm.vue` and paste the following code.

```javascript
<template>
  <div>
    <form id="newsletter" ref="form" name="newsletter">
        <input v-model="form.email" type="email" placeholder="Your email address" />
        <button>Submit</button>
    </form>
  <div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
          email
        }
      }
    }
  }
</script>
```

Make sure to add the `ref="form"` attribute in your form.

You can style your form using the CSS framework of your choice, depending on what you use in your project. I use Tailwind CSS to design my form.

My component looks like this:

```javascript
<template>
  <div class="w-screen h-screen grid place-items-center bg-zinc-900">
    <div class="flex flex-col p-10 w-3/4 rounded-md bg-slate-300">
      <h1 class="text-lg font-semibold">Sign up for newsletter</h1>
      <p>Get the latest news about web development straight to your inbox</p>

      <div>
        <form id="newsletter" ref="form" name="newsletter" class="flex justify-between space-x-3 mt-2">
          <input v-model="form.email" type="email" class="w-3/4 rounded-md p-2" placeholder="Your email address" />
          <button class="bg-purple-500 text-white p-2 w-1/4 rounded-md">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
          email
        }
      }
    }
  }
</script>

```

For Tailwind playground reference: https://play.tailwindcss.com/RLuksgDjWV

## Submitting the form

Next, we need to write a method that triggers the serverless function whenever we submit our form. Inside the script tag, append the following code:

```javascript

// NewsletterForm.vue

<script>
export default {
  ...

  methods: {
    async submitForm(form) {
      try {
        await fetch('/.netlify/functions/buttondown', {
          method: 'POST',
          body: JSON.stringify(form),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then((res) => {
            // do whatever you want here
          })
      } catch (e) {
        console.log(e)
      }
    },
  }

}
</script>

```

Next, add the submitForm handler in our form.

```html
...
<form @submit.prevent="submitForm(form)">....</form>
```

Our complete code should now look like this:

```javascript

<template>
  <div>
    <form id="newsletter" ref="form" name="newsletter" @submit.prevent="submitForm(form)">
        <input v-model="form.email" type="email" placeholder="Your email address" />
        <button>Submit</button>
    </form>
  <div>
</template>

<script>
  export default {
    data(){
      return {
        form: {
          email
        }
      }
    },
    methods: {
      async submitForm(form) {
        try {
          await fetch('/.netlify/functions/buttondown', {
            method: 'POST',
            body: JSON.stringify(form),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((res) => res.json())
            .then((res) => {
              // do whatever you want here
              alert('Success! Thanks for subscribing!")
            })
        } catch (e) {
          console.log(e)
        }
      },
    }
  }
</script>

```

And that's it. Our component is now ready. Just import the component to the page where you want it to be placed.

## Deploy on Netlify

Deploying on Netlify is straightforward. I assume you know the process already.

But before we push your code changes to your Git provider, make sure to add `netlify.toml` at the root project directory. This file specifies the path of the folder where you want your functions to be of your site.

```toml

[build]
  base = "."
  functions = "./functions"
  ignore = "git log -1 --pretty=%B | grep dependabot"

[functions]
  node_bundler = "esbuild"

```

Then push your code to your Git provider and let Netlify rebuild and redeploy your site.

## Test locally with Netlify Dev

If you're adding changes to your serverless function, it's always better to test it locally before deploying to Netlify. Thanks to Netlify Dev, this is easy to do. Netlify Dev adds a number of tools to your local development environment, including the ability to test and develop with parts of Netlify's edge logic and routing rules.

Make sure you have Netlify CLI installed on your machine.

To test the function locally, run the command `netlify dev`. It will start a dev server with hot reload on port 8888.

Try submitting an email address from the form. If everything is set up correctly, you should see an alert message with the message `Success. Thanks for subscribing!`.

Now open your browser and visit the Buttondown dashboard. You should be able to see a new email subscription in the list of subscribers.

That's it! You now have a working newsletter sign up form that is up and running using Netlify serverless functions and Buttondown.

If you like this tutorial, consider subscribing to my newsletter. I'm more than happy to write and share new tutorials with you.

Happy coding!
