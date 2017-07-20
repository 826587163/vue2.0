<template>
	<div class="sellerPage" ref = "sellerPage">
		<div>
			<span class="selname">{{seller.name}}</span>
			<!-- 这是星星组件 -->
			<star :score='seller.score' class="star"></star>
			<span class="ratingCount">({{seller.ratingCount}})</span>
			<span class="sellCount">月售{{seller.sellCount}}单</span>
			<div class="gray-xin" >
				<span class="icon-favorite icon-xin" ref="cl" @click="flagDetail" v-if="flag"></span>
				<span class="like" ref="cl2" v-if="flag">收藏</span>
			</div>
			<div class="gray-xin" >
				<span class="icon-favorite icon-xin1" ref="cl" @click="flagDetail" v-if="!flag"></span>
				<span class="like" ref="cl2" v-if="!flag">已收藏</span>
			</div>
			<div class="line"></div>
			<div class="session-middle">
				<div>
					<p class="text">起送价</p>
					<p class="minPrice">{{seller.minPrice}}<span>元</span></p>
				</div>
				<div>
					<p class="text">商家配送</p>
					<p class="minPrice">{{seller.deliveryPrice}}<span>元</span></p>
				</div>
				<div class="noBorder">
					<p class="text">平均送达时间</p>
					<p class="minPrice">{{seller.deliveryTime}}<span>分钟</span></p>
				</div>
			</div>
			<div class="space-gray"></div>
			<p class="text-actions">公告与活动</p>
	        <div class="main-text">{{seller.bulletin}}</div>
	        <div class="discount">
	           <div v-for="(v,i) in pictures">
	        	  <img  :src="'../../../static/img/'+v" alt="" >
	        	  <p v-if="seller.supports?true:false">{{seller.supports[i].description}}</p>
               </div>
	        </div>
	        <div class="space-gray"></div>
	        <div class="seller-img">
	        	<p>商家实景</p>
	        	<div  class="pics" ref="slidePics">
	        	    <div class="pics-box">
	        		    <div v-for="v in seller.pics" ><img :src="v" alt=""></div>
	        		</div>
	        	</div>
	        </div>
	        <div class="space-gray"></div>
	        <p class="seller-info">商家信息</p>
	        <div class="seller-infos">
		        <ul v-for="value in seller.infos">
		        	<li>{{value}}</li>
		        </ul>
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
        	this.$store.dispatch('getSeller');//获取seller数据
        	// this.$store.dispatch('flagDetail');

        	setTimeout(()=>{
        		this.$nextTick( () => {
					this._initsellerlist();
					this._initslidelist();
				});	
        	},5);
        },
        watch : {
			seller(){
				this.$nextTick( () => {
					this._initsellerlist();
					this._initslidelist();
				});
			}
		},
        computed:{
			...mapGetters([
               'seller',
               'flag',
               'pictures'
			])
		},
        components:{
        	star,
        	shoppingcar
        },
        data(){
        	return {
        		sellerlist:{},
        		timer:{}
        	}
        },
        methods:{
        	//收藏的显示与隐藏
        	flagDetail(){
        		clearTimeout(this.timer);
		        this.timer=setTimeout(()=>{     
			        this.$store.dispatch('flagDetail');
                 
                },0);
            },
            _initsellerlist () {
			 	this.sellerlist = new BScroll(this.$refs.sellerPage , {
                   click:true
				});
			},
			_initslidelist(){
			 	this.slidelist = new BScroll(this.$refs.slidePics ,{
			 		click:true,
			 		scrollX:true
			 	});
			}

        }
	}
</script>

