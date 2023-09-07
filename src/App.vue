<template>
  <div class="grouped">
    <h2>Choose view:</h2>
    <div class="functional" @click="changeStyleTo('matrix')">Matrix view</div>
    <div class="functional" @click="changeStyleTo('unordered')">
      Unordered List
    </div>
    <div class="functional" @click="changeStyleTo('grouped')">Grouped List</div>
    <FunctionalButton
      :type="'add new'"
      :taskType="''"
      @settings="getSettingsData"
    />
  </div>
  <div>
    <div>
      <div v-if="style === 'unordered'" :class="style">
        <ul
          v-for="item in tasksData
            .reduce((before, current) => {
              const tasks = current.tasks.map((it) => {
                return {
                  type: current.name,
                  tasks: [it],
                };
              });
              return [...before, ...tasks];
            }, [])
            .sort((a, b) => {
              return a.tasks[0].idInApp - b.tasks[0].idInApp;
            })"
          :key="item"
          :style="chooseStyle(item.name)"
        >
          <li>
            <SectionOfMatrix
              :tasksObject="item.tasks"
              :type="item.type"
              @settings="getSettingsData"
              :style="style"
              :styleMapping="styleMapping"
            />
          </li>
        </ul>
      </div>
      <div v-else :class="style">
        <ul
          v-for="item in tasksData"
          :key="item"
          :style="chooseStyle(item.name)"
        >
          <li>
            <SectionOfMatrix
              :tasksObject="item.tasks"
              :type="item.name"
              @settings="getSettingsData"
              :style="style"
              :styleMapping="styleMapping"
            />
          </li>
        </ul>
      </div>
    </div>
    <div v-if="visibility">
      <TaskSettings
        :buttonName="buttonName"
        :dataToChange="dataToChange"
        @taskToAdd="addNew"
        @TaskToUpdate="update"
        @exit="this.visibility = false"
      />
    </div>
  </div>
  <PwaPrompt />
</template>

<script>
import SectionOfMatrix from "./components/SectionOfMatrix.vue";
import FunctionalButton from "./components/FunctionalButton.vue";
import TaskSettings from "./components/TaskSettings.vue";
import PwaPrompt from "./components/PwaPrompt.vue";

export default {
  name: "App",
  components: {
    SectionOfMatrix,
    FunctionalButton,
    TaskSettings,
    PwaPrompt,
  },
  data() {
    return {
      visibility: false,
      buttonName: "add",
      style: "unordered",
      lastIdInApp: 0,
      styleMapping: {
        fire: {
          borders: ["bottom", "left"],
          roundBorder: ["top", "right"],
          background: "rgb(250, 90, 90)",
          justifySelf: "start",
        },
        delegate: {
          borders: ["bottom", "right"],
          roundBorder: ["top", "left"],
          background: "orange",
          justifySelf: "end",
        },
        strategy: {
          borders: ["top", "left"],
          roundBorder: ["bottom", "right"],
          background: "yellow",
          justifySelf: "start",
        },
        redundant: {
          borders: ["top", "right"],
          roundBorder: ["bottom", "left"],
          background: "green",
          justifySelf: "end",
        },
      },
      defaultdataToChange: {
        task: {
          name: "",
          status: "",
          id: 0,
        },
        type: "",
      },
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
          tasks: [],
        },
        {
          name: "delegate",
          tasks: [],
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
      } else {
        this.dataToChange.type = sendData.taskType;
      }
    },
    addNew(sendData) {
      this.tasksData.forEach((it) => {
        if (it.name === sendData.type) {
          const length = it.tasks.length;
          const newTask = {
            name: sendData.taskName,
            status: "todo",
            id: length !== 0 ? it.tasks[length - 1].id + 1 : 1,
            idInApp: this.lastIdInApp + 1,
          };
          this.lastIdInApp++;
          it.tasks.push(newTask);
        }
      });
      this.visibility = false;
    },
    update(sendData) {
      if (sendData.prevType === sendData.type) {
        this.tasksData.forEach((it) => {
          if (it.name === sendData.type) {
            it.tasks[sendData.id - 1] = {
              name: sendData.name,
              status: sendData.status,
              id: sendData.id,
              idInApp: this.lastIdInApp + 1,
            };
            this.lastIdInApp++;
          }
        });
      } else {
        this.tasksData.forEach((it) => {
          // add to new type
          if (it.name === sendData.type) {
            const length = it.tasks.length;
            const newTask = {
              name: sendData.name,
              status: sendData.status,
              id: length !== 0 ? it.tasks[length - 1].id + 1 : 1,
            };
            it.tasks.push(newTask);
          }
          if (it.name === sendData.prevType) {
            it.tasks.splice(sendData.id - 1, 1);
          }
        });
      }
      this.dataToChange = this.defaultdataToChange;
      this.visibility = false;
    },
    chooseStyle(nameOfType) {
      switch (this.style) {
        case "matrix":
          return {
            "grid-area": nameOfType,
            ...this.defineBorder(nameOfType),
            ...this.defineBackground(nameOfType),
            ...this.defineBorderRounding(nameOfType),
            ...this.defineJustification(nameOfType),
          };
        case "groupedList":
          return {
            borderRadius: "25px",
            ...this.defineBackground(nameOfType),
          };
        default:
          return {};
      }
    },
    defineBorder(typeName) {
      return {
        [`border-${this.styleMapping[`${typeName}`].borders[0]}`]:
          "2px solid black",
        [`border-${this.styleMapping[`${typeName}`].borders[1]}`]:
          "2px solid black",
      };
    },
    changeStyleTo(type) {
      switch (type) {
        case "matrix":
          this.style = "matrix";
          break;
        case "grouped":
          this.style = "groupedList";
          break;
        case "unordered":
          this.style = "unordered";
          break;
        default:
          this.style = "unordered";
          break;
      }
    },
    defineBackground(typeName) {
      return {
        "background-color": `${this.styleMapping[`${typeName}`].background}`,
      };
    },
    defineBorderRounding(typeName) {
      return {
        [`border-${this.styleMapping[`${typeName}`].roundBorder[0]}` +
        `-${this.styleMapping[`${typeName}`].roundBorder[1]}-radius`]: "25px",
      };
    },
    defineJustification(typeName) {
      if (typeName === "fire" || typeName === "strategy") {
        return {
          "justify-self": "start",
        };
      } else {
        return {
          "justify-self": "end",
        };
      }
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

h2 {
  font-size: 0.8em;
}

ul {
  list-style-type: none;
  padding-inline-start: 0;
  margin: 0;
  padding: 0;
  position: relative;
  width: 60%;
}
.matrix {
  display: grid;
  grid-template-areas: "delegate fire" "redundant strategy";
}
.groupedList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.unordered > ul {
  margin: 0 auto;
}
.matrix,
.groupedList > ul {
  padding: 25px;
  margin: 5px;
}
button {
  margin: 10px 0 0 10px;
  border-radius: 0;
  background-color: white;
}
.grouped {
  position: fixed;
  z-index: 3;
}
.functional {
  width: 100px;
  background-color: white;
  border: 2px solid black;
  margin: 2px;
}
</style>
