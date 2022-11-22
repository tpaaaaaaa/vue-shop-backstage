// 登录相关接口函数
import { login, logout, getInfo } from "@/api/user";
// token相关函数
import { getToken, setToken, removeToken } from "@/utils/auth";
// 路由中充值路由的方法
import { anyRoutes, resetRouter, asyncRoutes, constantRoutes } from "@/router";
import router from "@/router";

const getDefaultState = () => {
  return {
    // 获取token
    token: getToken(),
    // 存储用户名
    name: "",
    // 用户头像
    avatar: "",
    // 服务器返回菜单信息
    routes: [],
    // 角色信息
    roles: [],
    // 按钮权限信息
    buttons: [],
    // 对比之后项目中已有的异步路由，与服务器返回的标记信息对比后，【需要展示的路由】
    resultAsyncRoutes: [],
    resultAllRoutes: [],
    isResultRoutes: false,
  };
};

// 对比数组,计算出需要的异步路由
const calcAsyncRoutes = (asyncRoutes, routes) => {
  return asyncRoutes.filter((item) => {
    if (routes.indexOf(item.name) === -1) return false;

    if (item.children && item.children.length > 0)
      calcAsyncRoutes(item.children, routes);
    return true;
  });
};

const state = getDefaultState();

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState());
  },
  SET_TOKEN: (state, token) => {
    state.token = token;
  },

  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    state.name = userInfo.name;
    state.avatar = userInfo.avatar;
    state.routes = userInfo.routes;
    state.buttons = userInfo.buttons;
    state.roles = userInfo.roles;
  },

  // 计算出的异步路由
  SET_RESULTASYNVROUTES(state, asynvRoutes) {
    // vuex保存的路由
    state.resultAsyncRoutes = asynvRoutes;
    state.resultAllRoutes = constantRoutes.concat(
      anyRoutes,
      state.resultAsyncRoutes
    );
    // 【刷新页面vuex丢失状态，会导致页面白屏】将动态路由配置存入会话中，避免状态丢失
    sessionStorage.setItem("allRoutes", JSON.stringify(state.resultAllRoutes));

    // 更改路由器
    router.addRoutes(state.resultAllRoutes);
    this.isResultRoutes = true;
  },
};

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo;

    const result = await login({
      username: username.trim(),
      password: password,
    });
    // 失败
    if (result.code !== 20000) return Promise.reject(new Error("fail"));
    commit("SET_TOKEN", result.data.token);
    setToken(result.data.token);
    return "ok";
  },

  // 获取用户信息
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token);

    if (result.code !== 20000) return Promise(new Error("fail"));
    const { data } = result;
    if (!data) return Promise(new Error("获取数据失败，请重新再试"));
    // 返回数组包含：用户名、用户头像、routes【返回的标志】、role用户角色、button按钮权限
    // vuex存储用户全部信息
    commit("SET_USERINFO", data);
    commit("SET_RESULTASYNVROUTES", calcAsyncRoutes(asyncRoutes, data.routes));

    return "ok";
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token);
    if (result.code !== 20000) return Promise(new Error("fail"));

    removeToken(); // 必须先移除token
    resetRouter();
    commit("RESET_STATE");
    return "ok";
  },

  // remove token
  resetToken({ commit }) {
    return new Promise((resolve) => {
      removeToken(); // must remove  token  first
      commit("RESET_STATE");
      resolve();
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
