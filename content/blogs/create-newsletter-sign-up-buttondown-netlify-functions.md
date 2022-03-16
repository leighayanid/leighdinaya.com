---
title: Create a newsletter sign up form for Gridsome and Nuxt.js static site using Buttondown and Netlify Serverless Functions
published: true
tags: [blog]
date: 2022-03-16
featured: true
---

In my last blog post, I share how to create a comment system to a Gridsome site. Now I'd like to share how to build a newsletter sign up form for Nuxt.js and Gridsome-powered sites deployed on Netlify. We'll use Netlify serverless function to send form submissions to Buttondown.

<table-of-content :toc="toc"></table-of-content>

Assuming you have your Gridsome or Nuxt.js static site deployed on Netlify, let's proceed to building our newsletter.

## Sign up for Buttondown account and obtain an API KEY

Log in to [Buttondown](https://buttondown.email).

## Create a serverless function

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

```javascript
<div class="w-screen h-screen grid place-items-center bg-zinc-900">
  <div class="flex flex-col p-10 w-3/4 rounded-md bg-slate-300">
    <h1 class="text-lg font-semibold">Sign up for newsletter</h1>
    <p>Get the latest news about web development straight to your inbox</p>

    <div>
      <form id="newsletter" ref="form" name="newsletter" @submit.prevent="onSubmit(form)" class="flex justify-between space-x-3 mt-2">
        <input type="text" class="w-3/4 rounded-md p-2" placeholder="Your email address" />
        <button class="bg-purple-500 text-white p-2 w-1/4 rounded-md">Submit</button>
      </form>
    </div>
  </div>
</div>

```

Tailwind code: https://play.tailwindcss.com/RLuksgDjWV

## Submit form
