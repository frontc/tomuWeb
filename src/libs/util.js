import store2 from 'store2'
import config from '@/config'
import {
  Message
} from 'view-design'

/**
 * @description 获取ID
 */
export const byId = (name) => document.getElementById(name)

/**
 * @description 获取Class
 */
export const byClass = (name) => document.getElementsByClassName(name)[0]

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
export const addArrayAttr = (data, options) => {
  let newArray = []
  Object.keys(data).forEach((i) => {
    let obj = data[i]
    Object.keys(options).forEach((a) => {
      if (obj[a] === undefined) {
        obj[a] = options[a]
      }
    })
    newArray.push(obj)
  })
  return newArray
}

/**
 * @description 向数组里对象删除属性
 */
export const removeArrayAttr = (options) => {
  let newArray = []
  let dataArray = store2[config.storageType]('addSongData')
  Object.keys(dataArray).forEach((i) => {
    let obj = dataArray[i]
    Object.keys(options).forEach(a => {
      delete obj[a]
    })
    newArray.push(obj)
  })
  return newArray
}

/**
 * @description 添加歌单
 */
export const addSongData = (data, addData, type) => {
  store2[config.storageType]('addSongData', data)
  if (data.length === 0) {
    return addArrayAttr(addData, {
      flag: false,
      songSource: type
    })
  }
  if (data.length > 0) {
    let dataList = removeArrayAttr({
      flag: false,
      songSource: type
    })
    Object.keys(addData).forEach((i) => {
      let hasData = dataList.find(item => (JSON.stringify(item) === JSON.stringify(addData[i])))
      if (hasData === undefined) {
        data.push(addData[i])
      }
    })
  }
  return addArrayAttr(data, {
    flag: false,
    songSource: type
  })
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

/**
 * @description 获取歌单图片
 */
export const getSongBackgroundImage = (el) => {
  const handle = byClass(el);
  let {
    style: {
      backgroundImage
    }
  } = handle
  return backgroundImage.substring(5, backgroundImage.length - 2)
}

/**
 * @description 添加歌曲封面
 */
export const addSongImage = (el, picUrl) => {
  const handle = byClass(el);
  const newBox = document.createElement('div')
  const handleStyle = picUrl
  if (!document.getElementsByClassName('aplayImage')[0]) {
    newBox.className = 'aplayImage'
    handle.appendChild(newBox);
  }
  const aplayImageBox = byClass('aplayImage');
  aplayImageBox.style.cssText = handleStyle
}

/**
 * @description 添加CD
 */
export const addCdImage = (el) => {
  const handle = byClass(el);
  const cdBox = document.createElement('div')
  if (!byClass('cdImage')) {
    cdBox.className = 'cdImage'
    handle.appendChild(cdBox);
  }
}

/**
 * @description 添加CD
 */
export const getThisPlayer = (list, player) => {
  let index = 0
  Object.keys(list).forEach(i => {
    if (list[i].url === player.path[0].currentSrc) {
      index = i
    }
  })
  return index
}
