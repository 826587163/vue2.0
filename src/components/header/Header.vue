<template>
   <div>
		<div class="header">
		    <div class="bg-box">
		    	<img :src="seller.avatar" alt="" class="bgpic">
		    </div>
		    <img :src="seller.avatar" alt="" class="img-logo" @click="showDetail">
		    <img src="../../../static/img/brand@2x.png" alt="" class="img-brand">
			<span class="title">{{seller.name}}</span>
			<span class="description">{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
			<img src="../../../static/img/decrease_1@2x.png" alt="" class="img-decrease">
			<span v-if="seller.supports?true:false" class="decrese-text">{{seller.supports[0].description}}</span>
			<div class="bor" @click="showDetail">5个 <span class="icon-keyboard_arrow_right right"></span></div>
			<div class="intro">
				<img src="../../../static/img/bulletin@2x.png" alt="" class="bulletin" @click="showDetail">
				<p class="des">{{seller.bulletin}}</p>
				<p class="p-icon" @click="showDetail"><span class="icon-keyboard_arrow_right right2"></span></p>

				
			</div>
			 
		    <!-- 弹出层 -->
			<Detail></Detail>
		</div>
	</div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import Detail from '../detail/Detail.vue'

	export default{
		created(){
			this.$store.dispatch('getSeller');
		},
		computed:{
			...mapGetters([
               'seller',
			])
		},
		components:{
			Detail
		},
		methods:{
			showDetail(){
				this.$store.dispatch('showDetail');
			}
		}
	}
</script>

<style lang="less" scoped>
	.header{
	    height: 2.68rem;
		background-color:rgba(7,17,27,0.5);
		color:#fff;
		font-size: 0.2rem;
		.bg-box{
			.bgpic{
				width: 100%;
				height:2.68rem;
				position: absolute;
				z-index:-1;
				opacity:0.2;
			}
		}
		.img-logo{
			width:1.28rem;
			height:1.28rem;
			border-radius:0.04rem;
			position:absolute;
			top:0.48rem;
			left:0.48rem;

		}
		.img-brand{
			width:0.5rem;
			height:0.32rem;
			position:absolute;
			left:2.08rem;
			top:0.48rem;
		}
		.title{
			font-size:0.32rem;
			font-weight:bold;
			line-height:0.36rem;
			position:absolute;
			left:2.7rem;
			top:0.48rem;
		}
		.description{
			font-size:0.24px;
			font-weight:200;
			line-height:0.24rem;
			position:absolute;
			left:2.08rem;
			top:0.96rem;

		}
		.img-decrease{
			width:0.2rem;
			height:0.2rem;
			position:absolute;
			left:2.08rem;
			top:1.4rem;
		}
		.decrese-text{
			font-weight: 200;
			line-height:0.24rem;
			position:absolute;
			left:2.36rem;
			top:1.4rem;
		}
		.bor{
			width:0.9rem;
			height:0.48rem;
			font-weight:200;
			text-align:center;
			line-height:0.48rem;
			background:rgba(0,0,0,0.2);
			border-radius:0.14rem;
			position:absolute;
			right:0.24rem;
			top:1.2rem;
			.right{

				font-size: 0.3rem;
				position: absolute;
				margin-top: 0.1rem;
			}
		}
		.intro{
			width:100%;
			height:0.56rem;
			background:rgba(7,17,27,0.2);
			position:absolute;
			top:2.12rem;
            .info{
            	width:0.48rem;
            	height:0.25rem;
            	font-size: 0.12rem;
            	background:#fff;
            	margin-top:0.15rem;
            	margin-left:0.24rem;
            }
            .bulletin{
            	width:0.5rem;
            	height:0.3rem;
            	margin-top:0.13rem;
            	margin-left:0.34rem;
            }
            .des{
            	font-size:0.2rem;
            	color:#fff;
            	font-weight:200;
            	line-height:0.24rem;
            	overflow:hidden;
            	text-overflow:ellipsis; 
            	white-space: nowrap;
            	width:75%;
            	position:absolute;
				left:1.12rem;
				top:0.15rem;
            	
            }
            .p-icon{
            	font-size:0.2rem;
            	position:absolute;
				right:0.24rem;
				top:0.15rem;
				.right2{
					font-size: 0.35rem;
				}
            	
            }
		}

	}
</style>