<template>
  <div class="contacts">
    <div class="contacts--top">
      <div class="sticky">
        <span>Contacts</span>
        <span>contact.name</span>
      </div>
    </div>
    <div class="contacts__list">
      <div class="ul" v-for="contact in contacts" :key="contact.id">
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
            <span>{{ contact.name }}</span>
            <small>Last message excerpt</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// placeholder data to display in a v-for list
import { ref } from "vue";

const contacts = ref([
  { id: 1, name: "John Doe", avatar: "path/to/avatar1.jpg", status: "online" },
  {
    id: 2,
    name: "Jane Smith",
    avatar: "path/to/avatar2.jpg",
    status: "offline",
  },
  {
    id: 3,
    name: "Alice Johnson",
    avatar: "path/to/avatar3.jpg",
    status: "away",
  },
  {
    id: 4,
    name: "Bob Williams",
    avatar: "path/to/avatar4.jpg",
    status: "online",
  },
  {
    id: 5,
    name: "Emma Brown",
    avatar: "path/to/avatar5.jpg",
    status: "offline",
  },
]);
</script>

<style scoped>
.contacts {
  background: transparent;
  border-radius: 1.4rem;
  min-width: 18rem;
  padding: 8px 4px;
  overflow-y: auto;
  box-shadow: inset 0 4px 8px 1rem rgba(57, 255, 20, 0.05);
  border: 1px solid var(--color-neon-green);
}
.ul {
  position: relative;
}
.contacts--top {
  flex-direction: column;
  /* background: var(--color-grey); */
  width: 100%;
  position: sticky;
  z-index: 100;
  top: 0;
  left: 0;
}
.sticky {
  display: flex;
  flex-direction: column;
  background: var(--color-bgD);
}
.contacts--top span:first-child {
  font-size: 1.6rem;
}
.contacts--top span:last-child {
  font-size: 1.2rem;
  color: var(--color-off-white);
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
  margin-bottom: 1rem;
}
.contacts__card--left {
  position: relative;
  display: flex;
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
