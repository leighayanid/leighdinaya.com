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
        <form
          ref="form"
          id="newsletter"
          class="email-form flex"
          name="newsletter"
          @submit.prevent="onSubmit(form)"
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
              v-model="form.email"
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
      },
    }
  },
  methods: {
    async onSubmit(form) {
      try {
        const res = await fetch('/.netlify/functions/buttondown', {
          method: 'POST',
          body: {
            email: this.form.email,
          },
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => res.json())
        console.log(res)
        this.email = ''
      } catch (e) {
        console.log(e)
      }
    },
  },
}
</script>
