<template>
  <div class="form">
    <h1>setting</h1>
    <div class="section">
      <div class="description">Task description:</div>
      <input v-model="form.taskName" type="text" placeholder="Text input" />
    </div>
    <div class="section" v-if="buttonName !== 'add'">
      <div class="description">Task status:</div>
      <div class="radio">
        <input
          type="radio"
          v-model="form.taskStatus"
          :value="statuses[0].value"
          :id="statuses[0].value"
        />
        <label :for="statuses[0].value">{{ statuses[0].label }}</label>
      </div>
      <div class="radio">
        <input
          type="radio"
          v-model="form.taskStatus"
          :value="statuses[1].value"
          :id="statuses[1].value"
        />
        <label :for="statuses[1].value">{{ statuses[1].label }}</label>
      </div>
    </div>
    <div class="section">
      <div class="description">Task type:</div>
      <SelectComp :firstSelected="dataToChange.type" @newType="update" />
    </div>
    <FunctionalButton
      :type="buttonName"
      @newTask="emitNewTask"
      @updateTask="emitToUpdateTask"
    />
  </div>
</template>

<script>
import FunctionalButton from "./FunctionalButton.vue";
import SelectComp from "./SelectComp.vue";

export default {
  name: "TaskSettings",
  components: { FunctionalButton, SelectComp },
  props: {
    buttonName: String,
    dataToChange: Object,
  },
  data() {
    return {
      statuses: [
        {
          value: "todo",
          label: "to do",
        },
        {
          value: "done",
          label: "done",
        },
      ],
      form: {
        taskName: this.dataToChange.task.name,
        taskStatus: this.dataToChange.task.status,
        type: this.dataToChange.type || "redundant",
      },
      id: this.dataToChange.task.id,
    };
  },
  methods: {
    emitNewTask() {
      this.$emit("taskToAdd", {
        type: this.form.type,
        taskName: this.form.taskName,
      });
    },
    emitToUpdateTask() {
      this.$emit("TaskToUpdate", {
        type: this.form.type,
        prevType: this.dataToChange.type,
        name: this.form.taskName,
        status: this.form.taskStatus,
        id: this.id,
      });
    },
    update(sendData) {
      this.form.type = sendData;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.form {
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid black;
  width: max-content;
  padding: 10px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

h1 {
  margin: 5px;
}
.section {
  display: flex;
  flex-direction: column;
}
.description {
  width: 150px;
  padding: 2px;
}
.radio {
  display: flex;
  flex-direction: row;
  width: fit-content;
}
</style>
