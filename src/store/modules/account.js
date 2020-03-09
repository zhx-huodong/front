import { axiosGet, setCookie } from '../../tools/tools';

export default {
	state: {
		user: '',
		roles:[],
		nowRole:{}
	},
	mutations: {
		SET_USER(state, val) {
			state.user = val;
		},
		SET_ROLES(state,val){
			state.roles=val
		},
		SET_NOWROLE(state,val){
			state.nowRole=val
		}
	},
	actions: {
		INIT_USER({ commit },val) {
			commit('SET_USER', val);
		},
		INIT_ROLES({commit},val){
			commit('SET_ROLES',val)
		},
		INIT_NOWROLE({commit},val){
			commit('SET_NOWROLE',val)
		}
	}
};
