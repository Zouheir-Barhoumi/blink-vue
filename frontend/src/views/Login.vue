<template>
  <div>
    <div class="body"></div>
    <div class="form_wrapper">
      <div class="form">
        <h1 class="form__title">Login</h1>
        <form @submit.prevent="handleSubmit" method="post">
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
.form input {
  margin-bottom: 1.4rem;
  min-width: 65%;
  flex: 1;
}
.body {
  position: absolute;
  background: url("../assets/image17.png") no-repeat center;
  background-size: cover;
  background-color: var(--color-black);
  filter: opacity(0.1);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
