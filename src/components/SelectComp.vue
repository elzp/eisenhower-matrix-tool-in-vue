<template>
  <div class="select">
    <select v-model="selected" style="width: 200px">
      <option v-for="value in values" :value="value" :key="value">
        {{ value }}
      </option>
    </select>
  </div>
</template>

<script>
import { ref } from "vue";

export default {
  name: "SelectComp",
  components: {},
  props: { firstSelected: String },
  setup() {
    const selected = "";
    return { selected };
  },
  data() {
    return {
      values: ["fire", "to delegate", "strategy", "redundant"],
    };
  },
  methods: {},
  created() {
    this.selected = ref(this.firstSelected);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
