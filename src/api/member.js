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

export function  vipList(params){
  return request({
    url:'/admin/vipList',
    method:'get',
    params
  })
}

//admin/changeVipLevel
export function changeVipLevel(data){
  return request({
    url:'/admin/changeVipLevel',
    method:'post',
    data
  })
}
//admin/userObjectList

export function userObjectList(params){
  return request({
    url:'/admin/userObjectList',
    method:'get',
    params
  })
}
