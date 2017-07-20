import types from '../mutations-types.js'
import axios from 'axios'

const state={
   ratings:[],
   arr:[]

}

const getters={
   ratings(state){
   	  return state.ratings;
   },
   arr(state){
      return state.arr;
   }

}

const actions={
   getRatings({commit}){//ajax获取ratings数据
      return new Promise((resolve,reject) => {
         axios.get('/api/ratings').then(res=>{
            if(res.data.errno==0){
               commit(types.GET_RATINGS,res.data.data);
               resolve();
            }
         })
      });	
   },
   getArr({commit}){
      axios.get('/api/ratings').then(res=>{
         if(res.data.errno==0){
            commit(types.GET_ARR,res.data.data);
         }
      })
   }
}

const mutations={
   [types.GET_RATINGS](state,data){
   	  state.ratings = data;
   },
   [types.GET_ARR](state,data){
        state.arr = data;
   }
}

export default{
	state,
	getters,
	actions,
	mutations
}