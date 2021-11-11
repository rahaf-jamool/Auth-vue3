<template>
  <div class="content_loader hidden" id="content_loader">
    <div id="loader" class="loader"></div>
  </div>

  <div class="parent">
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
    <div>
      <div class="section">
        <div class="container">
          <div class="row full-height justify-content-center">
            <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 class="mb-0 pb-3">
                  <span>Log In</span><span>Register</span>
                </h6>
                <input
                  class="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                />
                <label for="reg-log"></label>
                <div class="card-3d-wrap mx-auto">
                  <div class="card-3d-wrapper">
                    <form class="card-front" @submit.prevent="submit">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-4 pb-3">Log In</h4>
                          <div class="formLog">
                            <div class="form-group1">
                            <input
                              type="email"
                              class="form-style"
                              v-model="form.email"
                              placeholder="Your Email"
                              name="email1"
                              required
                              ref="email1"
                              @keyup="handleEmail()"
                            />
                            <i class="input-icon uil uil-at"></i>
                            <div style="color: red" v-if="statusEmail == false">
                              <i class="fa fa-window-close"></i>
                              {{ form.error }}
                            </div>
                            <div
                              style="color: green"
                              v-if="statusEmail == true"
                            >
                              <i class="fa fa-check-square"></i>
                              correct Email
                            </div>
                          </div>
                          <div class="form-group1 ">
                            <input
                              type="password"
                              class="form-style"
                              v-model="form.password"
                              placeholder="Your Password"
                              min="8"
                              name="psw1"
                              ref="pass1"
                              required
                              @keyup="handlePass()"
                            />
                            <i class="input-icon uil uil-lock-alt"></i>
                            <div style="color: red" v-if="statusPass == false">
                              <i class="fas fa-exclamation-triangle"></i>
                              Password must be more 8 characters
                            </div>
                            <div style="color: green" v-if="statusPass == true">
                              <i class="fa fa-check-square"></i>
                              Correct Password
                            </div>
                          </div>
                          </div>
                          <button type="submit" class="btn mt-4">Log In</button>
                        </div>
                      </div>
                    </form>
                    <form class="card-back" @submit.prevent="submit1">
                      <div class="center-wrap">
                        <div class="section text-center">
                          <h4 class="mb-2 pb-2">Register</h4>
                          <div class="formReg">
                            <div class="form-group col-md-6">
                              <input
                                type="text"
                                name="logname"
                                class="form-style"
                                placeholder="Your Full Name"
                                v-model="form.fullName"
                              />
                              <i class="input-icon uil uil-user"></i>
                            </div>
                            <div class="form-group col-md-6">
                              <input
                                type="email"
                                class="form-style"
                                placeholder="Your Email"
                                v-model="form.email"
                              name="email1"
                              required
                              ref="email"
                              @keyup="handleEmail()"
                            />
                            <i class="input-icon uil uil-at"></i>
                            <div style="color: red" v-if="statusEmail == false">
                              <i class="fa fa-window-close"></i>
                              {{ form.error }}
                            </div>
                            <div
                              style="color: green"
                              v-if="statusEmail == true"
                            >
                              <i class="fa fa-check-square"></i>
                              correct Email
                            </div>
                            </div>
                            <div class="form-group col-md-6">
                              <input
                                type="password"
                                class="form-style"
                                placeholder="Your Password"
                                v-model="form.password"
                              min="8"
                              name="psw1"
                              ref="pass"
                              required
                              @keyup="handlePass()"
                            />
                            <i class="input-icon uil uil-lock-alt"></i>
                            <div style="color: red" v-if="statusPass == false">
                              <i class="fas fa-exclamation-triangle"></i>
                              Password must be more 8 characters
                            </div>
                            <div style="color: green" v-if="statusPass == true">
                              <i class="fa fa-check-square"></i>
                              Correct Password
                            </div>
                            </div>
                            <div class="form-group col-md-6">
                              <select
                                class="form-select form-style"
                                id="validationCustom04"
                                v-model="form.role"
                                required
                              >
                                <option selected disabled value="">
                                  Roles...
                                </option>
                                <option
                                  v-for="rule in rules"
                                  :key="rule.id"
                                  :value="rule.id"
                                >
                                  {{ rule.name }}
                                </option>
                              </select>
                              <div class="invalid-feedback">
                                Please select a valid state.
                              </div>
                            </div>
                            <div class="form-group col-md-11 form-assgin">
                              <label for="validationCustom03" class="form-label"
                                >Assgin Role</label
                              >
                             <div class="checkassgin">
                                <div
                                class="assgin"
                                v-for="per in Permissions"
                                :key="per.id"
                              >
                                <input
                                  class=""
                                  type="checkbox"
                                  :value="per.id"
                                  :id="per.id"
                                  v-model="form.permissions"
                                /><label :for="per.id">{{ per.name }}</label>
                              </div>
                             </div>
                            </div>
                          </div>
                          <button type="submit" class="btn mt-2">
                            Register
                          </button>
                          <!-- <p class="mb-0 mt-4 text-center">
                            <a href="#0" class="link">Forgot your password?</a>
                          </p> -->
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
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
      form: {
        fullName: "",
        email: "",
        password: "",
        role: "",
        permissions: [],
        error: "",
      },
      isLogging: false,
    };
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
  },
  methods: {
    close() {
      document.getElementById(`m`).classList.toggle("cvs");
    },
    goto: function () {
      this.$router.push(`/`);
    },
    handleEmail() {
      if (this.form.email == null || this.users.email == "") {
        this.statusEmail = false;
        this.form.error = "Please Enter Email";
        this.$refs.email1.style.border = "1px solid red";
        this.$refs.email.style.border = "1px solid red";
      } else if (!this.reg.test(this.form.email)) {
        this.statusEmail = false;
        this.form.error = "Please Enter Correct Email";
        this.$refs.email.style.border = "1px solid red";
        this.$refs.email1.style.border = "1px solid red";
      } else if (this.reg.test(this.form.email)) {
        this.statusEmail = true;
        this.$refs.email.style.border = "1px solid green";
        this.$refs.email1.style.border = "1px solid green";
      }
    },
    handlePass() {
      if (this.form.password.length < 8) {
        this.statusPass = false;
        this.$refs.pass.style.border = "1px solid red";
        this.$refs.pass1.style.border = "1px solid red";
      } else {
        this.statusPass = true;
        this.$refs.pass.style.border = "1px solid green";
        this.$refs.pass1.style.border = "1px solid green";
      }
    },
    ...mapActions({
      signIn: "auth/signIn",
      register: "auth/register",
    }),
    submit() {
      if (this.form.email == "") {
        this.Massage_warning = "Please select the Email because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.form.password == "") {
        this.Massage_warning =
          "Please select the Password because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.statusPass !== true) {
        this.Massage_warning =
          "Please enter a password of at least 8 characters";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.statusEmail == true) {
        this.Massage_warning =
          "Please enter a valid email, the email must contain an @ sign";
        document.getElementById(`m`).classList.toggle("cvs");
      }else {
        document.getElementById("sp").classList.toggle("cvs");
      this.signIn(this.form)
        .then(() => {
          document.getElementById("content_loader").classList.remove("hidden");
          setTimeout(function () {
            document.getElementById("content_loader").classList.add("hidden");
          }, 3000);
          this.$router.replace({
            name: "dashboard",
          });
        })
        .catch(() => {
          console.log("failed");
        });
      }
    },
    submit1() {
      if (this.form.fullName == "") {
        this.Massage_warning =
          "Please enter the Full Name field because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.form.role == "") {
        this.Massage_warning = "Please select the Role because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.form.email == "") {
        this.Massage_warning = "Please select the Email because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.form.password == "") {
        this.Massage_warning =
          "Please select the Password because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.form.permissions == "") {
        this.Massage_warning =
          "Please check one or multi the Permissions because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.statusPass !== true) {
        this.Massage_warning =
          "Please enter a password of at least 8 characters";
        document.getElementById(`m`).classList.toggle("cvs");
      } else if (this.statusEmail == true) {
        this.Massage_warning =
          "Please enter a valid email, the email must contain an @ sign";
        document.getElementById(`m`).classList.toggle("cvs");
      }else {
        document.getElementById("sp").classList.toggle("cvs");
      this.register(this.form)
        .then(() => {
          document.getElementById("content_loader").classList.remove("hidden");

          setTimeout(function () {
            document.getElementById("content_loader").classList.add("hidden");
          }, 3000);
          setTimeout(function () {
            window.location.reload();
          }, 3000);
        })
        .catch(() => {
          console.log("failed");
        });
    }
    }
  },
};
</script>

