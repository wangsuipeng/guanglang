import i18n, {getLanguage} from "@/lang"
import Cookies from 'js-cookie'

//要设置的全局访问的state对象
const state = {
  language: getLanguage() || 'zh',
  username: Cookies.get('username') || '',
  nickname: Cookies.get('nickname') || '',
  currentProjectId: Cookies.get('currentProjectId') || '1',
  token: Cookies.get('token') || '',
  avatar: Cookies.get('avatar') || ''
};

const mutations = {
  languageEn(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.language = 'en';
  },
  languageZh(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.language = 'zh';
  },
  username(state, name) {
    state.username = name;
  },
  nickname(state, name) {
    state.nickname = name;
  },
  token(state, name) {
    state.token = name;
  },
  currentProjectId(state, id) {
    state.currentProjectId = id;
  },
  avatar(state, url) {
    state.avatar = url;
  },
};

const actions = {
  langEn({commit}) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('languageEn');
    i18n.locale = 'en';
    Cookies.set('language', 'en')
  },
  langZh({commit}) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('languageZh');
    i18n.locale = 'zh';
    Cookies.set('language', 'zh')
  },
  username({commit}, name) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('username', name);
    Cookies.set('username', name)
  },
  nickname({commit}, name) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('nickname', name);
    Cookies.set('nickname', name)
  },
  token({commit}, name) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('token', name);
    Cookies.set('token', name)
  },
  currentProjectId({commit}, id) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('currentProjectId', id);
    Cookies.set('currentProjectId', id)
  },
  avatar({commit}, url) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('avatar', url);
    Cookies.set('avatar', url)
  }
};

export default {
  state,
  mutations,
  actions
}
