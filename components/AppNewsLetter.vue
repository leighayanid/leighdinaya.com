<template>
  <div class="dark:bg-neutral-900 bg-slate-200 rounded-lg p-10">
    <div class="flex flex-col">
      <div class="flex-1">
        <h2 class="text-xl font-bold">Sign up for our newsletter</h2>
        <p class="">
          Get emails from me about web development, tech, and early access to
          new articles. I also share pictures of my dogs.
        </p>
      </div>
      <div class="flex-1 mt-5">
        <client-only>
          <form
            id="newsletter"
            class="email-form flex"
            name="newsletter"
            data-netlify="true"
            netlify-honeypot="bot-field"
          >
            <div hidden aria-hidden="true">
              <label>
                Don’t fill this out if you're human:
                <input name="bot-field" />
              </label>
            </div>
            <div class="flex">
              <input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                required
                class="w-2/3 flex-1 p-2 rounded-lg"
              />
              <button
                type="submit"
                class="bg-slate-800 text-slate-100 ml-4 p-2 rounded-lg"
              >
                Subscribe
              </button>
            </div>
          </form>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
