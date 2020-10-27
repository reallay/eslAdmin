import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setAdminName(adminName){
  return Cookies.set('admin_name',adminName)
}
export  function  getAdminName(){
  return Cookies.get('admin_name')
}
