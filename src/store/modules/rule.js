import axios from "axios";

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
        .get(`/api/auth/roles/getAll`)
        .then((res) => {
          console.log("Rules :", res.data.Roles);
          let rules = res.data.Roles;
          commit("SET_Rules", rules);
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    },
  },
  getters: {},
};
