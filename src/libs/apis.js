import qs from 'qs';
import axios from '@/libs/http';
import {
  getToken
} from '@/libs/util'
import config from '@/config';

const AuthorizationToken = () => ({
  headers: {
    common: {
      Authorization: `Bearer ${getToken()}`,
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
  // 查询Server版本
  getVersion () {
    return axios.get(`${config.apiVersions}/version`);
  },
  // 获取token
  getAuthKey () {
    return axios.get(`${config.apiVersions}/auth`);
  },
  // 新建频道
  addChannel() {
    return axios.post(`${config.apiVersions}/channel`, null, AuthorizationToken());
  },
  // 获取频道信息
  getChannelInfo (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}`, AuthorizationToken());
  },
  // 获取歌单列表
  getChannelSongs (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/songs`, AuthorizationToken());
  },
  // 获取全部歌单列表
  getChannelSongsAll (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/songs/all`, AuthorizationToken());
  },
  // 添加歌单
  setChannelSongs (channelID, data) {
    return axios.post(`${config.apiVersions}/channel/${channelID}/song`, qs.stringify(data), AuthorizationToken());
  },
  // 从频道删除歌曲
  deleteChannelSongs (channelID, songID) {
    return axios.delete(`${config.apiVersions}/channel/${channelID}/song/${songID}`, AuthorizationToken());
  },
  // 上报播放状态变化
  setChannelSongsStatus (channelID, data) {
    return axios.post(`${config.apiVersions}/channel/${channelID}/event/playStatusChange`, qs.stringify(data), AuthorizationToken());
  },
  // 获取频道在线用户
  getAudienceList (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/audience`, AuthorizationToken());
  },
  // 获取当前用户昵称
  getThisUserName () {
    return axios.get(`${config.apiVersions}/who`, AuthorizationToken());
  },
  // 用户从频道退出
  signOutChannel (channelID) {
    return axios.delete(`${config.apiVersions}/channel/${channelID}/audience`, AuthorizationToken());
  },
  // 踢走频道内的指定用户
  deleteUser (channelID, name) {
    return axios.delete(`${config.apiVersions}/channel/${channelID}/audience/${name}`, AuthorizationToken());
  },
  // 验证歌曲api
  copyRightApi (url) {
    return axios.get(url);
  },
  // 获取播放历史
  getPlayHistory (channelID, page, size) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/playHistory?pageNum=${page}&pageSize=${size}`, AuthorizationToken());
  },
  // 获取播放历史汇总
  getPlayHistorySummary (channelID) {
    return axios.get(`${config.apiVersions}/channel/${channelID}/playHistory/summary`, AuthorizationToken());
  }
};
