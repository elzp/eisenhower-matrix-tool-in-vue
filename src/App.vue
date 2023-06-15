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
    <TaskSettings
      :buttonName="buttonName"
      :dataToChange="dataToChange"
      @taskToAdd="addNew"
      @TaskToUpdate="update"
    />
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
      dataToChange: {
        task: {
          name: "",
          status: "",
          id: 0,
        },
        type: "",
      },
      tasksData: [
        {
          name: "fire",
          tasks: [
            { name: "a", status: "todo", id: 1 },
            { name: "b", status: "todo", id: 2 },
            { name: "c", status: "done", id: 3 },
          ],
        },
        {
          name: "to delegate",
          tasks: [
            { name: "a2", status: "todo", id: 1 },
            { name: "b2", status: "todo", id: 2 },
            { name: "c2", status: "done", id: 3 },
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
      if (sendData?.id > 0) {
        this.dataToChange = {
          task: this.tasksData.filter((it) => it.name === sendData.taskType)[0]
            .tasks[sendData.id - 1],
          type: sendData.taskType,
        };
      }
    },
    addNew(sendData) {
      console.log(sendData);
      this.visibility = false;
    },
    update(sendData) {
      this.visibility = false;
      console.log(sendData);
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
