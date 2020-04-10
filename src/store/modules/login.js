export default {
  state: {
    show: false
  },
  mutations: {
    SET_SHOW(state, val) {
      state.show = val;
    }
  },
  actions: {
    INIT_SHOW({ commit }, val) {
      commit('SET_SHOW', val);
    }
  }
};
