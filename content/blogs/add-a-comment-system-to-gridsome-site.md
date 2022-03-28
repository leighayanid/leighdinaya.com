---
title: Add a comment system to a Gridsome static website using Cusdis
published: true
tags:
  - gridsome
  - cusdis
date: 2022-03-12
modified: '2022-03-12'
featured: true
---

In this tutorial, you will learn how to add a comment system to your Gridsome static website. We will use Cusdis, an open-source, privacy-friendly alternative to Disqus.

You will learn how to host your version of Cusdis to Vercel, use Railway - a software-as-a-service platform similar to that of Heroku to provision a Postgres database. And add a comment section to a static page.

<table-of-content :toc="toc"></table-of-content>

## Overview

1. What is Cusdis
2. What is Railway
3. How to self-host Cusdis on Vercel
4. How to apply a comment widget provided by Cusdiis into a Gridsome static website

## Prerequisites

1. Sign up for a Railway account using your Github account.
2. We'll be deploying Cusdis to Vercel, so make sure you have an account there.
3. For hosting Gridsome static site, we'll use Netlify
4. Gridsome CLI installed on your local machine

## Note

It is not a beginner-friendly tutorial. I assume you're familiar with Vue.js and have also worked with Node.js, npm, and Vercel. I'm also assuming you have a piece of background knowledge in the database.

## What is Cusdis?

