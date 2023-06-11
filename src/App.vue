<template>
  <FunctionalButton
    :type="'add new'"
    :taskType="'choose'"
    @settings="getSettingsData"
  />
  <ul v-for="item in tasksData" :key="item">
    <li>
      <SectionOfMatrix :data="item" @settings="getSettingsData" />
    </li>
  </ul>
  <div v-if="visibility">
    <TaskSettings :buttonName="buttonName" />
  </div>
</template>

<script>
import SectionOfMatrix from "./components/SectionOfMatrix.vue";
import FunctionalButton from "./components/FunctionalButton.vue";
import TaskSettings from "./components/TaskSettings.vue";

export default {
  name: "App",
  components: {
    SectionOfMatrix,
    FunctionalButton,
    TaskSettings,
  },
  data() {
    return {
      visibility: false,
      buttonName: "add",
      tasksData: [
        {
          name: "fire",
          tasks: [
            { name: "a", status: "todo" },
            { name: "b", status: "todo" },
            { name: "c", status: "done" },
          ],
        },
        {
          name: "to delegate",
          tasks: [
            { name: "a2", status: "todo" },
            { name: "b2", status: "todo" },
            { name: "c2", status: "done" },
          ],
        },
        {
          name: "strategy",
          tasks: [],
        },
        {
          name: "redundant",
          tasks: [],
        },
      ],
    };
  },
  methods: {
    getSettingsData(sendData) {
      this.visibility = sendData.settingsVisibility;
      this.buttonName = sendData.buttonName;
    },
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
