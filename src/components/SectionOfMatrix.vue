<template>
  <div>
    <h1>{{ data.name }}</h1>
    <FunctionalButton
      :type="'add new'"
      :taskType="data.name"
      :id="0"
      @settings="getSettingsData"
    />
    <div v-if="!this.checkIfIsEmpty(this.tasks)">
      <ul v-for="item in tasks" :key="item">
        <li>
          <div>
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
    <div v-else>no task available</div>
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
  },
  data() {
    return {
      tasks: this.data.tasks || [],
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
  },
  mounted() {
    console.log(this.border);
  },
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
</style>
