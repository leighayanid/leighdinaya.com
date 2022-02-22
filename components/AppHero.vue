<template>
  <div
    class="flex md:flex-row flex-col-reverse justify-between md:items-center md:my-20 my-10"
  >
    <lazy-hydrate when-visible>
      <div>
        <h1 class="mb-2 font-extrabold md:text-5xl text-3xl font-inter">
          LEIGH DINAYA
        </h1>
        <h2 class="font-inter mb-2">
          Web developer. Web3 enthusiast. OSS advocate.
        </h2>
        <div class="flex space-x-4">
          <a
            class=""
            href="https://twitter.com/leighrd_"
            aria-label="Twitter"
            target="_blank"
            ><svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-twitter"
            >
              <path
                d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
              ></path></svg
          ></a>
          <a
            class=""
            href="https://github.com/leighayanid"
            aria-label="Github"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-github"
            >
              <path
                d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
              ></path></svg
          ></a>
        </div>
      </div>
    </lazy-hydrate>

    <lazy-hydrate when-idle>
      <img
        src="./../static/images/profile.jpeg"
        alt="profile"
        class="md:h-32 md:w-32 h-20 w-20 md:mb-0 mb-2 rounded-full border-5 border-slate-300 filter grayscale"
        width="100px"
        height="100px"
      />
    </lazy-hydrate>
  </div>
</template>

<script>
import LazyHydrate from 'vue-lazy-hydration'
export default {
  components: {
    LazyHydrate,
  },
}
</script>
