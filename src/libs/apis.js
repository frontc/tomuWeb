import qs from 'qs';
import axios from '@/libs/http';
import config from '@/config'

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
  // 查询频道信息
  getChannelInfo(channelID) {
    return axios.get(`${config.apiVersions}/${channelID}`);
  },
  // 新增歌单
  addSong(channelID) {
    return axios.post(`${config.apiVersions}/${channelID}/status`, qs.stringify(channelID));
  },
  // 验证歌曲api
  copyRightApi (url) {
    return axios.get(url);
  }
};
