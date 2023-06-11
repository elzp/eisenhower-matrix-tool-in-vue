<template>
  <div>
    <button class="button">{{ type }}</button>
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  margin: 0;
}
</style>
