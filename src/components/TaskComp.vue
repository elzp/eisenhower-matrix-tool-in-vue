<template>
  <div>
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
