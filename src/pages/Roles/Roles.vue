<template>
  <div class="posts">
    <div id="su" class="alert alert-success" role="alert">
        {{ Massage_success }} .
      </div>
      <svg
        id="sp"
        class="spinner"
        width="65px"
        height="65px"
        viewBox="0 0 66 66"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          class="path"
          fill="none"
          stroke-width="6"
          stroke-linecap="round"
          cx="33"
          cy="33"
          r="30"
        ></circle>
      </svg>
      <div
        id="m"
        style="cursor: pointer"
        class="alert alert-danger alert-dismissible fade show"
        role="alert"
        @click="close()"
      >
        {{ Massage_warning }}
      </div>
      <!-- tab -->
    <h1>Rules</h1>
    <router-link to="/role/create">
      <button class="btn btn-success mb-2">Create Rule</button>
    </router-link>

    <table class="table">
      <thead>
        <tr class="head">
          <th class="col1">ID</th>
          <th class="col2">Name</th>
          <th class="col3">Permissions</th>
          <!-- <th class="col4">Is Admin</th> -->
          <th class="col5">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="body" v-for="rule in roles" :key="rule.id">
          <th class="row1">{{ rule.id }}</th>
          <td class="row2">{{ rule.name }}</td>
          <td class="row3 perm">
            <div v-for="per in rule.permissions" :key="per.id">
              {{ per.name }}
            </div>
          </td>
          <!-- <td class="row4">{{ rule.isAdmin }}</td> -->
          <td class="row5">
            <button class="btn btn-primary">View</button>
            <router-link
              :to="{ path: `/role/update/${rule.id}`, params: { id: rule.id } }"
            >
              <button class="btn btn-info">Edit</button>
            </router-link>
            <button
              @click="deletRole(rule.id)"
              class="btn btn-danger"
              type="submit"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- <div :id="`s${id}`" class="alert alert-success" role="alert">
      {{ Massage_success }} .
    </div>
    <svg
      :id="`sp${id}`"
      class="spinner"
      width="65px"
      height="65px"
      viewBox="0 0 66 66"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        class="path"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        cx="33"
        cy="33"
        r="30"
      ></circle>
    </svg>
    <div
      :id="`m${id}`"
      class="alert alert-danger alert-dismissible fade show"
      role="alert"
      @click="close()"
      style="cursor: pointer"
    >
      {{ Massage_warning }}
    </div> -->
  </div>
</template>

<script>
// import { mapState } from "vuex";
import axios from "axios";

export default {
  name: "rules",
  data() {
    return {
      deleted: null,
      Massage_success: "",
      Massage_warning: "",
      statusnumber: null,
      error: "",
      Progress: 0,
      roles:[]
    }
  },
  created() {
        this.fetch();
    },
  methods: {
    close() {
      document.getElementById(`m`).classList.toggle("cvs");
    },
    async  fetch() {
      var self = this;
      let token = window.localStorage.getItem('token');
        await axios
            .get(`/api/auth/roles/getAll?${token}`)
            .then((res) => {
                  self.roles = res.data.Roles; 
                console.log('Roles: ', res);                         
            })
            .catch(function (error) {
              if(error.response.status == 403){
                alert('error '+error.response.data.error)
              }
                console.warn('Error roles ', error.response);
            });
    },
    deletRole(i) {
        var r = confirm(`Are you sure you want to delete Role id ${i}`);
        if (r == true) {
          axios
            .delete(`/api/auth/role/delete/${i}`)
            .then(function(response) {
              console.log(response);
                alert('This Role Is deleted Now');
                self.$store.dispatch("loadRules");
            })
            .catch(function(error) {
              if(error.response.status == 403){
            alert('error '+error.response.data.error)
        }else if (error.response) {
                console.log(error.respons);
                alert(` error !! Sorry we will work for this error soon `) ;
              }
            });
        }
    },
  },
};
</script>

