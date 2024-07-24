<template>
  <div class="contacts">
    <h3>Contacts</h3>

    <div class="contacts__card">
      <div class="contacts__card--left">
        <img
          src="https://placehold.co/50"
          alt="profile picture"
          class="avatar"
        />
        <div class="circle"></div>
      </div>
      <div class="contacts__card--right">
        <span>User name</span>
        <!-- <span>Last message</span> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.contacts {
  background: var(--color-black);
}
.contacts__card {
  display: flex;
  align-items: center;
}
.contacts__card--left {
  position: relative;
}
.avatar {
  height: 50px;
  border-radius: 50%;
}
.circle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: var(--color-neon-green);
  top: 60%;
  right: -0.3rem;
  border-radius: 50%;
}
.contacts__card--right {
  margin-left: 1rem;
}
</style>
