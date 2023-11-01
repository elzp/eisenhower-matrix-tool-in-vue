<template>
  <div class="task-containter">
    <div class="name">{{ name }}</div>
    <div class="id">index: {{ id }}</div>
  </div>
</template>

<script>
export default {
  name: "TaskComp",
  props: {
    name: String,
    id: Number,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-containter {
  inline-size: 150px;
  overflow-wrap: break-word;
  hyphens: manual;
}
.name {
  text-align: left;
  /* word-break: break-all; */
}
.id {
  text-align: right;
  font-size: 10px;
}
</style>
