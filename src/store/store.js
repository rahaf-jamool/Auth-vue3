import { createStore } from "vuex";

import auth from "./modules/auth";
import post from "./modules/post";
import rule from "./modules/rule";
import user from "./modules/user";
import permission from "./modules/permission";

const store = createStore({
  modules: {
    auth,
    post,
    rule,
    permission,
    user,

  },
});

export default store;
