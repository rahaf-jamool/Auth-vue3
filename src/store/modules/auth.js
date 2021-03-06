import axios from "axios";
let token = window.localStorage.getItem('token');

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
      return dispatch("attempt", res.data.token);
    },
    async attempt({ commit,state }, token) {
      if (token) {
        commit("SET_TOKEN", token);
      }
      if (!state.token){
        return
      }
        try{
          let res = await axios.get('/api/auth/profile',{
            headers:{
              'Authorization' : 'Bearer' + token
            }
          })
          commit('SET_USER',res.data)
        }catch(e){
          commit("SET_TOKEN", null);
          commit('SET_USER',null);
        }
    },
    async signOut ({commit}) {
      return axios.post(`/api/auth/logout?${token}`).then(() => {
      commit('SET_TOKEN', null);
          commit('SET_USER', null);
          })
    },
    //Register
    async register({ dispatch }, Credentials) {
      let res = await axios.post("/api/auth/register", Credentials);
      console.log(res.data);
      return dispatch("attempt1", res.data.access_token);
    },
    async attempt1({ commit }, token) {
     console.log(token);
      commit("SET_TOKEN1", token);
    },
    async profile({commit}){
      return axios.get(`/api/auth/profile?${token}`)
        .then((res) => {
          console.log("Users :", res);
          let users = res;
          // commit("SET_Rules", rules);
          commit("SET_USER",users);
        })
        .catch(function (error) {
          console.log("Error: ", error.message);
          console.log(error);
      });
    }
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
