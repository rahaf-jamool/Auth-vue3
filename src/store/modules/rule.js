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
          if(error.response.status == 403){
            alert('error '+error.response.data.error)
        }
        });
    },
  },
  getters: {},
};
