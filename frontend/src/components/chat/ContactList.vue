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
  background: transparent;
  border-radius: 1.4rem;
  min-width: 18rem;
  padding: 8px 4px;
  overflow-y: auto;
  box-shadow: inset 0 4px 8px 1rem rgba(57, 255, 20, 0.05);
  border: 1px solid var(--color-grey);
}
.contacts__list {
  display: flex;
  flex-direction: column;
}
.contacts__card {
  display: flex;
  align-items: center;
  /* background: var(--gradient-neon-green); */
  border-radius: 1rem;
  cursor: pointer;
  border: 2px solid var(--color-grey);
  box-shadow: 0 4px 4px 1px var(--color-grey);
  padding: 0.5rem;
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
