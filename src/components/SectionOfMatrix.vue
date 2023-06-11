<template>
  <div class="hello">
    <h1>{{ data.name }}</h1>
    <FunctionalButton :type="'add'" :taskType="data.name" />
    <div v-if="!this.isEmpty">
      <ul v-for="item in tasks" :key="item">
        <li>
          <div>
            <div>{{ item.name }} - {{ item.status }}</div>
            <FunctionalButton :type="'change'" :taskType="data.name" />
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
    data: Array,
  },
  data() {
    return {
      tasks: this.data.tasks,
      isEmpty: false,
    };
  },
  methods: {
    checkIfIsEmpty(array) {
      if (array.length === 0) {
        return true;
      }
      return false;
    },
  },
  mounted() {
    this.isEmpty = this.checkIfIsEmpty(this.tasks);
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
