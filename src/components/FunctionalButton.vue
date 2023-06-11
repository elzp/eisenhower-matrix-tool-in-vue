<template>
  <div>
    <button class="button" @click="onClick">
      {{ type }}
    </button>
  </div>
</template>

<script>
export default {
  name: "FunctionalButton",
  props: {
    type: String,
    // taskType: String,
  },
  data() {
    return;
  },
  methods: {
    onClick() {
      if (this.type === "add new") {
        this.$emit("settings", {
          buttonName: "add",
          settingsVisibility: true,
        });
      } else if (this.type === "change") {
        this.$emit("settings", {
          buttonName: "update",
          settingsVisibility: true,
        });
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 3px;
}
</style>
