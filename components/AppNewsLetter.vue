<template>
  <div class="dark:bg-neutral-900 bg-slate-200 rounded-lg p-10">
    <div class="flex flex-col">
      <div class="flex-1">
        <h2 class="text-xl font-bold">Sign up for our newsletter</h2>
        <p class="text-sm">
          Get emails from me about web development, tech, and early access to
          new articles. I also share pictures of my dogs.
        </p>
      </div>
      <div class="flex-1 mt-5">
        <form
          id="newsletter"
          ref="form"
          class="email-form flex"
          name="newsletter"
          @submit.prevent="onSubmit(form)"
        >
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
              :disabled="loading"
            >
              {{ loading ? 'Please wait..' : 'Subscribe' }}
            </button>
          </div>
        </form>
        <div
          v-if="message"
          class="my-4 border border-green-500 w-1/2 rounded-sm"
        >
          <p class="text-sm text-green-500 p-2">
            {{ message }}
          </p>
        </div>
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
      message: '',
      loading: false,
    }
  },
  methods: {
    async onSubmit(form) {
      this.loading = true
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
            this.message = res.msg
            this.form.email = ''
            this.loading = false
          })
      } catch (e) {
        this.loading = false
      }
    },
  },
}
</script>
