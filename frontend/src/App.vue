<script setup lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <div class="logo">
      <img src="./assets/logo.png" alt="logo" />
    </div>
    <router-view></router-view>
    <!-- <HelloWorld msg="Vite + Vue" /> -->
  </div>
</template>

<style>
.logo img {
  height: 7em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
  position: absolute;
  z-index: 1000;
  top: 0;
  left: 0;
}
.logo img:hover {
  filter: drop-shadow(0 0 2em var(--color-bgL));
}
</style>
