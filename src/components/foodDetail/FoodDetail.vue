<template>
	<div class="detail"  ref="fooddetail">
		<div>
			<div class="img-box">
			    <img :src="cc.image" alt="" class="food-picture">
			    <span class="icon-arrow_lift icon-left" @click='foodhide'></span>
			</div>	
			<p class="food-name">{{cc.name}}</p>
			<div class="rating-box">
				<span class="sellCount">月售{{cc.sellCount}}份</span>
				<span class="rating">好评率{{cc.rating}}%</span>
			</div>
			<div class="price-box">
				<span class="price">￥{{cc.price}}</span>
				<span class="shop-btn" v-if="!cc.count" @click="add">加入购物车</span>
				<!-- 这是购物车加减组件 并向组件传递当前食物对象 -->
				<cir :foods='cc' v-if="cc.count" class="cir"></cir>
			</div>
			<div class="space-gray"></div>
			<p class="goods-rate">商品评价</p>
			<div class="button-box">
					<div class="total-button" ref="total" @click='selectType(2)' :class="{current:type==2}">全部<p>{{totalLen}}</p></div>
					<div class="total-button button-like" ref='like' @click='selectType(1)' :class="{current:type==1}">推荐<p>{{likeLen}}</p></div>
					<div class="total-button-dislike" ref='dislike' @click='selectType(0)' :class="{current:type==0}">吐槽<p>{{dislikeLen}}</p></div>
			</div>
			<div class="icon-box" ref="all" @click='selectContainer'>
				<span class="icon-check_circle duihao" ref='duihao'></span>
				<span ref='select'>只看有内容的评价</span>
			</div>
			<div v-for='(value,index) in cc.ratings' class="ratings-box" v-if="!(value.rateType==type)" v-show="container==''?true:container[index]">
				 <span class="times">{{getTime[index]}}</span>
				 <span class="username">{{value.username}}</span>
	             <img :src="value.avatar" alt="" class="avatar">
	             <span class="icon-thumb_down icon-gray" v-if="value.rateType==1?true:false"></span>
				 <span class="icon-thumb_up icon-damuzhion-blue" v-if="value.rateType==0?true:false" ></span>
				 <p class="text">{{value.text}}</p>

			</div>

		</div>		
	</div>
</template>

<script>
    import BScroll from 'better-scroll'
	import {mapGetters} from 'vuex'
	import 'animate.css/animate.css'
	import cir from '../cirlce/Circle.vue'
	import Vue from 'vue'

	export default{
		props:['cc','dd'],
		//cc 当前食物对象如皮蛋瘦肉粥
		//dd 当前食物对象如皮蛋瘦肉粥的所有评论
		created(){
           this.$nextTick(()=>{
	       	 	this._initFoodDetail();
	       });
		},
		components:{
			cir//加减小球组件
		},
		data(){
			return{
				time:[],//将毫秒值转化为日期格式
				type:2,//默认类型值
				container:''
			}
		},
		computed:{
			...mapGetters([
               'showFood',
               'goods',
               'ratings'

			]),
			getTime(){//将毫秒值转化为日期形式
	       	 	for(var i=0;i<this.cc.ratings.length;i++){
		   	 		    var time2 = this.cc.ratings[i].rateTime;
						var time= new Date(time2);
						var year = time.getFullYear();
						var month = time.getMonth();
						var date = time.getDate();
						var h = time.getHours();
						var m = time.getMinutes();
						var s = time.getSeconds();
                        if(date<10){
                        	date='0'+date;
                        }
                        if(h<10){
                        	h='0'+h;
                        }
                        if(m<10){
                        	m='0'+m;
                        }
                        if(s<10){
                        	s='0'+s;
                        }
						var t= year+'-'+(month+1)+'-'+date+' '+h+':'+m+':'+s;
	       	 			this.time.push(t);
	       	 	}

	       	 	return this.time;	
	       	},
	       	//评价总量
	       	totalLen(){
	       	 	var totalArr=[];
	       	 	for(var i=0;i<this.dd.length;i++){
                      totalArr.push(this.dd[i]);
	       	 	}
	       	 	return totalArr.length;
	        },
	        //推荐好评数量
	        likeLen(){
	       	 	var likeArr=[];
	       	 	for(var i=0;i<this.dd.length;i++){
	       	 		if(this.dd[i].rateType==0){
                       likeArr.push(this.dd[i]);
	       	 		}
	       	 	}
	       	 	return likeArr.length;
	        },
	        //吐槽数量
	        dislikeLen(){
	       	 	var dislikeArr=[];
	       	 	for(var i=0;i<this.dd.length;i++){
	       	 		if(this.dd[i].rateType==1){
                       dislikeArr.push(this.dd[i]);
	       	 		}
	       	 	}
	       	 	return dislikeArr.length;
	        }
		},
		methods:{
			_initFoodDetail (){
				this.foodDetail = new BScroll(this.$refs.fooddetail,{
				     click:true
			    });
			},
			//隐藏食物详情页
			foodhide(){
				this.$store.dispatch('foodHide');
			},
			//对type进行赋值
			selectType(ty){
                this.type = ty;
			},
			selectContainer(){
				if(this.container==''){
					this.container = [];
					for(var item of this.cc.ratings){
						if(item.text==''){
							this.container.push(false);
						}else{
							this.container.push(true);
						}
					}
					this.$refs.select.innerHTML = '查看所有评价';
					this.$refs.duihao.style.color ='#ccc';

				}else{
					this.container='';
					this.$refs.select.innerHTML = '只看有内容的评价';
					this.$refs.duihao.style.color ='lightgreen';
				}
			},
			//为每个食物对象增加count属性
		    add(){
		    	// this.$set(this.cc,'count',1);
		    	Vue.set(this.cc,'count',1);
		    }

		}
	}

