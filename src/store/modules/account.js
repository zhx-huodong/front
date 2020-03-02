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
		INIT_USER({ commit },val) {
			
			commit('SET_USER', val);

		}
	}
};
