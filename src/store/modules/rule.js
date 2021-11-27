import axios from "axios";
let token = window.localStorage.getItem('token');

export default {
  namespaced: true,
  state: {
    rules: [],
  },
  mutations: {
    SET_Rules(state, rules) {
      state.rules = rules;
    },
  },
  actions: {
    loadRules({ commit }) {
      axios
        .get(`/api/auth/roles/getAll?${token}`)
        .then((res) => {
          console.log("Rules :", res);
          let rules = res.data.Roles;
          commit("SET_Rules", rules);
        })
        .catch(function (error) {
          console.log("Error: ", error.message);
          console.log(error);
          console.log(error.status);
        });
    },
  },
  getters: {},
};
