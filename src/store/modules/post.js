import axios from "axios";
let token = window.localStorage.getItem('token');

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  mutations: {
    SET_Posts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    loadPosts({ commit }) {
      axios
        .get(`/api/auth/posts/getAll?${token}`)
        .then((res) => {
          console.log("Posts :", res.data.Posts);
          let posts = res.data.Posts;
          commit("SET_Posts", posts);
        })
        .catch(function (error) {
          console.log("Error: ", error);
        });
    },
  },
  getters: {},
};
