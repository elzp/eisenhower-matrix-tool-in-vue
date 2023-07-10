const { defineConfig } = require("@vue/cli-service");
const transpileDependencies = defineConfig({
  transpileDependencies: true,
});
module.exports = {
  pwa: {
    name: "Task Tool",
    themeColor: "#ffd100"
  },
  ...transpileDependencies,
}
