import types from '../mutations-types.js'
import axios from 'axios'

// 存取状态数据
const state={
	//定义商家seller对象
    seller:{},
    //详情页默认不展示
    detailShow:false,
    //定义是否收藏商家
    flag:true,
    //图片数组
    pictures:['decrease_1@2x.png','discount_1@2x.png','discount_1@2x.png','invoice_1@2x.png','guarantee_1@2x.png']

}

//获取数据
const getters={
     seller(state){
     	return state.seller;
     },
     detailShow(state){
     	return state.detailShow;
     },
     flag(state){
      return state.flag;
     },
     pictures(state){
      return state.pictures;
     }


}

//定义方法
const actions={
     getSeller({commit,state}){
        //发送请求获取数据
        axios.get('/api/seller').then(res=>{
        	//错误码为0时
        	if(res.data.errno==0){
        		commit(types.GET_SELLER,res.data.data);
        	}
        })
     },
     showDetail({commit}){//头部点击展示详情页面
     	  commit(types.SHOW_DETAIL);
     },
     hideDetail({commit}){//头部点击关闭详情页面
     	  commit(types.HIDE_DETAIL);
     },
     flagDetail({commit}){
        commit(types.FLAGDETAIL);
    }
}

const mutations={
   [types.GET_SELLER](state,data){
   	  state.seller=data;//给商家seller传数据
   },
   [types.SHOW_DETAIL](state){
   	  state.detailShow=true;//给商家seller传数据
   },
   [types.HIDE_DETAIL](state){
   	  state.detailShow=false;//该方法点击关闭详情页面
   },
   [types.FLAGDETAIL](state){
      state.flag=!state.flag;
      // console.log(state.flag,'变');
   }

}

export default{
	state,
	getters,
	actions,
	mutations
}