<style lang="less" scoped>
	.sellerPage{
		position:relative;
		height: 9rem;
		overflow: hidden;
		.selname{
			font-size:0.28rem;
			color:rgb(7,17,27);
			margin-left:0.36rem;
		} 
		.star{
			margin-top:-0.22rem;
			margin-left:0.2rem;
		}
		.ratingCount{
			font-size:0.28rem;
			color:rgb(77,85,93);
			position:absolute;
			top:1.35rem;
			left:3.6rem;

		}
		.sellCount{
			font-size:0.28rem;
			color:rgb(77,85,93);
			position:absolute;
			top:1.35rem;
			left:4.3rem;
		}
		.gray-xin{
			position:relative;
			.icon-xin{
				color:#ccc;
				position:absolute;
				top:-0.75rem;
				right:0.5rem;
				font-size: 0.34rem;
			}
			.icon-xin1{
				color:red;
				position:absolute;
				top:-0.75rem;
				right:0.5rem;
				font-size: 0.34rem;
			}
			.like{
				font-size:0.28rem;
			    color:rgb(77,85,93);	
				position:absolute;
				top:-0.4rem;
				right:0.4rem;

			}
		}
		.line{
			width: 90%;
			height: 0.02rem;
			background:rgba(7,17,27,0.1);
			margin:0.36rem auto;

		}
		.session-middle {
			width: 100%;
			padding:0.36rem 0rem;
            /* border-bottom:0.01rem solid #ccc; */
			display:flex;
			div{
               flex:1;
               text-align:center;
               border-right:0.01rem solid rgba(7,17,27,0.1);
               .text{
                  font-size:0.2rem;
                  color:rgb(147,153,159);
                  line-height:0.2rem;
                  margin-bottom:0.08rem;
               }
               .minPrice{
                  font-size:0.48rem;
                  color:rgb(7,17,27);
                  font-weight:200;
                  line-height:0.48rem;
                  span{
                  	 font-size:0.2rem;
                     color:rgb(147,153,159);
                  }
               }
			}
			.noBorder{
				border:0;
			}
		}
		.space-gray{
			width: 100%;
			height: 0.36rem;
			border-top:0.01rem solid #ccc;
			border-bottom:0.01rem solid rgba(7,17,27,0.1);
			background:#eee;
		}
		.text-actions{
			font-size:0.48rem;
	        font-weight:200;
	        line-height:0.48rem;
	        font-weight:500;
	        padding-left:0.36rem;
	        padding-top:0.36rem;
		}
		.main-text{
			margin:0.16rem 0.6rem;
			font-size:0.24rem;
			font-weight:200;
			color:rgb(240,20,20);
			line-height:0.48rem;
		}
        .discount{
        	width: 90%;
        	margin:0 auto;
        	margin:0rem 0.36rem;
			font-size:0.24rem;
			font-weight:200;
			color:rgb(7,17,27);
			line-height:0.32rem;
			div{
				padding:0.32rem 0rem 0.32rem 0.12rem;
				border-top:0.01rem solid rgba(7,17,27,0.1);
				img{
					width: 0.32rem;
					height: 0.32rem;
	            }
	            p{
	            	display:inline-block;
	            	position:absolute;
	            	margin-left:0.12rem;
	            }
				
			}
		}
		.seller-img{
			margin-left:0.36rem;
			margin-top:0.36rem;
			font-size:0.48rem;
			.pics{
				height: 1.8rem;
				margin:0.24rem 0rem 0.36rem;
				.pics-box{
					width: 9.86rem;
					height: 1.8rem;
					white-space: nowrap;
					// overflow: hidden;
					div{
						display: inline-block;
						height: 1.8rem;
						margin-right:0.12rem;
					    img{
						    width: 2.4rem;
						    height: 1.8rem;
						    display:inline-block;
						}	
						
					}
				}
				
			}
		}
		.seller-info{
			margin-left:0.36rem;
			margin-top:0.36rem;
			font-size:0.48rem;
		}
		.seller-infos{
			margin:0.24rem 0.36rem 0rem;
			font-size:0.24rem;
			font-weight:200;
			color:rgb(7,17,27);
			line-height: 0.32rem;
			// border:0.01rem solid red;
			ul > li{
				padding:0.32rem 0rem 0.32rem 0.24rem;
				border-top:0.01rem solid rgba(7,17,27,0.1);
			}
		}


	}
</style>