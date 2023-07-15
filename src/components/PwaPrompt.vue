<template>
  <div v-if="shown" class="prompt">
    Add app to home screen?
    <div class="buttons">
      <button @click="installPWA">Install!</button>
      <button @click="dismissPrompt">No, thanks</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    shown: false,
  }),

  beforeMount() {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      this.installEvent = e;
      this.shown = true;
    });
  },

  methods: {
    dismissPrompt() {
      this.shown = false;
    },

    installPWA() {
      this.installEvent.prompt();
      this.installEvent.userChoice.then(() => {
        this.dismissPrompt();
      });
    },
  },
};
</script>
<style scoped>
.prompt {
  position: fixed;
  padding: 15px;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 2px solid black;
  /* border-radius: 40px; */
  text-align: center;
  color: black;
}
button {
  margin: 10px 0 0 10px;
}
</style>
