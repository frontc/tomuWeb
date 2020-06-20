import qs from 'qs';
import axios from '@/libs/http';
import store2 from 'store2'
import config from '@/config'

export default {
  // 查询频道信息
  getChannelInfo(channelID) {
    return axios.get(`/api/v1/channel?${channelID}`, {
      baseURL: store2[config.storageType]('url')
    });
  },
  // 新增歌单
  addSong(channelID) {
    return axios.post(`/api/v1/channel/${channelID}/status`, qs.stringify(channelID), {
      baseURL: store2[config.storageType]('url')
    });
  },
};
