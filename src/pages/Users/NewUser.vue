<template>
  <div>
    <div class="create">
      <div id="su" class="alert alert-success" role="alert">
        {{ Massage_success }}
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
      <div class="title_form">
        <div class="lng">
          <h4>User Form</h4>
        </div>
      </div>
      <hr style="color: #fff; opacity: 0.5" />
      <div class="parent"></div>
      <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">Full Name </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            v-model="users.fullName"
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom02" class="form-label">Email</label>
          <input
            type="text"
            class="form-control"
            id="validationCustom02"
            v-model="users.email"
            name="email"
            required
            ref="email"
            @keyup="handleEmail()"
          />
          <div style="color: red" v-if="statusEmail == false">
            <i class="fa fa-window-close"></i>
            {{ users.error }}
          </div>
          <div style="color: green" v-if="statusEmail == true">
            <i class="fa fa-check-square"></i>
            correct Email
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom03" class="form-label">Password</label>
          <input
            type="password"
            class="form-control"
            id="validationCustom03"
            v-model="users.password"
            min="8"
            name="psw"
            ref="pass"
            required
            @keyup="handlePass()"
          />
          <div style="color: red" v-if="statusPass == false">
            <i class="fas fa-exclamation-triangle"></i>
            Password must be more 8 characters
          </div>
          <div style="color: green" v-if="statusPass == true">
            <i class="fa fa-check-square"></i>
            Correct Password
          </div>
        </div>
        <div class="col-md-6">
          <label for="validationCustom04" class="form-label">Roles</label>
          <select
            class="form-select"
            id="validationCustom04"
            v-model="users.role"
            required
          >
            <option selected disabled value="">Choose...</option>
            <option v-for="rule in rules" :key="rule.id" :value="rule.id">
              {{ rule.name }}
            </option>
          </select>
          <div class="invalid-feedback">Please select a valid state.</div>
        </div>
        <!-- <div class="col-md-6 form-assgin">
          <label for="validationCustom03" class="form-label">Assgin Role</label>
          <div class="assgin" v-for="per in Permissions" :key="per.id">
            <input
              class=""
              type="checkbox"
              :value="per.id"
              :id="per.id"
              v-model="users.permissions"
            /><label :for="per.id">{{ per.name }}</label>
          </div>
        </div> -->
      </form>
      <div class="child_4">
        <button @click="addUser()" class="btn" id="btnAdd">Add</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      Massage_success: "",
      Massage_warning: "",
      statusnumber: null,
      error: "",
      Progress: 0,
      reg: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      statusEmail: null,
      statusPass: null,
      users: {
        fullName: "",
        email: "",
        password: "",
        role: "",
        // permissions: [],
        error: "",
      },
    };
  },
  props: {
    max: Number,
    uploadMsg: String,
    maxError: String,
    fileError: String,
    clearAll: String,
  },
  computed: {
    ...mapState({
      rules: (state) => state.rule.rules,
      Permissions: (state) => state.permission.permissions,
    }),
  },
  mounted() {
    this.$store.dispatch("rule/loadRules");
    this.$store.dispatch("permission/loadPermissions");
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    (function () {
      "use strict";

      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll(".needs-validation");

      // Loop over them and prevent submission
      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "click",
          function (event) {
            if (!form.checkValidity()) {
              event.preventDefault();
              event.stopPropagation();
              form.classList.add("was-validated");
            }
          },
          false
        );
      });
    })();
  },
  methods: {
    close() {
      document.getElementById(`m`).classList.toggle("cvs");
    },
    handleEmail() {
      if (this.users.email == null || this.users.email == "") {
        this.statusEmail = false;
        this.users.error = "Please Enter Email";
        this.$refs.email.style.border = "1px solid red";
      } else if (!this.reg.test(this.users.email)) {
        this.statusEmail = false;
        this.users.error = "Please Enter Correct Email";
        this.$refs.email.style.border = "1px solid red";
      } else if (this.reg.test(this.users.email)) {
        this.statusEmail = true;
        this.$refs.email.style.border = "1px solid green";
      }
    },
    handlePass() {
      if (this.users.password.length < 8) {
        this.statusPass = false;
        this.$refs.pass.style.border = "1px solid red";
      } else {
        this.statusPass = true;
        this.$refs.pass.style.border = "1px solid green";
      }
    },
    addUser() {
      var self = this;

      if (this.users.fullName == "") {
        this.Massage_warning =
          "Please enter the Full Name field because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.users.role == "") {
        this.Massage_warning = "Please select the Role because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.users.email == "") {
        this.Massage_warning = "Please select the Email because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.users.password == "") {
        this.Massage_warning =
          "Please select the Password because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } 
      // else if (this.users.permissions == "") {
      //   this.Massage_warning =
      //     "Please check one or multi the Permissions because it is required";
      //   document.getElementById(`m`).classList.toggle("cvs");
      // }
       else if (this.statusPass !== true) {
        this.Massage_warning =
          "Please enter a password of at least 8 characters";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.statusEmail !== true) {
        this.Massage_warning =
          "Please enter a valid email, the email must contain an @ sign";
        document.getElementById(`m`).classList.toggle("cvs");
      } else {
        document.getElementById("sp").classList.toggle("cvs");
        axios
          .post("/api/auth/user/create", this.users)
          .then(function (response) {
            console.log(response.data);
            document.getElementById("sp").classList.toggle("cvs");
            self.Massage_success = "Create User Request Success";
            // self.Massage_success = response.data.content;
            document.getElementById("su").classList.toggle("cvs");
            setTimeout(() => {
              self.$router.push({ name: "users" });
            }, 2000);
          })
          .catch(function (error) {
            if(error.response.status == 403){
                alert('error '+error.response.data.error)
            }else if (error.response) {
              document.getElementById("sp").classList.toggle("cvs");
              self.Massage_warning = "Error : " + error.response.data.message;
              document.getElementById("m").classList.toggle("cvs");
            }
          });
      }
    },
  },
};
</script>

