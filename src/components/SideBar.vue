<template>
  <div class="sidenav">
    <router-link
      to="/dashboard"
      class="nav-link a"
      data-toggle="pill"
      role="tab"
      aria-controls="v-pills-profile"
      aria-selected="false"
      >Dashboard</router-link
    >
    <router-link
      to="/rules"
      class="nav-link a"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      >Roles</router-link
    >
    <router-link
      to="/permissions"
      class="nav-link a"
      role="tab"
      aria-controls="v-pills-home"
      aria-selected="true"
      >Permissions</router-link
    >
    <router-link
      to="/posts"
      class="nav-link a"
      data-toggle="pill"
      role="tab"
      aria-controls="v-pills-profile"
      aria-selected="false"
      >Posts</router-link
    >
    <router-link
      to="/users"
      class="nav-link a"
      data-toggle="pill"
      role="tab"
      aria-controls="v-pills-messages"
      aria-selected="false"
      >Users</router-link
    >
    <a
      class="nav-link a"
      data-toggle="pill"
      role="tab"
      aria-controls="v-pills-settings"
      aria-selected="false"
      >Settings</a
    >
    <a
      class="nav-link a"
      data-toggle="pill"
      role="tab"
      aria-controls="v-pills-settings"
      aria-selected="false"
      @click.prevent="signOut"
      >Sign Out</a
    >
  </div>
</template>

<style scoped>
.sidenav {
  height: 100%;
  width: 160px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #111;
  overflow-x: hidden;
  padding-top: 20px;
}

.sidenav .a {
  padding: 6px 8px 6px 16px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
}

.sidenav .a:hover,
.a:active {
  color: #f1f1f1;
  background-color: darkcyan;
}

@media screen and (max-height: 450px) {
  .sidenav {
    padding-top: 15px;
  }
  .sidenav .a {
    font-size: 18px;
  }
}
</style>

<script>
import {mapActions} from 'vuex';
export default{
  methods:{
    ...mapActions({
      signOutAction: 'auth/signOut'
    }),
    signOut(){
      this.signOutAction().then(()=>{
        this.$router.replace({
          name: 'dashboard'
        })
      })
    }
  }
}
</script>