import request from '@/utils/request'

export function userList(params) {
  return request({
    url: '/admin/userList',
    method: 'get',
    params
  })
}

export function editUserInfo(data) {
  return request({
    url: '/admin/editUserInfo',
    method: 'post',
    data
  })
}

export function deleteUser(data){
  return request({
    url:'/admin/deleteUser',
    method:'post',
    data
  })
}

