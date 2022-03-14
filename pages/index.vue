<template>
  <div>
    <base-gradient-background class="relative" />
    <lazy-app-hero />

    <section class="blog">
      <div class="flex justify-between items-center">
        <transition
          appear
          enter-active-class="animate__animated animate__fadeIn"
          :duration="{ enter: 1000, leave: 200 }"
        >
          <h3 class="text-xl font-semibold my-5">Featured Blog</h3>
        </transition>
      </div>
      <div class="my-2">
        <lazy-hydrate when-idle>
          <lazy-app-list-blog
            :blogs="blogs"
            class="flex-1 grid md:grid-cols-2 grid-cols-1 gap-6"
          />
        </lazy-hydrate>
      </div>
      <div class="flex justify-between items-center">
        <nuxt-link to="/blog" class="text-lg my-5 underline"
          >All Blog &#x2192;</nuxt-link
        >
      </div>
    </section>
    <section class="projects py-10">
      <div class="flex my-10">
        <h3 class="text-xl font-semibold">Personal Projects</h3>
      </div>
      <div class="my-2">
        <lazy-hydrate>
          <lazy-app-list-project
            :projects="projects"
            class="flex-1 grid md:grid-cols-2 grid-cols-1 gap-x-6 gap-y-3"
          />
        </lazy-hydrate>
      </div>
      <div class="flex justify-between items-center">
        <nuxt-link to="/projects" class="text-lg my-5 underline"
          >All Projects &#x2192;</nuxt-link
        >
      </div>
    </section>

    <app-news-letter class="my-10" />
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
import BaseGradientBackground from '~/components/base/BaseGradientBackground.vue'
export default {
  components: {
    LazyHydrate,
    BaseGradientBackground,
  },
  async asyncData({ store }) {
    await Promise.all([
      store.dispatch('blog/fetchFeaturedPosts'),
      store.dispatch('project/fetchFeaturedProjects'),
    ])
    return {
      blogs: store.getters['blog/featuredPosts'],
      projects: store.getters['project/featuredProjects'],
    }
  },

  head() {
    return {
      title: 'Leigh Dinaya - Web developer',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'Web developer. Web3 enthusiast. Lifelong learner. OSS Advocate.',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Leigh Dinaya - Web developer',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content:
            'Web developer. Web3 enthusiast. Lifelong learner. OSS Advocate.',
        },
      ],
    }
  },
}
</script>
