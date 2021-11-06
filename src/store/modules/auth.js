import axios from "axios";

export default {
  namespaced: true,
  state: {
    token: null,
    user: null,
  },
  mutations: {
    //auth
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_USER(state, data) {
      state.user = data;
    },
    //register
    SET_TOKEN1(state, token) {
      state.token = token;
    },
  },
  actions: {
    //auth
    async signIn({ dispatch }, Credentials) {
      let res = await axios.post("/api/auth/login", Credentials);
      console.log(res.data);
      return dispatch("attempt", res.data.access_token);
    },
    async attempt({ commit, state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }
      console.log(token);
      if (!state.token) {
        return;
      }
    },
    //     signOut ({commit}) {
    //         return axios.post('auth/signout').then(() => {
    //         commit('SET_TOKEN', null);
    //             commit('SET_USER', null);
    //              })
    //     }
    //Register
    async register({ dispatch }, Credentials) {
      let res = await axios.post("/api/register", Credentials);
      console.log(res.data);
      return dispatch("attempt1", res.data.access_token);
    },
    async attempt1({ commit }, token) {
      console.log(token);
      commit("SET_TOKEN1", token);
    },
  },
  getters: {
    //auth
    authenticated(state) {
      return state.token && state.user;
      // return state.token && state.user;
    },
    user(state) {
      return state.user;
    },
  },
};
