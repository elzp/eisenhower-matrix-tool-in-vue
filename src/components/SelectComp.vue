<template>
  <div class="select">
    <select v-model="selected" style="width: 200px" @change="update">
      <option
        v-for="value in values"
        :value="value"
        :key="value"
        @change="update"
      >
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
      values: ["fire", "delegate", "strategy", "redundant"],
    };
  },
  methods: {
    update(e) {
      this.$emit("newType", e.target.value);
    },
  },
  created() {
    this.selected = ref(this.firstSelected);
  },
  beforeUpdate() {
    this.selected = ref(this.firstSelected);
  },
  updated() {
    this.selected = ref(this.firstSelected);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
