import axios from "axios";

export default {
  namespaced: true,
  state: {
    Users: [],
  },
  mutations: {
    SET_Users(state, Users) {
      state.Users = Users;
    },
  },
  actions: {
    loadUsers({ commit }) {
      axios
        .get(`/api/auth/user/getAll`)
        .then((res) => {
          console.log("Users :", res.data.Users);
          let Users = res.data.Users;
          commit("SET_Users", Users);
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    },
  },
  getters: {},
};
