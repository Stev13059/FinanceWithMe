import { message } from 'ant-design-vue'

// Request config
const defaultOptions = {
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  baseURL: 'https://financewithme.azurewebsites.net/api',
  code: 'WePrywqwpoUEGrZA0UTEUvfqibt8H0QmOhBDmHzVbySFAzFu4V2R3w=='
};

// error interception 
const errorHandler = (error) => {
  if (error.response) {
    message.error(error.response.statusText || 'The server is busy, please try again later.');
  }
  if (error.statusText) {
    message.error(error.statusText || 'The server is busy, please try again later.');
  }
  return Promise.reject(error);
};

const requestInterceptor = (config) => {
  const newConfig = { ...config };
  newConfig.url = `${defaultOptions.baseURL}${config.url}`;
  if (newConfig.url.indexOf('/user/login') == -1 && newConfig.url.indexOf('/user/register') == -1) {
    const userId = localStorage.getItem('userId')
    if (userId) {
      config.params ? Object.assign(config.params, { 'userId': userId }) : config.params = { 'userId': userId }
    }
  }
  if (config.params) {
    if (config.method.toUpperCase() === 'GET') {
      newConfig.url = `${newConfig.url}?${Object.keys(config.params).map(m => (`${m}=${config.params[m]}`)).join('&')}`
    } else if (config.method.toUpperCase() === 'POST') {
      newConfig.body = JSON.stringify(config.params)
    }
    delete newConfig.params
  }
  newConfig.url = newConfig.url.indexOf('?') > -1 ? `${newConfig.url}&code=${defaultOptions.code}` : `${newConfig.url}?code=${defaultOptions.code}`
  return newConfig;
};

export const request = async (url, options = {}) => {
  const config = requestInterceptor({ ...defaultOptions, ...options, url });
  const response = await fetch(config.url, { ...config });
  if (response.ok) {
    const data = await response.json();
    if (data.result || data.code == 0) {
      return Promise.resolve(data)
    }
    message.error(data.msg || 'error');
    return Promise.reject();
  }
  return await errorHandler(response);
};