<style scoped>
.table {
  text-align: center;
}
.head .col1,
.head .col4 {
  width: 10%;
}
.head .col2,
.head .col3 {
  width: 20%;
}
.head .col5 {
  width: 30%;
}
.body .row1,
.body .row4 {
  width: 10%;
}
.body .row2 {
  width: 20%;
}
.body .row3 {
  width: 40%;
}
.body .row5 {
  display: flex;
  gap: 5px;
  width: 30%;
  justify-content: center;
  margin: auto;
}
/*  */
.anim {
  animation: mymove 1.5s infinite;
  border-radius: 50%;
}
@keyframes mymove {
  50% {
    background-color: darkgreen;
    color: #fff;
    box-shadow: 2px 2px 20px darkgreen;
  }
}
.parent {
  display: flex;
  justify-content: space-around;
  position: relative;
  width: 100%;
  border-bottom: 10px solid #eee;
}
.alert-danger {
  position: absolute !important;
  width: 100%;
  height: 100%;
  visibility: hidden;
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
}
.alert-success {
  visibility: hidden;
  position: absolute !important;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  font-size: 20px;
}
.perm div {
  display: inline-flex;
      margin: 5px;
    padding: 8px;
  border: 1px solid rgb(255, 208, 0);
  background-color: rgb(255, 208, 0);
}
.cvs {
  visibility: visible !important;
}

.parent .child5,
.parent .child8 {
  width: 20% !important;
  display: block;
  justify-content: center;
  text-align: center;
  margin: auto;
  opacity: 0.7;
}
.parent .child6 {
  width: 30% !important;
  display: flex;
  justify-content: center;
  margin: auto;
  opacity: 0.7;
}
.parent .child2 {
  width: 30% !important;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}
.parent .child1 {
  font-weight: 700;
}
.parent .child1,
.parent .child3,
.parent .child4 {
  width: 20% !important;
  display: flex;
  text-align: center;
  justify-content: center;
  margin: auto;
  opacity: 0.7;
}
.parent .child3 {
  font-weight: 600;
}
.parent .child7 {
  width: 20% !important;
  display: flex;
  justify-content: center;
  margin: auto;
  gap: 10px;
}
.parent .child7 button {
  width: 30px;
  height: 30px;
  border: none;
  border-radius: 5px;
}
.parent .child2 .imag {
  width: 70px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: auto;
  border-radius: 3px;
}
.parent .child2 .imag img {
  width: 95%;
  height: 95%;
  align-items: center;
  border-radius: 0;
  border-radius: 3px;
}
.delet {
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 30px;
  height: 30px;
  justify-content: center;
  border-radius: 5px;
  margin-top: 8px;
  background-color: #e8403c !important;
  color: #fff;
}
.non_active_delete {
  background-color: #ddd !important;
  cursor: default !important;
}
</style>
<style lang="scss" scoped>
$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
  position: absolute;
  z-index: 50;
  visibility: hidden;
}
.spin-hide {
  display: none;
}
@keyframes rotator {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(270deg);
  }
}

.path {
  stroke-dasharray: $offset;
  stroke-dashoffset: 0;
  transform-origin: center;
  animation: dash $duration ease-in-out infinite,
    colors ($duration * 4) ease-in-out infinite;
}

@keyframes colors {
  0% {
    stroke: #4285f4;
  }
  25% {
    stroke: #de3e35;
  }
  50% {
    stroke: #f7c223;
  }
  75% {
    stroke: #1b9a59;
  }
  100% {
    stroke: #4285f4;
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: $offset;
  }
  50% {
    stroke-dashoffset: $offset/4;
    transform: rotate(135deg);
  }
  100% {
    stroke-dashoffset: $offset;
    transform: rotate(450deg);
  }
}
.alert-danger {
  position: fixed !important;
  width: 75%;
  height: 150px;
  visibility: hidden;
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  left: 20%;
  z-index: 5;
}
.alert-success {
  visibility: hidden;
  position: fixed !important;
  width: 75%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  font-size: 20px;
  left: 20%;
}
.cvs {
  visibility: visible !important;
}

</style>

