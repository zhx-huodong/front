import { axiosGet, setCookie } from '../../tools/tools';

export default {
	state: {
		user: '',
		roles:[],
		nowRole:{},
		remindCount:0,
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
		},
		SET_REMINDCOUNT(state,val){
			state.remindCount=val
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
		},
		INIT_REMINDCOUNT({commit},val){
			commit('SET_REMINDCOUNT',val)
		}

	}
};
