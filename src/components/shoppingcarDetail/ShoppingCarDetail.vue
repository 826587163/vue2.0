<template>
	<div class="pageDetail" v-show='showcartdetail'>
		 <div class="detailList">
		      <div class="shop-header">
			 	  	 <span class="sp1">购物车</span>
			 	  	 <span class="sp2" @click='del'>清空</span>
			 </div>
		      <div class="detailList-box" ref='scroll'>
		          <div>
				 	  <div class="shop-content" v-for="value in selectFoods">
				 	  <!-- value 购物车清单中指单个食物对象 -->
				 	  	   <span class='name'>{{value.name}}</span>
				 	  	   <cir :foods='value' class="cir"></cir>
				 	  	   <span class="price">￥{{value.price*value.count}}</span>   
				 	  </div>
			 	  </div>
		 	  </div>
		 </div>
		 
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import cir from '../cirlce/Circle.vue'
    import BScroll from 'better-scroll'
	export default{
		 props:['selectFoods'],
		 watch:{
		 	selectFoods(){
			 	this.$nextTick(()=>{
			 		setTimeout ( () => {
			 			if( !this.ShoppingList ) {
			 				 this.ShoppingList = new BScroll(this.$refs.scroll,{
			                	click:true
			                })
			 			} else {
			 				this.ShoppingList.refresh();
			 			}
			 		}, 1000);
			 	})
		 	}
		 },
		 data(){
		 	return{
		 		count:0
		 	}
		 },
		 components:{
		 	cir
		 },
         computed:{
         	...mapGetters([
         		'showcartdetail',
         		'goods'
            ])
            
         },
         methods:{
         	del(){
         		this.selectFoods.forEach(good=>{
         			good.count=0;
         		})
         		this.$store.dispatch('cardetailSHide');

         	}
         }
	}
</script>
<style lang="less" scoped>
	.pageDetail{
		width:100%;
		height:100%;
		background:rgba(7,17,27,0.6);
		top:0;
		left:0;
		bottom:0.92rem;
		position: fixed;
		z-index:9;
		blur:0.1rem;

		.detailList{
            width: 100%;
            max-height:5.19rem;
            left:0;
            position: absolute;
            bottom:0.92rem; 
            background: #fff;
            z-index: 666;
            // overflow: hidden;
			.shop-header{
	    		width: 100%;
	    		height:0.8rem;
	    		background: #f3f5f7;
	    		font-size: 0.28rem;
	    		line-height: 0.8rem;
	    		.sp1{
	    			margin-left: 0.36rem;
	    			font-weight: 200;
	    			color:rgb(7,17,27);
	    		}
	    		.sp2{
	    			margin-left:5.2rem;
	    			font-size: 0.24rem;
	    			color:rgb(0,160,220);
	    		}
	    	}
            .detailList-box{
            	background: #fff;
            	height: auto;
            	max-height:4.39rem;
            	overflow: hidden;
            	.shop-content{
            		height:0.96rem;
            		font-size: 0.28rem;
            		box-sizing: border-box;
            		padding: 0.24rem 0rem;
            		margin:0rem 0.36rem;
            		border-bottom: 0.01rem solid rgba(7,17,27,0.1);
            		line-height: 0.5rem;
            		.price{
            			margin-right: 0.3rem;
            			float:right;                       
            		}
            		.cir{
            			float:right;
            		}
            	}

			}
		}
		

	}
</style>