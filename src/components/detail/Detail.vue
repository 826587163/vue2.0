<template>
	<transition enter-active-class="animated slideInRight" leave-active-class="animated slideOutRight">
	    <div class="detail" v-show="detailShow">
            <p class="title">{{seller.name}}</p>
            
            <!-- 这里是星星组件 -->
            <star :score = 'seller.score' class="star"></star>
            
            <!-- 优惠信息 -->
            <div class="combo">
            	<div class="line"></div>
            	<p>优惠信息</p>
            	<div class="line"></div>
            </div>
            <!-- 优惠信息详情 -->
            <div class="discount">
               <div v-for="(v,i) in pictures">
                  <img  :src="'../../../static/img/'+v" alt="" >
                  <p v-if="seller.supports?true:false">{{seller.supports[i].description}}</p>
               </div>
            </div>
            <!-- 商家公告 -->
            <div class="seller-info">
            	<div class="line"></div>
            	<p>商家公告</p>
            	<div class="line"></div>
            </div>
            <!-- 商家公告详情 -->
            <div class="details-info">{{seller.bulletin}}</div>
            <!-- 关闭图标 -->
            <span class="icon-close" @click="hideDetail"></span>

	    </div>
	</transition>
		 
	
</template>

<script>
	import {mapGetters} from 'vuex'
    // 导入动画样式
	import 'animate.css/animate.css'
    // 导入星星组件
    import star from '../star/Star.vue'

	export default{
		computed:{
			...mapGetters([
               'detailShow',
               'seller',
               'pictures'
			])
		},
		methods:{
			hideDetail(){
				this.$store.dispatch('hideDetail');
			}
		},
        components:{
            star
        }
	}
</script>

<style scoped lang="less">
	.detail{
		width: 100%;
		height: 100%;
		background:rgba(7,17,27,0.8);
		color:#fff;
		font-size:0.32rem;
		position:fixed;
		z-index:99999;
        top: 0;
        left: 0;
        bottom: 0!important;
		blur:0.1rem;
        .title{
        	font-size:0.32rem;
        	font-weight:700;
        	line-height:0.32rem;
        	text-align: center;
        	margin-top:1.28rem;
        }
        // 这里是星星组件
        .star{
               margin:0.32rem auto;
               text-align:center;
        }
        //优惠信息
        .combo{
        	position:absolute;
        	top:2.96rem;
        	left:0.72rem;
        	display:flex;
            justify-content:space-between;
        	text-align:center;

        }
        .combo .line{
        	width:2.24rem;
        	height:0.02rem;
        	background:rgba(225,225,225,0.2);
        	flex:1;
        	margin-top:0.1rem;
        }
        .combo p{
        	font-size:0.32rem;
        	flex:1;
        }
        .decrese{
        	margin-top:1.18rem;
        	margin-left:1.05rem;
        	height:0.5rem;
        	.decrese-text{
        		margin-left:0.7rem;
        		margin-top:-0.45rem;
        	}	
        }
        //优惠信息详情
        .discount{
            width: 90%;
            margin-top:1.16rem;
            margin-left:1.05rem;
            font-size:0.24rem;
            font-weight:200;
            color:rgb(255,255,255);
            line-height:0.24rem;
            div{
                margin-bottom: 0.24rem;
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
        //商家公告
        .seller-info{
        	position:absolute;
        	top:6.66rem;
        	left:0.72rem;
        	display:flex;
        	justify-content:space-between;
        	text-align:center;
        	.line{
	        	width:2.24rem;
	        	height:0.02rem;
	        	background:rgba(225,225,225,0.2);
	        	flex:1;
	        	margin-top:0.1rem;
	        }
	        p{
	        	font-size:0.32rem;
	        	flex:1;
	        	
	        }
        }
        //商家公告详情
        .details-info{
        	font-size:0.24rem;
        	font-weight:200;
        	line-height:0.48rem;
        	width:75%;
        	margin:1.06rem auto;
        }
        //关闭图标
        .icon-close{
            margin-left:48%;
            position:absolute;
            bottom:0.64rem;
            color:rgba(255,255,255,0.5);
            font-size: 0.44rem;
        }
        
        
	}
</style>