<template>
  <div>
    <h1 v-if="style !== 'unordered'">{{ data.name }}</h1>
    <FunctionalButton
      :type="'add new'"
      :taskType="data.name"
      :id="0"
      @settings="getSettingsData"
      v-if="style !== 'unordered'"
    />
    <div v-if="!this.checkIfIsEmpty(this.tasks)">
      <ul v-for="item in tasks" :key="item">
        <li>
          <div class="task">
            <div>{{ item.name }} - {{ item.status }}</div>
            <FunctionalButton
              :type="'change'"
              :taskType="data.name"
              :id="item.id"
              @settings="getSettingsData"
            />
          </div>
        </li>
      </ul>
    </div>
    <div v-else-if="style === !'unordered'">no task available</div>
    <svg
      v-if="
        (data.name === 'fire' || data.name === 'delegate') && style === 'matrix'
      "
      :class="'arrow-' + `${data.name}`"
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

export default {
  name: "SectionOfMatrix",
  components: {
    FunctionalButton,
  },
  props: {
    data: Object,
    style: String,
  },
  data() {
    return {
      tasks: this.data.tasks || [],
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
  // mounted() {
  //   console.log(this.setArrowStyle(this.props.data.name));
  // },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
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
.task {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.unordered {
  margin: 0;
}
</style>
