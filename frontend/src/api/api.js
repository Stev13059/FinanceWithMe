import { request } from "@/utils/request";

export const reqLoginAPI = (params, options) => request('/user/login', { method: 'GET', params, ...options })
export const reqRegisterAPI = (params, options) => request('/user/register', { method: 'POST', params, ...options })

export const transaction_list = (params, options) => request('/transaction/list', { method: 'GET', params, ...options})
export const transaction_add = (params, options) => request('/transaction/add', { method: 'POST', params, ...options})
export const transaction_edit = (params, options) => request('/transaction/edit', { method: 'POST', params, ...options });
export const transaction_delete = (params, options) => request('/transaction/delete', { method: 'POST', params, ...options });

export const savingGoals_list = (params, options) => request('/goals/list', { method: 'GET', params, ...options })
export const savingGoals_edit = (params, options) => request('/goals/edit', { method: 'POST', params, ...options })
export const savingGoals_delete = (params, options) => request('/goals/delete', { method: 'POST', params, ...options })
export const savingGoals_add = (params, options) => request('/goals/add', { method: 'POST', params, ...options })

export const groups_list = (params, options) => request('/group/list', { method: 'GET', params, ...options })
export const groups_userList = (params, options) => request('/group/userList', { method: 'GET', params, ...options })
export const groups_disband = (params, options) => request('/group/disband', { method: 'POST', params, ...options })
export const groups_addUser = (params, options) => request('/group/addUser', { method: 'POST', params, ...options })
export const groups_add = (params, options) => request('/group/add', { method: 'POST', params, ...options })
export const groups_exit = (params, options) => request('/group/exit', { method: 'POST', params, ...options })

export const analytics_total = (params, options) => request('/analytics/total', { method: 'GET', params, ...options })
export const analytics_exchangeRate = (params, options) => request('/analytics/exchangeRate', { method: 'GET', params, ...options })
export const analytics_proportion = (params, options) => request('/analytics/proportion', { method: 'get', params, ...options })

