import axios from "axios";

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
        .get(`/api/auth/permission/getAll`)
        .then((res) => {
          console.log("Permissions :", res.data.Permission);
          let permissions = res.data.Permission;
          commit("SET_Permissions", permissions);
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    },
  },
  getters: {},
};
