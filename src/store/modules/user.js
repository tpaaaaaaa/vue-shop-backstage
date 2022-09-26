import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: ''
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    // 解构用户名和密码
    const { username, password } = userInfo

    const result = await login({ username: username.trim(), password: password })
    // 失败
    if (result.code !== 20000) return Promise.reject(new Error('fail'))

    commit('SET_TOKEN', result.data.token)
    setToken(result.data.token)
    return 'ok'
  },

  // get user info
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)

    if (result.code !== 20000) return Promise(new Error('fail'))
    if (!result.data) return Promise(new Error('获取数据失败，请重新再试'))

    commit('SET_NAME', result.data.name)
    commit('SET_AVATAR', result.data.avatar)
    return 'ok'
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token)
    if (result.code !== 20000) return Promise(new Error('fail'))

    removeToken() // 必须先移除token
    resetRouter()
    commit('RESET_STATE')
    return 'ok'
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

