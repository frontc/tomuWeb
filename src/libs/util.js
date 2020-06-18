import store2 from 'store2'
import config from '@/config'

/**
 * @description 自动补充options模式下的参数
 */
export const setOptionsData = (options, configProps) => {
  const data = {
    ...configProps,
    ...options
  };
  return data
}

/**
 * @description 自动补充options模式下的参数
 */
export const getPropsData = (options) => {
  let data = {}
  Object.keys(options).forEach((i) => {
    data[i] = options[i]
  })
  return data
}

/**
 * @description 获取是否已经进入频道
 */
export const getToMuLoginChanneFlag = () => store2.local(config.loginChannelName)
