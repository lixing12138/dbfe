import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '../api/getData'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        isLogin: false
    },
    mutations: {
        saveUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        changeLogin(state, login) {
            state.isLogin = login;
        }

    },
    actions: {
        async getUserData({ commit }) {
            const res = await getUserInfo();
            if (res.result) {
                commit('saveUserInfo', res.data);
                commit('changeLogin', true);
            } else {
                commit('saveUserInfo', {});
                commit('changeLogin', false);
            }
        }
    },
    modules: {}
})