Cusdis is an open-source comment system created by [Randy](https://github.com/djyde). Cusdis seeks to provide your static website with a comment area. It's a less complicated version of Disqus. It has less functionality than the latter technology but is faster, less bloated, and more privacy-friendly. Its goal is to create a minimalist embed commenting system perfect for small websites like a static blog. It has a dashboard where you can moderate all of the comments. And, best of all, it's free to use.

Cusdis provides a Javascript SDK that includes a comment widget. It includes a universal embed code, which can be embedded on any website.

## What is Railway?

Railway is a cloud deployment platform that allows you to provision infrastructure, work locally with it, and then deploy to the cloud. It simplifies the process of distributing software to the cloud. It has a lot of features that are similar to or better than Heroku.

We'll establish a PostgreSQL database using Railway, which we'll use to store data.

To learn more about Railway, check their [website](https://railway.app).

## Provision a PostgreSQL database

Now we'll create a PostgreSQL database. We'll use this for storing comments and users' information.

Log in to Railway, and create a new project. Then select `PROVISION POSTGRESQL`

![Image](https://res.cloudinary.com/rentapp/image/upload/v1647048827/railway-new_kgttzl.png)

Railway will create a new project with a PostgreSQL database instance which we will then use to connect to Cusdis. Once the setup is done, our database is now ready.

Click `PostgreSQL` . The Railway Database management interface will appear. Under the `CONNECT` tab, copy the `Postgres Connection URL`. We need it later.

![https://res.cloudinary.com/rentapp/image/upload/v1647048811/PostgreSQL_o3apsu.png](https://res.cloudinary.com/rentapp/image/upload/v1647048811/PostgreSQL_o3apsu.png)

Sample URL:

```
postgresql://postgres:kVzj1WProj9uVOmDDmyT@containers-us-west-29.railway.app:6016/railway
```

## Deploy Cusdis on Vercel

Now it's time for the fun part. We'll use Vercel to self-host Cusdis.

Before anything else, fork a copy of the Cusdis repo to your Github account. You can find the repo [here](https://github.com/djyde/cusdis).

Then go ahead and log in to Vercel and create a new project. Import fork copy of Cusdis.

![https://res.cloudinary.com/rentapp/image/upload/v1647051150/New_Project_Vercel_ozhm7n.png](https://res.cloudinary.com/rentapp/image/upload/v1647051150/New_Project_Vercel_ozhm7n.png)

Next, configure the project by completing the forms.

Under the `ENVIRONMENT_VARIABLES` section, provide the following credentials:

```
USERNAME
PASSWORD
DB_URL
JWT_SECRET
```

The `USERNAME` and `PASSWORD` credentials will be used when logging in to your Cusdis dashboard.

The `DB_URL` is the url we copied earlier from Railway.

The `JWT_SECRET` can be any string you want.

![https://res.cloudinary.com/rentapp/image/upload/v1647051209/new-project-vercel-cusdis_lzbfxg.png](https://res.cloudinary.com/rentapp/image/upload/v1647051209/new-project-vercel-cusdis_lzbfxg.png)

Then hit the deploy button and wait for the deployment to finish.

If everything works, we'll then be redirected to success page.

![https://res.cloudinary.com/rentapp/image/upload/v1647051699/new-project-vercel-cusdis-2_mutdty.png](https://res.cloudinary.com/rentapp/image/upload/v1647051699/new-project-vercel-cusdis-2_mutdty.png)

After the initial deployment is successful, get your production deployment domain. Vercel automatically generated a name for your site, in my case, it is https://cusdis-leigh.vercel.app, and then add a new environment variable in project settings page -> `ENVIRONMENT VARIABLES` tab. Add the `NEXTAUTH_URL` environment variable and the obtained domain.

Your complete environment variables configuration should look like this:

![https://res.cloudinary.com/rentapp/image/upload/v1647052399/cusdis_Environment_Variables_Vercel_smfjmd.png](https://res.cloudinary.com/rentapp/image/upload/v1647052399/cusdis_Environment_Variables_Vercel_smfjmd.png)

Then redeploy your application again.

And that's it. You can now successfully open your newly deployed, self-hosted Cusdis via domain Vercel generated for your site.

## Create a new project in Cusdis

One more thing before we begin creating the comment section of our static website. We need to create a project from the Cusdis dashboard.

Login to Cusdis. Add a new website.

![https://res.cloudinary.com/rentapp/image/upload/v1647165961/Getting_Start_1_csfkmi.png](https://res.cloudinary.com/rentapp/image/upload/v1647165961/Getting_Start_1_csfkmi.png)

Your Cusdis dashboard is ready.

![https://res.cloudinary.com/rentapp/image/upload/v1647165902/Blog_futpov.png](https://res.cloudinary.com/rentapp/image/upload/v1647165902/Blog_futpov.png)

## Create a new Gridsome site

We'll use a Gridsome blog template to avoid writing code from scratch. We will use the [template](https://github.com/gridsome/gridsome-starter-blog) provided by the Gridsome team.

So go ahead and fork the repo, clone it on your local machine, open the project in VS Code or your preferred text editor, then install the dependencies.

Test the project by running `gridsome develop`. Then visit `localhost:8080`.

## Add comment widget

One of our goals is to add a comment section to our static blog post page. The section should have a list of all comments and a form for submitting a comment.

The Cusdis SDK includes a comment widget. This widget displays the list of comments and provides a comment form for users. Luckily for us, they also provided a Vue-ported library of Cusdis SDK - vue-cusdis.

So let's install it in our project. Install the package by running `npm install vue-cusdis` or if you're using yarn `yarn add vue-cusdis`.

Next, from the project folder, look for `Post.vue`, import VueCusdis component and find the div with the class `post-comments`, and paste the following code

```js
<template>
  <Layout>
  ...
  <div class="post-comments">
  <!-- paste code here -->
  <vue-cusdis
    :attrs="{
      host: 'https://cusdis-leigh.vercel.app',
      appId: '8b93f5a8-abc3-43be-b135-cbcbad3dce85',
      pageId: $page.post.path,
      pageTitle: $page.post.title,
      pageUrl: $page.post.title,
    }"
  ></vue-cusdis>
  </div>
  ...
  </Layout>
</template>

<script>

import VueCusdis from "@evillt/vue-cusdis/dist/vue2.es";
 ...

</script>
```

Replace the attrs value in the vue-cusdis component. These are available on the Cusdis project dashboard.

![Image](https://res.cloudinary.com/rentapp/image/upload/v1647166219/Blog_1_lyj19e.png)

```

host - domain
appId - appId given

```

Lastly, we need to add JS SDK to our page. Install Cusdis SDK by overriding Gridsome default `index.html` and adding the required script in the index.html file.

Your index.html file should now look like this (do not forget to change the domain for the correct value):

```js

<!DOCTYPE html>
<html ${htmlAttrs}>
  <head>
    ${head}
  </head>
  <body ${bodyAttrs}>
  <script async src="https://cusdis-leigh.vercel.app/js/cusdis.es.js"></script>
    ...

    ${app}
    ${scripts}
  </body>
</html>

```

Now test your code once again by running `gridsome develop`. Click one of the sample blogs. You should be able to see the comment form below the page.

And that's it. You now have a production-ready comment system applied to your website.
