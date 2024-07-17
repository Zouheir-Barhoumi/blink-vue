<template>
  <div class="formWrapper">
    <div class="form">
      <h1 class="formTitle">Login</h1>
      <form @submit.prevent="" method="post">
        <div class="form__field">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="form.email" />
        </div>
        <div class="form__field">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="form.password" />
        </div>
        <div class="form__footer">
          <div class="form__alt">
            <small>You don't have an account?</small>
            <router-link to="register"><small>Signup</small></router-link>
          </div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";

export default defineComponent({
  methods: {
    handleSubmit() {
      alert("Form SUBMITTED!");
    },
  },
  setup() {
    const form = reactive({
      email: "",
      password: "",
    });
    return {
      form,
    };
  },
});
</script>

<style scoped>
input {
  margin-bottom: 0.8rem;
}
</style>
