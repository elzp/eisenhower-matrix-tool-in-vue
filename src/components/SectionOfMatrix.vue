<template>
  <div>
    <div
      v-if="style !== 'unordered' && style !== 'deleted' && style !== 'done'"
    >
      <h1 v-if="style !== 'unordered'">{{ type }}</h1>
      <FunctionalButton
        :type="'add new'"
        :taskType="type"
        :id="0"
        @settings="getSettingsData"
      />
    </div>
    <div class="ul-container" v-if="!this.checkIfIsEmpty(this.tasksObject)">
      <ul v-for="item in tasksObject" :key="item">
        <li
          :style="
            style !== 'unordered'
              ? {
                  background:
                    style === 'unordered'
                      ? this.styleMapping[`${item.type}`].background
                      : 'transparent',
                }
              : {}
          "
        >
          <div
            class="task"
            :style="
              style === 'unordered'
                ? {
                    background:
                      style === 'unordered'
                        ? this.styleMapping[`${item.type}`].background
                        : 'transparent',
                  }
                : {}
            "
          >
            <FunctionalButton
              v-if="style !== 'deleted'"
              :type="item.status === 'done' ? 'todo' : 'done'"
              :taskType="item.type"
              :id="item.id"
              @changeStatus="
                (el) => {
                  this.$emit('changeStatus', { id: item.id, newStatus: el });
                }
              "
            />
            <TaskComp :name="item.name" :id="item.id" />
            <FunctionalButton
              v-if="style !== 'deleted' && style !== 'done'"
              :type="'delete'"
              @deleteTask="() => this.$emit('TaskToDelete', { id: item.id })"
            />
            <FunctionalButton
              v-if="style === 'deleted'"
              :type="'restore'"
              @restoreTask="
                () => {
                  this.$emit('TaskToRestore', { id: item.id });
                }
              "
            />
            <FunctionalButton
              v-if="style !== 'deleted' && style !== 'done'"
              :type="'change'"
              :taskType="item.type"
              :id="item.id"
              @settings="getSettingsData"
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="style === !'unordered'">no task available</div>
    <svg
      v-if="(type === 'fire' || type === 'delegate') && style === 'matrix'"
      :class="'arrow-' + `${type}`"
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      viewBox="0 0 28 28"
    >
      <path
        d="M3 3 L3 25 L23 14 z"
        stroke="black"
        stroke-width="3"
        fill="black"
      />
    </svg>
  </div>
</template>

<script>
import FunctionalButton from "./FunctionalButton.vue";
import TaskComp from "./TaskComp.vue";

export default {
  name: "SectionOfMatrix",
  components: {
    FunctionalButton,
    TaskComp,
  },
  props: {
    tasksObject: Object,
    typename: String,
    style: String,
    styleMapping: Object,
  },
  data() {
    return {
      tasks: this.tasksObject || [],
      type: this.typename || this.tasksObject[0]?.type || "",
      styleOfArrow: {},
    };
  },
  methods: {
    checkIfIsEmpty(array) {
      if (array.length === 0) {
        return true;
      }
      return false;
    },
    getSettingsData(sendData) {
      this.$emit("settings", sendData);
    },
    setArrowStyle(name) {
      let styleOfArrow;
      if (name === "delegate") {
        styleOfArrow = {
          position: "absolute",
          top: "calc(0% - 6px)",
          left: "calc(100% - 12px)",
          rotate: "-90deg",
        };
      }
      this.styleOfArrow = styleOfArrow;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: row;
}
li {
  display: inline-block;
  margin: 0 10px;
  width: 100%;
}
a {
  color: #42b983;
}
.arrow-delegate {
  position: absolute;
  top: calc(0% - 6px);
  left: calc(100% - 12px);
  transform: rotate(-90deg);
}

.arrow-fire {
  position: absolute;
  top: calc(100% - 13px);
  left: calc(100% - 22px);
  z-index: 3;
}

.ul-container {
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
}
.task {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2px auto;
  padding: 5px;
  justify-content: space-between;
  /* width: fit-content; */
  border-radius: 10%;
  border: 3px solid grey;
}
.unordered {
  margin: 0;
}
</style>
