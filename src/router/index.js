import { createRouter, createWebHistory } from "vue-router";

import Authentication from "../components/Authentication";
import Dashboard from "../pages/Dashboard";
// posts
import posts from "../pages/Posts/Posts";
import NewPost from "../pages/Posts/NewPost";
import EditPost from "../pages/Posts/EditPost";

// rules
import rules from "../pages/Roles/Roles";
import NewRole from "../pages/Roles/NewRole";
import EditRole from "../pages/Roles/EditRole";

// permission
import Permission from "../pages/Permissions/Permissions"
import NewPermission from "../pages/Permissions/NewPermission"
import EditPermission from "../pages/Permissions/EditPermission"

// users
import users from "../pages/Users/Users";
import NewUser from "../pages/Users/NewUser";
import EditUser from "../pages/Users/EditUser";

const routes = [
  {
    path: "/",
    component: Authentication,
  },
  {
    path: "/dashboard",
    component: Dashboard,
    name: "dashboard",
  },
  // users
  {
    path: "/users",
    component: users,
    name: "users",
  },
  {
    path: "/user/create",
    component: NewUser,
  },
  {
    path: "/user/update/:id",
    component: EditUser,
    params: true,
  },
  // posts
  {
    path: "/posts",
    component: posts,
    name: "posts",
  },
  {
    path: "/post/create",
    component: NewPost,
  },
  {
    path: "/post/update/:id",
    component: EditPost,
    params: true,
  },
  // rules
  {
    path: "/rules",
    component: rules,
    name: "rules",
  },
  {
    path: "/role/create",
    component: NewRole,
  },
  {
    path: "/role/update/:id",
    component: EditRole,
    params: true,
  },
  //permission
  {
    path: "/permissions",
    component:Permission,
    name: "permission"
  },
  {
    path: "/permission/create",
    component: NewPermission,
    name: "NewPermission",
  },
  {
    path: "/permission/update/:id",
    component:  EditPermission,
    name: "EditPermission",
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
