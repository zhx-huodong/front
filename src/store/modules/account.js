import { axiosGet, setCookie } from '../../tools/tools';

export default {
	state: {
		user: ''
	},
	mutations: {
		SET_USER(state, val) {
			state.user = val;
		}
	},
	actions: {
		INIT_USER({ commit }) {
      return axiosGet({
        url: '/v1/activity/GetMySubRole'
      }, false).then(res => {
        if (res.ErrorCode != 'OK') {
          setCookie('Authorization', '');
          return;
        }
        commit('SET_USER', res.Data);
      }).catch(err => err);
		}
	}
};
