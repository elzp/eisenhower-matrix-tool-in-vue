<template>
  <div v-if="shown">
    Add app to home screen?
    <button @click="installPWA">Install!</button>
    <button @click="dismissPrompt">No, thanks</button>
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
