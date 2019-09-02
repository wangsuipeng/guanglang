const getters = {   //实时监听state值的变化(最新状态)
  language: state => state.app.language,
  collapse: state => state.sidebar.collapse,
  sidebarData: state => state.sidebar.sidebarData,
  username: state => state.app.username,
  nickname: state => state.app.nickname,
  token: state => state.app.token,
  currentProjectId: state => state.app.currentProjectId,
  avatar: state => state.app.avatar,
  isHeader: state => state.setting.isHeader,
};

export default getters;