</script>

<style lang="less" scoped>
	.detail{
		position: fixed;
		top: 0;
		left: 0;
		bottom:0.8rem;
		z-index: 666;
		width: 100%;
		// overflow: auto;
		background-color: #fff;
		overflow: hidden;
		.img-box{
			width:100%;
			height:0;
			position: relative;
			padding-bottom: 100%;
			.food-picture{
				width: 100%;
				height:100%;
				position: absolute;
				
			}
			.icon-left{
				position: absolute;
				z-index: 999;
				color:#aaa;
				font-size: 0.30rem;
				top:0.2rem;
			}

		}
		.food-name{
			font-size: 0.28rem;
			color:rgb(7,17,27);
			font-weight:700;
			line-height: 0.28rem;
			margin:0.36rem 0rem 0rem 0.36rem;
		}
		.rating-box{
			overflow: hidden;
			padding-bottom: 0.36rem;
            margin-left: 0.36rem;
			.sellCount{
	            font-size: 0.2rem;
	            color:rgb(147,153,159);
	            line-height: 0.2rem;
	            float:left;
	            margin:0.16rem 0.24rem 0rem 0rem;
			}
			.rating{
				font-size: 0.2rem;
	            color:rgb(147,153,159);
	            line-height: 0.2rem;
	            position: absolute;
	            margin-top: 0.15rem;
			}
			
		}
		.price-box{
			overflow: hidden;
			// border:0.01rem solid red;
			margin-bottom:0.36rem;
			.price{
			   float:left;
               font-size: 0.26rem;
               font-weight: 700;
               color:rgb(240,20,20);
               line-height: 0.48rem;
               margin-left: 0.36rem;
			}
			.shop-btn{
				display: inline-block;
				width: 1.48rem;
				height: 0.48rem;
				border-radius: 0.24rem;
				background:rgb(0,160,220);
				font-size:0.2rem;
				color:#fff;
				text-align: center;
				line-height: 0.48rem;
				float:left;
				position: absolute;
				right:0.36rem;
			}
			.cir{
				font-size: 0.24rem;
				color:rgb(147,153,159);
				position: absolute;
				right:0.36rem;
			}
		}
		.space-gray{
			width: 100%;
			height: 0.36rem;
			border-top:0.01rem solid #ccc;
			border-bottom:0.01rem solid rgba(7,17,27,0.1);
			background:#eee;
		}
		.goods-rate{
			font-size:0.3rem;
			padding:0.36rem 0rem 0rem 0.36rem;
		}
		.button-box{
			display: flex;
			font-size: 0.3rem;
			width:90%;
			margin-left: 5%;
			border-bottom: 0.01rem solid #ccc;
			.total-button{
				padding:0.26rem;
				width: 1.04rem;
				text-align: center;
				background:#0099CC;
				margin:0.36rem 0.16rem 0.36rem 0rem;
				color:#fff;
				&.current{
					background: tomato;
				}
				p{  
					display: inline-block;
					font-size: 0.12rem;
				}
			}
			.button-like{
				background:#66CCCC;
				margin-right: 0.16rem;
				&.current{
					background: tomato;
				}

			}
			.total-button-dislike{
				padding:0.26rem;
				text-align: center;
				background:#ccc;
				color:#fff;
				margin:0.36rem 0.16rem 0.36rem 0rem;
				&.current{
					background: tomato;
				}
				p{  
					display: inline-block;
					font-size: 0.12rem;
				}
			}
			
		}
		.icon-box{
			width:100%;
			color:rgb(147,153,159);
			font-size: 0.3rem;
			padding-top: 0.36rem;
			padding-bottom: 0.36rem;
			border-bottom: 0.01rem solid #ccc;
			.duihao{
	            margin-left:0.74rem;
	            color:lightgreen;

			}

		}
		.ratings-box{
			font-size: 0.2rem;
			color:rgb(147,153,159);
			border-bottom:0.01rem solid rgba(7,17,27,0.1);
			margin-left: 0.36rem;
			margin-right:0.36rem; 
			padding-bottom: 0.36rem;
			.times{
				display: inline-block;
				margin:0.32rem 0rem 0.12rem 0rem;

			}
			.username{
                margin-top: 0.3rem;
				position: absolute;
				right:0.72rem;
			}
			.avatar{
				width: 0.24rem;
				height: 0.24rem;
				border-radius: 0.12rem;
				position: absolute;
				right:0.36rem;
				margin-top: 0.3rem;
			}
			.icon-gray{
				color:rgb(147,153,159);
                position:absolute;
                left:0.4rem;
				margin-top: 0.65rem;
			}
			.icon-damuzhion-blue{
                position:absolute;
				color:blue;
				left:0.4rem;
				margin-top: 0.65rem;

			}
			.text{
				margin-left: 0.4rem;
			}
		}
		
	}
</style>