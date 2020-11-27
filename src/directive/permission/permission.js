import store from '@/store'

function checkPermission(el, binding) {
  const { value } = binding
  const roles = store.getters && store.getters.roles
  // console.log(roles)
  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value
      console.log(permissionRoles)
      const hasPermission = roles.some(role => {
        console.log(role)
        console.log(permissionRoles.includes(role))
        return permissionRoles.includes(role)
      })
      console.log(hasPermission)
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor','lei']"`)
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding)
  },
  update(el, binding) {
    checkPermission(el, binding)
  }
}
