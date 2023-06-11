<template>
  <div class="form">
    <h1>setting</h1>
    <div class="section">
      <div class="description">Task description:</div>
      <input v-model="form.taskName" type="text" placeholder="Text input" />
    </div>
    <div class="section">
      <div class="description">Task status:</div>
      <input v-model="form.taskStatus" type="text" placeholder="Text input" />
    </div>
    <div class="section">
      <div class="description">Task type:</div>
      <input v-model="form.type" type="text" placeholder="Text input" />
    </div>
    <FunctionalButton :type="'update'" />
  </div>
</template>

<script>
import FunctionalButton from "./FunctionalButton.vue";

export default {
  name: "TaskSettings",
  components: { FunctionalButton },
  props: {},
  data() {
    return {
      form: {
        taskName: "",
        taskStatus: "",
        type: "",
      },
    };
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
