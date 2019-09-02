import Cookies from 'js-cookie'

//要设置的全局访问的state对象
const state = {
  sidebarData: sessionStorage.sidebarData || "[]",
  collapse: Cookies.get('collapse') === "true",
};

const mutations = {
  sidebarData(state, data) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.sidebarData = data;
    sessionStorage.sidebarData = data;
  },
  collapse(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.collapse = !state.collapse;
    Cookies.set('collapse', state.collapse);
  },
};

const actions = {
  sidebarData({commit}, data) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('sidebarData', data);
  },
  collapse({commit}) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('collapse');
  },
};

export default {
  state,
  mutations,
  actions
}
