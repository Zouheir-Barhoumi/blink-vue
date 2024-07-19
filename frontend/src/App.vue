<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div class="logo" v-on:click="$router.push('/')">
      <img src="./assets/logo.png" alt="logo" />
      <div class="logo_title">BLINK</div>
    </div>
    <router-view></router-view>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

<style>
.logo {
  display: flex;
  align-items: center;
  will-change: filter;
  transition: filter 300ms;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
  margin: 1.5em;
}
.logo_title {
  letter-spacing: 4px;
  font-size: 1.8em;
  color: var(--color-off-white);
}
.logo img {
  height: 4.2em;
  padding: 0;
}
.logo img:hover {
  cursor: pointer;
  filter: drop-shadow(0 0 2em var(--color-neon-blue));
}
</style>
