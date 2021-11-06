<template>
  <div class="home">
    <div class="domain">
      <domain />
    </div>
    <div class="sidebar">
      <SideBar v-if="this.$route.path !== '/'" />
    </div>
    <div class="view">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import SideBar from "./components/SideBar.vue";
import domain from "./components/domain.vue";

export default {
  name: "App",
  components: {
    SideBar,
    domain,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.view {
  padding-left: 15%;
  margin: 0;
}
.domain {
  height: 10%;
  width: 100%;
  overflow-x: hidden;
  padding-left: 15%;
  padding-top: 5%;
}
</style>
