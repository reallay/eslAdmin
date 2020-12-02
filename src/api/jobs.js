import request from '@/utils/request'

export function jobList(params) {
  return request({
    url: '/admin/jobList',
    method: 'get',
    params
  })
}
export function approveJobs(data) {
  return request({
    url: 'admin/approveJobs',
    method: 'post',
    data
  })
}

export function delJobs(data) {
  return request({
    url: 'admin/delJobs',
    method: 'post',
    data
  })
}

export function setJobFeature(data) {
  return request({
    url: 'admin/setJobFeature',
    method: 'post',
    data
  })
}