<style scoped>
input {
  border: 1px solid #ddd;
}
select {
  border: 1px solid #ddd;
}
.child_4 button {
  box-shadow: 1px 1px 10px #09b2c7;
  background-color: darkcyan;
  border-radius: 5px;
  margin: 20px 0;
  transition: all 0.5s;
}
form div {
  margin: 10px auto;
}
form .form-select {
  border: 1px solid #ddd;
  width: 100%;
  /* height: calc(1.5em, 0.75rem, 2px); */
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}
form .form-assgin {
  padding: 20px;
}
form .form-assgin div {
  display: flex;
  gap: 10px;
}
form .form-assgin div input {
  margin: auto 0;
}
.child_4 button:hover {
  box-shadow: 2px 2px 20px #0d6efd;
}
.lng {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.lng h4 {
  font-size: 20px;
  font-weight: bold;
  border: 1px solid darkcyan;
  padding: 10px;
}
.create {
  padding: 20px;
  height: auto;
  width: 100%;
  text-align: center;
  position: relative;
}

.divlang {
  cursor: pointer;
  padding: 5px 0;
}
.divlang select {
  border: none;
  height: 3.3rem;
  cursor: pointer;
  color: #fff;
  border: 1px solid #dbd9d9;
  background-color: #1cc3d5;
  width: 150px;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
}

/* images */
.image {
  margin-top: 30px;
}
.container {
  width: 100%;
  height: 200px;
  background: #f7fafc;
  border: 0.5px solid #a3a8b1;
  border-radius: 10px;
  padding: 30px;
  position: relative;
  align-items: center;
}
.imgupload {
  width: 1000px;
  max-height: 800px;
}
.drop {
  width: 100%;
  height: 100%;
  top: 0;
  border-radius: 10px;
  position: absolute;
  background-color: #f4f6ff;
  left: 0;
  border: 3px dashed #a3a8b1;
}
.error {
  text-align: center;
  color: red;
  font-size: 15px;
}
.beforeUpload {
  position: relative;
  text-align: center;
}
.beforeUpload input {
  width: 100%;
  margin: auto;
  height: 100%;
  opacity: 0;
  position: absolute;
  background: red;
  display: block;
}
.beforeUpload input:hover {
  cursor: pointer;
}
.beforeUpload .icon {
  width: 150px;
  margin: auto;
  display: block;
}
.imgsPreview .imageHolder {
  width: 150px;
  height: 150px;
  background: #fff;
  position: relative;
  border-radius: 10px;
  margin: 5px 5px;
  display: inline-block;
}
.imgsPreview .imageHolder img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}
.imgsPreview .imageHolder .delete {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 29px;
  height: 29px;
  color: #fff;
  background: red;
  border-radius: 50%;
}
.imgsPreview .imageHolder .delete:hover {
  cursor: pointer;
}
.imgsPreview .imageHolder .delete .icon {
  width: 66%;
  height: 66%;
  display: block;
  margin: 4px auto;
}
.imgsPreview .imageHolder .plus {
  color: #2d3748;
  background: #f7fafc;
  border-radius: 50%;
  font-size: 21pt;
  height: 30px;
  width: 30px;
  text-align: center;
  border: 1px dashed;
  line-height: 23px;
  position: absolute;
  right: -42px;
  bottom: 43%;
}
.plus:hover {
  cursor: pointer;
}
.clearButton {
  color: #2d3748;
  position: absolute;
  top: 7px;
  right: 7px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
$offset: 187;
$duration: 1.4s;

.spinner {
  animation: rotator $duration linear infinite;
  position: absolute;
  z-index: 50;
  top: 50%;
  left: 50%;
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
