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
    id: Number,
    taskType: String,
  },
  data() {
    return {};
  },
  methods: {
    onClick() {
      if (this.type === "add new") {
        this.$emit("settings", {
          buttonName: "add",
          settingsVisibility: true,
          taskType: this.taskType,
        });
      } else if (this.type === "change") {
        this.$emit("settings", {
          buttonName: "update",
          settingsVisibility: true,
          taskType: this.taskType,
          id: this.id,
        });
      } else if (this.type === "add") {
        this.$emit("newTask");
      } else if (this.type === "update") {
        this.$emit("updateTask");
      } else if (this.type === "delete") {
        this.$emit("deleteTask");
      } else if (this.type === "restore") {
        this.$emit("restoreTask");
      } else if (this.type === "done") {
        this.$emit("changeStatus", "done");
      } else if (this.type === "todo") {
        this.$emit("changeStatus", "todo");
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
