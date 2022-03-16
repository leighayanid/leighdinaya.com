---
title: Create a newsletter sign up form for Gridsome and Nuxt.js static site using Buttondown and Netlify Serverless Functions
published: true
tags: [blog]
date: 2022-03-16
featured: true
---

In my last blog post, I share how to create a comment system to a Gridsome site. Now I'd like to share how to build a newsletter signup form not just for Gridsome but also for Nuxt.js, or basically for any Vue-powered site deployed on Netlify. We'll use Netlify serverless function to send form submissions to Buttondown.

<table-of-content :toc="toc"></table-of-content>

Assuming you have your Gridsome or Nuxt.js static site deployed on Netlify, let's proceed to building our newsletter.

## Sign up for Buttondown account and obtain an API KEY

Log in to [Buttondown](https://buttondown.email) using your account. Click the menu from top right side of the page. From Menu -> go to `Settings` then click `Programming`. This will redirect you to the page where you can find the API key. Copy the API key.

Create .env file in the root project directory and add `BUTTONDOWN_API_KEY`. Set the value to the key you just copied.

Since we're using env file, don't forget to install `dotenv` package by running `npm install --save dotenv`.

## Create a serverless function

From the root project folder of your static site, create a new folder `functions`. Inside the functions folder, create a file `buttondown.js`. Copy and paste the following code to the file:

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

Next, create a sign up form component. From the components folder, create NewsletterForm.vue and paste the following code.

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

Make sure to add `ref="form"` attribute in your form.

You can style your form using the CSS framework of your choice, depending on what you use in your project.

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

Now we need to write a method that will trigger the serverless function whenever we submit our form. From the script tag, append the following code:

```javascript

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

Next, add the submitForm handler in our form. Don't forget to pass the reference to our form.

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

## Test locally with Netlify Dev
