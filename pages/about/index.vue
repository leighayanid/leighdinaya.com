<template>
  <div class="about space-y-5">
    <h1 class="text-xl font-semibold dark:text-white text-slate-900">
      About Me
    </h1>
    <h2>
      I'm Leigh Dinaya. I'm a programmer based in the Philippines. I build
      websites and applications and I've been coding since 2011.
    </h2>
    <h2>
      Specializing in the following tech: Vue.js, JAMstack, Laravel, Rails,
      Node.js.
    </h2>
    <h2>
      Education: <br />
      Bataan Peninsula State University<br />
      Bachelor of Science in Computer Science Major in Software Development<br />
      2011-2016
    </h2>
    <h2>
      Have a project you would like to discuss?<br />
      at leighdinaya@protonmail.com<br />
      Let's build things together.
    </h2>
    <hr />

    <h2 class="my-10">Tools I Use to Code and Design</h2>
    <div class="grid md:grid-cols-3 w-full gap-8">
      <div>
        <h3>Frontend</h3>
        <p>HTML5</p>
        <p>CSS</p>
        <p>Javascript</p>
        <p></p>
      </div>

      <div>
        <h3>Frontend Framework</h3>
        <p>Vue.js</p>
        <p>Nuxt.js</p>
        <p>Gridsome</p>
      </div>

      <div>
        <h3>CSS Framework</h3>
        <p>Tailwind CSS</p>
        <p>UnoCSS</p>
        <p>Bulma</p>
        <p>MaterializeCSS</p>
        <p>Twitter Bootstrap</p>
      </div>

      <div>
        <h3>Backend</h3>
        <p>Node.js</p>
        <p>Ruby on Rails</p>
        <p>Laravel</p>
        <p>GraphQL</p>
      </div>

      <div>
        <h3>Database</h3>
        <p>MySQL</p>
        <p>PosgreSQL</p>
        <p>MongoDB</p>
        <p>SQLite</p>
        <p>Redis</p>
      </div>

      <div>
        <h3>Backend as a Service</h3>
        <p>Heroku</p>
        <p>Railway</p>
        <p>Firebase</p>
        <p>Supabase</p>
        <p>PlanetScale</p>
        <p>MongoDB Atlas</p>
        <p>Hasura</p>
      </div>

      <div>
        <h3>CMS</h3>
        <p>Strapi</p>
        <p>Ghost CMS</p>
        <p>Netlify CMS</p>
        <p>Wordpress</p>
      </div>

      <div>
        <h3>Version Control</h3>
        <p>Git</p>
        <p>GitHub</p>
        <p>Bitbucket</p>
      </div>

      <div>
        <h3>Design Tools</h3>
        <p>Figma</p>
        <p>AdobeXD</p>
        <p>Adobe Photoshop</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'About',
  },
}
</script>

<style scoped>
h3 {
  @apply text-base  text-purple-500;
}

p {
  @apply text-sm my-1;
}
</style>
