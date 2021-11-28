import axios from "axios";
let token = window.localStorage.getItem('token');

export default {
  namespaced: true,
  state: {
    permissions: [],
  },
  mutations: {
    SET_Permissions(state, permissions) {
      state.permissions = permissions;
    },
  },
  actions: {
    loadPermissions({ commit }) {
      axios
        .get(`/api/auth/permission/getAll?${token}`)
        .then((res) => {
          console.log("Permissions :", res);
          let permissions = res.data.Permission;
          commit("SET_Permissions", permissions);
        })
        .catch(function (error) {
          if(error.response.status == 403){
            alert('error '+error.response.data.error)
        }
          console.log("Error: ", error);
        });
    },
  },
  getters: {},
};
