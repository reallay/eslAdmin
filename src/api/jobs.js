import request from '@/utils/request'

export function jobList(params) {
  return request({
    url: '/admin/jobList',
    method: 'get',
    params
  })
}
