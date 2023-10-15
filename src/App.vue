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
  <div class="main">
    <div>
      <div v-if="style === 'unordered'" :class="style">
        <SectionOfMatrix
          :tasksObject="
            tasks.sort((a, b) => {
              return a.id - b.id;
            })
          "
          @settings="getSettingsData"
          :style="style"
          :styleMapping="styleMapping"
        />
      </div>
      <div v-else :class="style">
        <ul v-for="item in types" :key="item" :style="chooseStyle(item)">
          <li>
            <SectionOfMatrix
              :tasksObject="
                tasks.reduce((before, now) => {
                  if (now.type === item) {
                    return [...before, now];
                  } else {
                    return [...before];
                  }
                }, [])
              "
              :typename="item"
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
import firebase from "./firebaseInit";
import {
  getFirestore,
  doc,
  collection,
  setDoc,
  getDocs,
} from "firebase/firestore";
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
        type: "",
        name: "",
        status: "",
        id: 0,
      },
      dataToChange: {
        type: "",
        name: "",
        status: "",
        id: 0,
      },
      types: ["fire", "delegate", "strategy", "redundant"],
      tasks: [],
    };
  },
  methods: {
    getSettingsData(sendData) {
      this.visibility = sendData.settingsVisibility;
      this.buttonName = sendData.buttonName;
      if (sendData?.id > 0) {
        const newdataToChange = {};
        this.tasks.forEach((it) => {
          if (sendData.id === it.id) {
            newdataToChange.type = it.type;
            newdataToChange.name = it.name;
            newdataToChange.status = it.status;
            newdataToChange.id = it.id;
          }
        });
        this.dataToChange = newdataToChange;
      } else {
        this.dataToChange.type = sendData.taskType;
      }
    },
    addNew(sendData) {
      const newTask = {
        type: sendData.type,
        name: sendData.taskName,
        status: "todo",
        id: this.lastIdInApp + 1,
      };
      this.tasks.push(newTask);
      this.write(sendData.taskName, sendData.type, this.lastIdInApp + 1);
      this.lastIdInApp++;
      this.visibility = false;
    },
    async write(taskName, type, id) {
      const db = getFirestore(firebase);
      try {
        await setDoc(doc(db, "tasks", "task" + id), {
          desc: taskName,
          done: false,
          type: type,
          userId: 1,
          id,
          prevName: "",
        });
        console.log("Document written with ID: ", id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    update(sendData) {
      this.tasks = this.tasks.map((it2) => {
        if (it2.id === sendData.id) {
          this.change(
            sendData.name,
            sendData.status,
            sendData.type,
            sendData.id,
            it2.name
          );
          return {
            name: sendData.name,
            status: sendData.status,
            id: sendData.id,
            type: sendData.type,
            prevName: it2.name,
          };
        } else {
          return it2;
        }
      });
      this.dataToChange = this.defaultdataToChange;
      this.visibility = false;
    },
    async change(taskName, status, type, id, prevName) {
      const db = getFirestore(firebase);
      try {
        await setDoc(doc(db, "tasks", "task" + id), {
          desc: taskName,
          done: status,
          type: type,
          userId: 1,
          id: id,
          prevName: prevName,
        });
        console.log("Document written with ID: ", id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    },
    isWebLocalDataEmpty() {
      return localStorage.getItem("tasks") === null;
    },
    async getServerData() {
      const db = getFirestore(firebase);
      const snapshot = collection(db, "tasks");
      const docsData = await getDocs(snapshot);
      let dataArr = [];
      if (docsData) {
        await docsData.forEach((doc) => {
          dataArr.push({
            type: doc.data().type,
            name: doc.data().desc,
            status: doc.data().done ? "done" : "todo",
            id: doc.data().id,
          });
        });
      } else {
        console.log("No such document!");
      }
      return dataArr;
    },
    async setServerDataInAppAndBrowser() {
      // set tasks from:
      console.log(this.isWebLocalDataEmpty());
      if (!this.isWebLocalDataEmpty()) {
        // localStorage
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      } else {
        // database
        const newData = await this.getServerData();
        this.tasks = newData;
        localStorage.setItem("tasks", JSON.stringify(newData));
      }
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
  width: 90vw;
  display: grid;
  grid-template-areas: "grouped main";
  grid-template-columns: 1fr 10fr;
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
}
.matrix {
  display: grid;
  grid-template-areas: "delegate fire" "redundant strategy";
  grid-template-columns: 50% 50%;
  width: 100%;
}
.groupedList {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.unordered > ul {
  margin: 0 auto;
  width: 95%;
}
.matrix > ul {
  padding: 5px;
  margin: 0;
  width: 90%;
}

.groupedList > ul {
  padding: 25px;
  margin: 5px;
  width: 60%;
}
button {
  margin: 10px 0 0 10px;
  border-radius: 0;
  background-color: white;
}
.grouped {
  z-index: 3;
  grid-area: grouped;
  justify-self: left;
}
.main {
  width: 100%;
  justify-self: center;
  grid-area: main;
  justify-self: center;
}
.functional {
  width: 100px;
  background-color: white;
  border: 2px solid black;
  margin: 2px;
}
</style>
