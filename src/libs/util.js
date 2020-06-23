import store2 from 'store2'
import config from '@/config'
import {
  Message
} from 'view-design'

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
export const getToMuLoginChanneFlag = () => store2[config.storageType](config.loginChannelName)

/**
 * @description 退出
 */
export const signOut = (router) => {
  store2[config.storageType](config.loginChannelName, false)
  setTimeout(() => {
    router.push(config.addChannelPath)
  }, 800)
}

/**
 * @description 收藏
 */
export const addFavorite = () => {
  try {
    window.external.addFavorite(config.url, config.title);
  } catch (e) {
    try {
      window.sidebar.addPanel(config.title, config.url, '');
    } catch (error) {
      Message.info('加入收藏失败，按 CTRL+D 键手动加入书签。');
    }
  }
}

/**
 * @description 向数组里对象添加属性
 */
export const addArrayAttr = (data, attrName, attrValue) => {
  let newArray = []
  Object.keys(data).forEach((i) => {
    let obj = data[i]
    if (obj[attrName] === undefined) {
      obj[attrName] = attrValue
    }
    newArray.push(obj)
  })
  return newArray
}

/**
 * @description 向数组里对象删除属性
 */
export const removeArrayAttr = (attrName) => {
  let newArray = []
  let dataArray = store2[config.storageType]('addSongData')
  Object.keys(dataArray).forEach((i) => {
    let obj = dataArray[i]
    delete obj[attrName]
    newArray.push(obj)
  })
  return newArray
}

/**
 * @description 添加歌单
 */
export const addSongData = (data, addData) => {
  store2[config.storageType]('addSongData', data)
  if (data.length === 0) {
    return addArrayAttr(addData, 'flag', false)
  }
  if (data.length > 0) {
    let dataList = removeArrayAttr('flag')
    Object.keys(addData).forEach((i) => {
      let hasData = dataList.find(item => (JSON.stringify(item) === JSON.stringify(addData[i])))
      if (hasData === undefined) {
        data.push(addData[i])
      }
    })
  }
  return data
}

/**
 * @description 保存歌单
 */
export const saveSongList = (data) => {
  let newData = []
  Object.keys(data).forEach((i) => {
    if (data[i].flag !== undefined && data[i].flag) {
      newData.push(data[i])
    }
  })
  return newData
}