<style scoped>
.content_loader {
  position: absolute;
  width: 100%;
  height: 1000%;
  background-color: #645d5d;
  z-index: 1000;
  opacity: 0.5;
}
.hidden {
  display: none;
}
.loader {
  border: 16px solid #f3f3f3;
  border-radius: 50%;
  border-top: 16px solid #3498db;
  width: 120px;
  height: 120px;
  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
  position: absolute;
  right: 600px;
  top: 50%;
}
/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.parent {
  display: flex;
  justify-content: center;
}
/* Please ❤ this if you like it! */
@import url("https://fonts.googleapis.com/css?family=Poppins:400,500,600,700,800,900");
body {
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 15px;
  line-height: 1.7;
  color: #c4c3ca;
  background-color: #1f2029;
  overflow-x: hidden;
}
a {
  cursor: pointer;
  transition: all 200ms linear;
}
a:hover {
  text-decoration: none;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
p {
  font-weight: 500;
  font-size: 14px;
  line-height: 1.7;
}
h4 {
  font-weight: 600;
  color: snow;
}
h6 span {
  padding: 0 20px;
  text-transform: uppercase;
  font-weight: 700;
}
.section {
  position: relative;
  width: 100%;
  display: block;
}
.full-height {
  min-height: 100vh;
}
.checkbox:checked,
.checkbox:not(:checked) {
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #384160;
  font-family: "unicons";
  content: "";
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}
.card-3d-wrap {
  position: relative;
  width: 700px;
  max-width: 100%;
  height: 500px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  margin-top: 60px;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 600ms ease-out;
}
.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-color: #2a2b38;
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat.svg");
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  border-radius: 6px;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap {
  position: absolute;
  width: 100%;
  padding: 0 35px;
  top: 50%;
  left: 0;
  transform: translate3d(0, -50%, 35px) perspective(100px);
  z-index: 20;
  display: block;
}
.form-group {
  position: relative;
  width: 50%;
}
.form-group1{
    position: relative;
    width: 70%;
    margin: 40px auto;
}
.form-group select[data-v-5eb116b0] {
  width: 100%;
  height: 50px;
}
.checkassgin {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
}
.form-assgin {
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.form-assgin:focus,
.form-assgin:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.assgin input {
  margin: 10px;
}
.assgin {
    margin: auto;
}
.formReg {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.form-style {
  padding: 13px 20px;
  padding-left: 55px;
  height: 48px;
  width: 100%;
  font-weight: 500;
  border-radius: 4px;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: 0.5px;
  outline: none;
  color: #c4c3ca;
  background-color: #1f2029;
  border: none;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.form-style:focus,
.form-style:active {
  border: none;
  outline: none;
  box-shadow: 0 4px 8px 0 rgba(21, 21, 21, 0.2);
}
.input-icon {
  position: absolute;
  top: 0;
  left: 18px;
  height: 48px;
  font-size: 24px;
  line-height: 48px;
  text-align: left;
  color: #ffeba7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:-ms-input-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input::-moz-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:-moz-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input::-webkit-input-placeholder {
  color: #c4c3ca;
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus:-ms-input-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus::-moz-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus:-moz-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.form-group input:focus::-webkit-input-placeholder {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}
.btn {
  border-radius: 4px;
  height: 44px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
  padding: 0 30px;
  letter-spacing: 1px;
  display: -webkit-inline-flex;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -webkit-align-items: center;
  -moz-align-items: center;
  -ms-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  -moz-justify-content: center;
  -ms-justify-content: center;
  justify-content: center;
  -ms-flex-pack: center;
  text-align: center;
  border: none;
  background-color: #ffeba7;
  color: #102770;
  box-shadow: 0 8px 24px 0 rgba(255, 235, 167, 0.2);
  margin-top: 20px;
}
.btn:active,
.btn:focus {
  background-color: #a85a8d;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}
.btn:hover {
  background-color: #a85a8d;
  color: #ffeba7;
  box-shadow: 0 8px 24px 0 rgba(16, 39, 112, 0.2);
}
.logo {
  position: absolute;
  top: 30px;
  right: 30px;
  display: block;
  z-index: 100;
  transition: all 250ms linear;
}
.logo img {
  height: 26px;
  width: auto;
  display: block;
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