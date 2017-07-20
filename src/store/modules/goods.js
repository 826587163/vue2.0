 import types from '../mutations-types.js'
 import axios from 'axios'

const state={
   goods:[],//存储商品数据
   //实物详情页默认不展示
   showFood:false,
   showcartdetail:false,
}

const getters={//获取数据
	goods(state){
		return state.goods;
	},
    showFood(state){
        return state.showFood;
    },
    showcartdetail(state){
        return state.showcartdetail;
    }



}

const actions={
    getGoods({commit,state}){
    	axios.get('/api/goods').then(res=>{
    		if(res.data.errno==0){
    			commit(types.GET_GOODS,res.data.data);//获取请求后向types.GET_GOODS  发送商品数据
    		}
    	});
    },
    foodShow({commit}){//食物详情页面显示
        commit(types.FOOD_SHOW);
    },
    foodHide({commit}){//食物详情页面隐藏
        commit(types.FOOD_HIDE);
    },
    cardetailShow({commit}){//购物车详情页面显示
        commit(types.CARDETAIL_SHOW);
    },
    cardetailSHide({commit}){//购物车详情页面隐藏
        commit(types.CARDETAIL_HIDE);
    }
}

const mutations={
    [types.GET_GOODS](state,data){
    	state.goods=data;
    },
    [types.FOOD_SHOW](state){
        state.showFood=true;
    },
    [types.FOOD_HIDE](state){
        state.showFood=false;
    },
    [types.CARDETAIL_SHOW](state){
        state.showcartdetail=true;
    },
    [types.CARDETAIL_HIDE](state){
        state.showcartdetail=false;
    }

}

export default{
	state,
	getters,
	actions,
	mutations
}