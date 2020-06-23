import Axios from 'axios';

/**
 * 处理请求成功后 业务内部状态
 */
const handleServeSuccess = (res) => {
  const { errorcode } = res.data;
  if (errorcode === 100) {
    // 业务错误
    return Promise.reject(res);
  }
  if (res.config.geRequest != undefined && res.config.geRequest) {
    return res.request
  }
  return res.data;
};

// 创建axios实例
const instance = Axios.create({
  timeout: 20000
});

// 设置URL
instance.defaults.baseURL = process.env.VUE_APP_BASE_URL;

// 设置请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.defaults.headers.get['Content-Type'] = 'application/json';
/**
 * 请求拦截器
 */
instance.interceptors.request.use(config => config, error => Promise.error(error));

/**
 * 响应拦截器
 */
instance.interceptors.response.use((res) => {
  if (res.status === 200) {
    // 请求成功
    return Promise.resolve(handleServeSuccess(res));
  }
  return Promise.reject(res);
}, (error) => {
  const { response } = error;
  if (response) {
    // 请求已经发出, 但不在2xx的范围
    throw error(response);
  }
  // 处理请求超时
  if (error.toString().includes('timeout')) {
    throw error('timeout!');
  }
  return Promise.reject(error);
});
export default instance;
