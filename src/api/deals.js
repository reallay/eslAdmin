import request from '@/utils/request'

export function dealsList(params) {
  return request({
    url: '/admin/dealsList',
    method: 'get',
    params
  })
}
