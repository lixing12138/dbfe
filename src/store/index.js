import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo, isTime } from '../api/getData'
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {},
        isLogin: false,
        isTime: false
    },
    mutations: {
        saveUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        },
        changeLogin(state, login) {
            state.isLogin = login;
        },
        setTime(state, isTime) {
            state.isTime = isTime;
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
        },
        async setTimeChoose({ commit }) {
            const res = await isTime();
            if (res.result) {
                commit('setTime', true);
            } else {
                commit('setTime', false);
            }
        }
    },
    modules: {}
})