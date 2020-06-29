import qs from 'qs';
import axios from '@/libs/http';
import { getToken } from '@/libs/util'
import config from '@/config';

const AuthorizationToken = () => ({
  headers: {
    common: {
      Authorization: getToken()
    }
  }, // Authorization
});

export default {
  // 查询歌曲封面图片
  getPicUrl(url) {
    return axios.get('', {
      baseURL: url,
      geRequest: true
    });
  },
  // 查询歌曲列表
  getSongList(options) {
    return axios.get(`?server=${options.server}&type=${options.type}&id=${options.id}&r=${Math.random()}`, {
      baseURL: config.songListApi
    });
  },
  // 新建频道
  addChannel() {
    return axios.post(`${config.apiVersions}/channel`);
  },
  // 获取频道信息
  getChannelInfo (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}`);
  },
  // 获取歌单列表
  getChannelSongs (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/songs`, AuthorizationToken());
  },
  // 添加歌单
  setChannelSongs (channelID, data) {
    return axios.post(`${config.apiVersions}/channel/${channelID}/songs`, qs.stringify(data), AuthorizationToken());
  },
  // 上报播放状态变化
  setChannelSongsStatus (channelID, data) {
    return axios.post(`${config.apiVersions}/channel/${channelID}/status`, qs.stringify(data), AuthorizationToken());
  },
  // 验证歌曲api
  copyRightApi (url) {
    return axios.get(url);
  }
};
