import request from '@/utils/request'

export function eventsList(params) {
  return request({
    url: '/admin/eventList',
    method: 'get',
    params
  })
}
