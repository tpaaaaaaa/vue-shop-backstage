import mockRequest from '@/utils/mockRequest';
import { forEach } from 'lodash';

const state = {
    list: {},
};
const actions = {
    // 发请求获取首页mock数据
    async getData({ commit }) {
        const result = await mockRequest.get('/home/list');
        if (result.code !== 20000) return;
        commit('GETDATA', result.data);
    }
};
const mutations = {
    GETDATA(state, list) {
        state.list = list;
    }
};
const getters = {
    saleInfo(state) {
        const { orderFullYear, orderFullYearAxis, userFullYear, userFullYearAxis, orderRank } = state.list;
        return { orderFullYear, orderFullYearAxis, userFullYear, userFullYearAxis, orderRank };
    },
    saleRank(state) {
        const { saleRank } = state.list;

        const result = Object.entries(saleRank).reduce((prev, item, i) => {
            prev[i][item[0]] = item[1].value.reduce((prev, value, index) => {
                const name = item[1].name[index];
                prev.push({ name, value });
                return prev;
            }, []);
            return prev;
        }, [{ online: [] }, { shop: [] }]);

        return result;
    },
    allSaleRank(state) {
        const { saleRank } = state.list;
        const result = [];
        if (!saleRank)
            return;


        saleRank.online.value.forEach((value, i) => {
            result.push({
                name: saleRank.online.name[i],
                value: value + saleRank.shop.value[i]
            });

        });
        return result;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}