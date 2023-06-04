<template>
  <SectionOfMatrix :data="tasksData[0]" />
</template>

<script>
import SectionOfMatrix from "./components/SectionOfMatrix.vue";

export default {
  name: "App",
  components: {
    SectionOfMatrix,
  },
  data() {
    return {
      tasksData: [
        {
          name: "delegate",
          tasks: ["a", "b", "c"],
        },
      ],
    };
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
