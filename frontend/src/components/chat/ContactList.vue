<template>
  <div class="contacts">
    <h3>Contacts</h3>
    <div class="contacts__list">
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
          <small>Last message excerpt</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.contacts {
  background: var(--color-black);
  border-radius: 1.4rem;
  min-width: 18rem;
  height: calc(100vh - 5.4rem);
  padding: 8px 4px;
  overflow-y: auto;
  border: 1px solid var(--color-neon-green);
}
.contacts__list {
  display: flex;
  flex-direction: column;
}
.contacts__card {
  display: flex;
  align-items: center;
  background: var(--gradient-neon-green);
  border-radius: 1rem;
  cursor: pointer;
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
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
}
.contacts__card--right span {
  font-size: 1.2rem;
}
</style>
