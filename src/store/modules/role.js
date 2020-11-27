import { getToken, setToken, removeToken, getAdminName, setAdminName } from '@/utils/auth'
const getDefaultState = () =>{
  return {
      role:[getAdminName()]
  }
}

const state = getDefaultState()

const mutations = {}

const actions = {}

export default {
  namespaced:true,
  state,
  mutations,
  actions
}
