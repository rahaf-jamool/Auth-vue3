<template>
  <div>
    <div class="create">
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
      <div class="title_form">
        <div class="lng">
          <h4>Role Form</h4>
        </div>
      </div>
      <hr style="color: #fff; opacity: 0.5" />
      <div class="parent"></div>
      <form class="row g-3 needs-validation" novalidate>
        <div class="col-md-6">
          <label for="validationCustom01" class="form-label">Title </label>
          <input
            type="text"
            class="form-control"
            id="validationCustom01"
            v-model="perm.name"
            required
          />
          <div class="valid-feedback">Looks good!</div>
        </div>
      </form>
      <div class="child_4">
        <button @click="updateprem()" class="btn" id="btnAdd">Update</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {},
  data() {
    return {
      Massage_success: "",
      Massage_warning: "",
      statusnumber: null,
      error: "",
      Progress: 0,
      perm: {
        name: "",
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
  },
  mounted() {
    this.fetch();
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
  created() {
    this.fetch();
  },
  methods: {
    close() {
      document.getElementById(`m`).classList.toggle("cvs");
    },
    fetch() {
      axios
        .get(`/api/auth/permission/getById/${this.$route.params.id}`)
        .then((res) => {
          console.warn("Role", res);
          this.roles.name = res.data.role.name;
          // this.roles.slug = res.data.role.slug;
          // this.roles.isAdmin = res.data.role.isAdmin;
        })
        .catch(function (error) {
          if (error) {
            console.log("error:", error);
            alert(
              `error !! Sorry Role by id request had error we can not return old data.. work soon`
            );
          }
        });
    },
    updateprem() {
      var self = this;

      if (this.perm.name == "") {
        this.Massage_warning =
          "Please enter the name field because it is required";
        document.getElementById(`m`).classList.toggle("cvs");
      } else {
        document.getElementById("sp").classList.toggle("cvs");
        axios
          .put(`/api/auth/permission/update/${this.$route.params.id}`, this.roles)
          .then(function (response) {
            console.log(response.data);
            document.getElementById("sp").classList.toggle("cvs");
            // self.Massage_success = "Update Permission Request Success";
            self.Massage_success = response.data.content;
            document.getElementById("su").classList.toggle("cvs");
            setTimeout(() => {
              self.$router.push({ name: "permission" });
            }, 2000);
          })
          .catch(function (error) {
            if (error.response) {
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
.child_4 button {
  box-shadow: 1px 1px 10px #09b2c7;
  background-color: darkcyan;
  border-radius: 5px;
  margin: 20px 0;
  transition: all 0.5s;
}
.child_4 button:hover {
  box-shadow: 2px 2px 20px #0d6efd;
}
form div {
  margin: 10px auto;
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
