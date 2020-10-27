import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken, getAdminName, setAdminName } from '@/utils/auth'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getAdminName(),
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
  login({ commit }, userInfo) {
    const { admin_name, admin_pwd } = userInfo
    return new Promise((resolve, reject) => {
      login({ admin_name: admin_name.trim(), admin_pwd: admin_pwd }).then(response => {
        // console.log(response)
        const data = response.message.data
        // console.log(response.message.data)
        commit('SET_TOKEN', data.token)
        commit('SET_NAME', data.info.account)
        // commit('SET_AVATAR', '')
        setToken(data.token)
        setAdminName(data.info.account)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    console.log(commit)
    console.log(state)

    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response
    //
    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }
    //
    //     const { name, avatar } = data
    //
    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        removeToken() // must remove  token  first
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
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

