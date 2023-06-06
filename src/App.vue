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
          tasks: [
            { name: "a", status: "todo" },
            { name: "b", status: "todo" },
            { name: "c", status: "done" },
          ],
        },
        {
          name: "strategy",
          tasks: [
            { name: "a2", status: "todo" },
            { name: "b2", status: "todo" },
            { name: "c2", status: "done" },
          ],
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
