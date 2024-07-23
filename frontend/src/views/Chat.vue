<template>
  <div>
    <div class="header">
      <div class="user">
        <div class="user__name">John Doe</div>
        <div class="user__pfp">
          <img src="https://placehold.co/50" alt="profile picture" />
        </div>
      </div>
    </div>
    <div class="main">
      <ContactList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ContactList from "../components/chat/ContactList.vue";

export default defineComponent({
  components: {
    ContactList,
  },
  setup() {
    return {};
  },
});
</script>

<style scoped>
.header {
  /* padding: 0.5rem; */
  border-radius: 0 0 1rem 1rem;
  transform: translateY(0);
  /* width: 100%; */
  background: rgba(0, 0, 0, 0.5);
  border-radius: 0 1rem 1rem 1rem;
  position: relative;
}
.header::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: var(--color-neon-blue);
  filter: blur(200px);
  z-index: -1;
}
.user {
  display: flex;
  justify-content: end;
  align-items: center;
  border-top: 1px solid var(--color-neon-green);
  border-bottom: 1px solid var(--color-neon-green);
  border-radius: 0 1rem 1rem 1rem;
  /* padding: 0.8rem; */
  background: rgba(57, 255, 20, 0.05);
  height: 50px;
  gap: 1rem;
}
.user__name {
  font-size: 1.4em;
}
.user__pfp {
  height: 50px;
}
img {
  padding: 0;
  margin: 0;
  border-radius: 1rem 1rem 0 1rem;
}

.main {
  max-width: 1280px;
  height: 100%;
  background: #000;
  padding: 0;
  display: flex;
  gap: 1rem;
}
</style>
