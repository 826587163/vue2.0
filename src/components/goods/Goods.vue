<template>
    <div class="goods">
	    <div class="menu-wrapper" ref = "menuwrappa">
	    	<ul>
	    		<li v-for="(value,key) in goods" @click = 'selectmenu(key,$event)' :class="{'current':key==currentIndex}">
                    <span class="name">{{value.name}}</span>
	    		</li>
	    	</ul>
	    </div>	
	    <div class="foods-wrapper" ref="foodswrapp">
	    	 <ul>
	    	 	<li v-for="(value,index) in goods" class="food-list">
	    	 	    <h1>{{value.name}}</h1>
	    	 		<ul>
	    	 			<li v-for="(item,i) in value.foods" class="foods-box" >
	    	 			    <div class="foods-box-one">
	    	 			    <!-- item是一个个对象如皮蛋瘦肉粥、豌豆焖面 -->
	    	 			    	<img :src="item.icon" alt="" @click="showDetail(item,i)" style="width:1.5rem;height:1.5rem"> 
	    	 			    </div>
	    	 			    <div class="foods-box-two">
	    	 			    	<p class="item.name">{{item.name}}</p>
	    	 			    	<p class="des">{{item.description}}</p>
	    	 			    	<p class="sellCount des">月售{{item.sellCount}}份</p>
	    	 			    	<span class="des">好评率{{item.rating}}%</span>
	    	 			    	<p class="price">￥{{item.price}}</p>
	    	 			    	<!-- 这是购物车加减组件  item是一个个对象如皮蛋瘦肉粥、豌豆焖面-->
	    	 			    	<Cirle :foods ='item' class="circle"></Cirle>
	    	 			    </div>

						</li>
						
	    	 		</ul>
                    
	    	 	</li>

	    	 </ul>
	    </div>
	    <!-- 这是食物详情页面的组件，传递当前点击食物对象及食物对象的评论 -->
	    <FoodDetail :cc = 'selectFood' :dd='selectlist' v-if="showFood"></FoodDetail>
	    <!-- 这是购物车组件 -->
	    <shoppingcar></shoppingcar>
    </div>
</template>

<script>
	import BScroll from 'better-scroll'
	import {mapGetters} from 'vuex'
	import FoodDetail from '../foodDetail/FoodDetail.vue'
	import Cirle from '../cirlce/Circle.vue'
	import shoppingcar from '../shoppingCar/ShoppingCar.vue'

	export default{
		created(){
			this.$store.dispatch('getGoods');
		},
		watch : {
			goods(){
				this.$nextTick( () => {
					this._initmenulist();
					this._initfoodlist();
					this._initHeight();
				});
			}
		},
		components:{
            FoodDetail,
            Cirle,
            shoppingcar
		},
		computed:{
			...mapGetters([
	            'goods',
	            'showFood'
			]),
			//当前索引
			currentIndex(){
				for(let i=0; i<this.listHeight.length; i++){
					let height1 = this.listHeight[i];
					let height2 = this.listHeight[i+1];
					if(!height2 || (this.scrollY >= height1 && this.scrollY < height2)){
						return i;
					}
				}
				return 0;
			}

		},
		data(){
			return{
				listHeight:[],//每个li高度数组
				scrollY:'',   //鼠标滚动时的纵坐标
				selectFood : {},//当前食物对象如皮蛋瘦肉粥
				selectlist:[]//当前食物对象如皮蛋瘦肉粥的所有评论
			}
		},
		methods : {
			//左边滚动
			_initmenulist () {
				this.menuwrap = new BScroll( this.$refs.menuwrappa , {
                    click:true
				});
			},
			//右边滚动
		    _initfoodlist(){
				this.foodswrap = new BScroll( this.$refs.foodswrapp , {
                    click:true,
                    probeType:3
				});
				this.foodswrap.on('scroll',(pos)=>{//鼠标移动位置的y坐标
					this.scrollY = Math.abs(Math.round(pos.y));
				})

			},
			_initHeight(){//将每个li的所在高度存在一个数组里
				let foodlist = this.$refs.foodswrapp.getElementsByClassName('food-list');
                let height =0;
                this.listHeight.push(height);
                for(let i=0; i<foodlist.length; i++) {
                	height += foodlist[i].clientHeight;
                	this.listHeight.push(height);
                }
                console.log(this.listHeight);

			},
			selectmenu(k,e){
				if(!e._constructed){//阻止双次点击事件,解决双联动
					   return;
				}
				let foodlist = this.$refs.foodswrapp.getElementsByClassName('food-list');
				this.foodswrap.scrollToElement(foodlist[k],300);
                this.currentIndex=k;


			},
			showDetail(f,i){
				this.$store.dispatch('foodShow');
				this.selectFood = f;
				// this.selectlist = f;
				this.selectlist.length=0;
				for(var i =0; i<this.selectFood.ratings.length;i++){
					this.selectlist.push(this.selectFood.ratings[i]);
				}
			}

		}


	}
</script>

<style lang="less" scoped>
	.goods{
		display:flex;
		.menu-wrapper{
			// width: 1.6rem;
			flex:0 0 1.6rem;
			overflow: hidden;
			height: 9rem;
			background:#f3f5f7;
			
			ul {
				// width: 1.6rem;
				flex:0 0 1.6rem;	

				li{
					width: 1.6rem;
					// margin:0 0.24rem;
                    padding:0 0.24rem;
					height:1.08rem;
					font-size:0.24rem;
					font-weight:200;
					text-align:center;
					color:rgb(7,17,27);
					display:table;
                    box-sizing:border-box;
					&.current{
						color:red;
						background: #fff;
					}
			        .name{
			        	display:table-cell;
				        vertical-align: middle;
				        width: 1.12rem;
				        border-bottom:1px solid #ccc;
			        }

				}
			}
		}
		.foods-wrapper{
			overflow: hidden;
			flex:1;
			font-size:0.28rem;
			height: 9rem;
			h1{
				background:#f3f5f7;
				padding-bottom: 0.15rem;
				padding-top: 0.15rem;
			}

		}
		.foods-box{
            display:flex;
            align-items: center;
            padding:0rem 0rem 0.2rem;
            border-bottom: 0.01rem solid #ccc;

			div{
				flex:1;
			}
		    .foods-box-two{
		    	// border:0.01rem solid red;
		    	width:3rem;
		    	position: absolute;
		    	left:2rem;

                p{
                	margin-bottom: 0.1rem;
                }
                .price{
                	font-size:0.28rem;
                	color:red;
                	font-weight:bold;
                }
                .circle{
                    position: absolute;
                    margin-top: -0.5rem;
                    right: 0.05rem;
                }
                .icon-circle{
                	color:#00ccff;
                	font-size: 0.48rem;
                	margin-left: 2rem;
                	position: absolute;
                	margin-top: -0.5rem;
                	
                }
			}
			.foods-box-two .sellCount{
				display: inline-block;
			}
			.foods-box-two .des{
                font-size:0.2rem;
                color:rgb(147,153,159);
			}
		}
		.item.name{
			margin-top:-0.5rem;
		}
		
	}

</style>