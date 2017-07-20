<template>
	<div class="ratings" ref="ratings">
	    <div>
		    <div class="score-box"> 
				<div class="sum-score">
					<p class="p1">{{seller.score}}</p>
					<p class="p2">综合评分</p>
					<p class="p3">高于周边商家{{seller.rankRate}}%</p>
				</div>
				<div class="ratings-score">
				    <div>
						<span>服务态度</span>
						<!-- 这是星星组件 并向组件传递服务评分 -->
						<star :score="seller.serviceScore" class="star"></star>
						<p class="sp">{{seller.serviceScore}}</p>
					</div>
					<div>
						<span>食物描述</span>
						<star :score="seller.foodScore" class="star"></star>
						<p class="sp">{{seller.foodScore}}</p>
					</div>
					<div>
						<span>送达时间</span>
						<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
					</div>	
				</div>
			</div>
			<div class="space-gray"></div>
			<div class="button-box">
			    <div class="total-button" @click='selectRatings(2)' :class="{'all':ratingsFlag==2} ">全部<p>{{arr.length}}</p></div>
				<div class="total-button button-like" @click='selectRatings(1)' :class="{'like':ratingsFlag==1}" >满意<p >{{getLikeLen}}</p></div>
				<div class="total-button-dislike" @click="selectRatings(0)" :class="{'dislike':ratingsFlag==0}" >不满意<p>{{getDislikeLen}}</p></div>
			</div>
			<div class="icon-box" @click="selectContainer">
				<span class="icon-check_circle duihao" ref='duihao'></span>
				<span ref='select'>只看有内容的评价</span>
			</div>
			<div class="ratings-list" v-for="(v,i) in ratings" v-if="!(v.rateType==ratingsFlag)" v-show="container==''?true:container[i]">
				<img :src="v.avatar" alt="">
				<div class="details">
					<span>{{v.username}}</span>
					<span class="time-info">{{getTime[i]}}</span>
	                <star :score="v.score" class="star"></star>
	                <p class="ratings-deliveryTime" v-if="v.deliveryTime?true:false">{{v.deliveryTime}}分钟送达</p>
			     	<p class="ratings-text">{{v.text}}</p>
			    	<span class="icon-thumb_down icon-gray" v-if="v.rateType==1?true:false" @click="v.rateType=0"></span>
			    	<span class="icon-thumb_up icon-damuzhion-blue" v-if="v.rateType==0?true:false" @click="v.rateType=1"></span>
			     	<div class="text-box" v-if="v.recommend?true:false">
			     	    <span v-for='value in v.recommend'>{{value}}</span>
			     	</div>
			     	
				</div>
		   </div>
		</div>
		<!-- 这是购物车组件 -->
		<shoppingcar></shoppingcar>
	</div>
