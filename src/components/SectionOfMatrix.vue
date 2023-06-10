<template>
  <div class="hello">
    <h1>{{ data.name }}</h1>
    <div v-if="!this.isEmpty">
      <ul v-for="item in tasks" :key="item">
        <li>{{ item.name }} - {{ item.status }}</li>
      </ul>
    </div>
    <div v-else>no task available</div>
  </div>
</template>

<script>
export default {
  name: "SectionOfMatrix",
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
h3 {
  margin: 40px 0 0;
}
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
