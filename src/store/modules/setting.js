const state = {
  isHeader: true
};

const mutations = {
  isHeader(state) {   //自定义改变state初始值的方法，这里面的参数除了state之外还可以再传额外的参数(变量或对象);
    state.isHeader = !state.isHeader;
  },
};

const actions = {
  isHeader({commit}) {  //自定义触发mutations里函数的方法，context与store 实例具有相同方法和属性
    commit('isHeader');
  },
};

export default {
  state,
  mutations,
  actions
}