</template>
<script>
    import BScroll from 'better-scroll'
    import {mapGetters} from 'vuex'
    import star from '../star/Star.vue'
    import shoppingcar from '../shoppingCar/ShoppingCar.vue'
	export default{
       created(){
       	 this.$store.dispatch('getRatings').then(() => {
       	 	this.$nextTick(()=>{
	       	 	this._initRatingsList();
	       	 });
       	 });
       	 // this.$store.dispatch('getSeller');
       	 this.$store.dispatch('getArr');
       	 
       },
       components:{
       	 star,
       	 shoppingcar
       },
       computed:{
	       	...mapGetters([
	         'ratings',
	         'seller',
	         'arr'
	        ]),
	        getTime(){
	       	 	for(var i=0;i<this.ratings.length;i++){
		   	 		    var time2 = this.ratings[i].rateTime;
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
	       	 //推荐数量
	       	 getLikeLen(){
	       	 	var likeArr=[];
	       	 	for(var i=0;i<this.arr.length;i++){
	       	 		if(this.arr[i].rateType==0){
                       likeArr.push(this.ratings[i]);
	       	 		}
	       	 	}
	       	 	return likeArr.length;
	       	 },
	       	 //吐槽数量
	       	 getDislikeLen(){
	       	 	var dislikeArr=[];
	       	 	for(var i=0;i<this.arr.length;i++){
	       	 		if(this.arr[i].rateType==1){
                       dislikeArr.push(this.ratings[i]);
	       	 		}
	       	 	}
	       	 	return dislikeArr.length;
	       	 }

	   },
       data(){
       	 return{
       	 	time:[],//将毫秒值转化为日期格式
       	 	container:'',
       	 	ratingsFlag:2//默认类型值
       	 }
       },
       methods:{
       	     _initRatingsList(){
       	     	this.ratingsList = new BScroll(this.$refs.ratings,{
       	     		click:true
       	     	});
       	     },
       	     //对ratingsFlag进行赋值
       	     selectRatings(type){
				this.ratingsFlag = type;
				setTimeout( () => {
					this.ratingsList.refresh();
				},100);
			},
			selectContainer(){	
				if(this.container == ''){
					this.$refs.duihao.style.color="rgb(0,160,220)";
					 this.$refs.select.innerHTML='查看所有评价';
					this.container = [];
					for(var item of this.ratings){
						if(item.text == ''){
							this.container.push(false);
						}else{
							this.container.push(true);
						}
					}
				}else{
					this.container = '';
					this.$refs.duihao.style.color="rgb(147,153,159)";
					// this.$refs.select.innerHTML='查看所有评价';
					this.$refs.select.innerHTML='只看有内容的评价';
				}
				//强制刷新，除去评论底部的空白
				setTimeout( () => {
					this.ratingsList.refresh();
				},100);
				
			}

       }
       
	}
</script>
<style lang="less" scoped> 
	.ratings{
		height:9rem;
		overflow: hidden;
		.score-box{
			display:flex;
			margin-top: 0.36rem;
			padding-bottom: 0.36rem;
			// border: 0.01rem solid #000;
			.sum-score{
				// border:0.01rem solid red;
				padding-bottom: 0.12rem;
				font-size: 0.2rem;
				width: 2.55rem;
				text-align: center;
				border-right: 0.01rem solid rgb(147,153,159);
				.p1{
					font-size:0.48rem;
					color:rgb(255,163,0);
					line-height: 0.5rem;
				}
				.p2{
					margin-top:0.12rem;
					color:rgb(7,17,27);
					line-height: 0.24rem;
				}
				.p3{
					margin-top:0.16rem;
					color:rgb(147,153,159);
					line-height: 0.2rem;
				}
			}				
			.ratings-score{
				font-size: 0.3rem;
				margin-left: 0.3rem;
				div{
					margin-bottom: 0.16rem;
					.star{
						margin-top: -0.34rem;
						margin-left: 1.3rem;
					}
					.sp{
						margin-top: -0.5rem;
						margin-left: 4rem;
						font-size: 0.3rem;
						color:rgb(255,153,0);
					}
					.deliveryTime{
						color:rgb(147,153,159);
						margin-left: 0.15rem;
					}
					
				}

			}
		}
		.space-gray{
			width: 100%;
			height: 0.36rem;
			border-top:0.01rem solid #ccc;
			border-bottom:0.01rem solid rgba(7,17,27,0.1);
			background:#eee;
		}
		.button-box{
			display: flex;
			font-size: 0.3rem;
			width:90%;
			margin-left: 10%;
			border-bottom: 0.01rem solid #ccc;
			.total-button{
				padding:0.26rem;
				width: 1.04rem;
				text-align: center;
				background:#0099CC;
				margin:0.36rem 0.16rem 0.36rem 0rem;
				color:#fff;
				&.all{
					background: tomato;
				}
				p{  
					display: inline-block;
					font-size: 0.12rem;
				}
			}
			.button-like{
				background:#66CCCC;
				&.like{
					background: tomato;
				}
			}
			.total-button-dislike{
				padding:0.26rem;
				text-align: center;
				background:#ccc;
				color:#fff;
				margin:0.36rem 0.16rem 0.36rem 0rem;
				&.dislike{
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
		.ratings-list{
			margin:0.36rem 0.36rem;
			padding-bottom: 0.36rem;
			// border:0.01rem solid red;
			font-size: 0.2rem;
            position: relative;
            border-bottom: 0.01rem solid #ccc;
			img{
				width:0.56rem;
				height:0.56rem;
				border-radius: 0.28rem;
			}
			.details{
				// width: 88%;
				margin-left: 0.76rem;
				margin-right: 0.36rem;
				margin-top: -0.6rem;
				// border:0.01rem solid blue;
				position: relative;
				.time-info{
					margin-left: 2.5rem;
					color:rgb(147,153,159);
					font-size: 0.2rem;
					font-weight: 200;
				}
				.star{
					margin-left: -0.2rem;
					margin-top: 0.1rem;
				}
				.ratings-deliveryTime{
					margin-top:-0.3rem;
					margin-left: 2.5rem;
					color:rgb(147,153,159);
				}
				.ratings-text{
					margin-top: 0.2rem;
					padding-bottom: 0.36rem;
					font-size: 0.24rem;
					color:rgb(7,17,27);
					line-height: 0.36rem;


				}
				.icon-gray{
					position: relative;
					top: -0.2rem;
					color:rgb(147,153,159);
				}
				.icon-damuzhion-blue{
					position: relative;
					top: -0.2rem;
					color:blue;
				}
				.text-box{
					position: relative;
					left:0.56rem;
					top:-0.55rem;
					span{
						font-size: 0.12rem;
						display: inline-block;
						padding: 0.12rem;
						border:0.01rem solid rgba(7,17,27,0.1);
						border-radius: 0.02rem;
						background: rgb(255,255,255);
						margin-right: 0.16rem;
						margin-bottom: 0.16rem;

					}
				}

			}

		}

		
	}
</style>