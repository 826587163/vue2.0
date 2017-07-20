<template>
	<div class="shopcart">
		 <div class="footer" @click='showshopDetail'>
	        <div class="footer-left">
	             <div class="car" :class="{showBlue:totalCount>0}">
	                  <span class="icon-shopping_cart"></span>
	             </div>
               <!-- 显示总数的小球 -->
	             <div class="total-num" v-show=" totalCount>0 " >{{totalCount}}</div>
	             <span class="total-price" :class="{showWhite:totalCount>0}">￥{{totalPrice}}</span>
	        </div>
	        <div class="footer-middle">
	            还需配送费{{seller.deliveryPrice}}元
	        </div>
	        <div class="footer-right"  :class='{calc:totalPrice>=seller.minPrice}'>
	            {{pay}}
	        </div>
          
	       
	    </div>
      <!-- 购物车详情页面 显示所有被选中的食物对象数据-->
      <shoppingcartdetail :selectFoods='selectFoods'></shoppingcartdetail>
	</div>
</template>
<script>
    import {mapGetters} from 'vuex'
    import shoppingcartdetail from '../shoppingcarDetail/ShoppingCarDetail.vue'
  	export default{
          components:{
              shoppingcartdetail
          },
          computed:{
      	      ...mapGetters([
      	           'seller',
      	           'goods'
      	      ]),
      	      selectFoods(){
      	      	let foods = [];//有多少个食物对象被点击
      	      	this.goods.forEach( good=>{
      	      		good.foods.forEach( food=>{
      	      			if(food.count>0){
      	      				 foods.push(food);
      	      			}
      	      		})
      	      	})
                return foods;
      	      },
              //加入购物车总数量
              totalCount(){
                let count=0;
                this.selectFoods.forEach(food=>{
                  count += food.count;
                })
                return count;
              },
              //订单总价
              totalPrice(){
                let total = 0;
                this.selectFoods.forEach(food=>{
                  total += food.price*food.count;
                })
                return total;
              },
              //支付情况
              pay(){
                if(this.totalPrice==0){
                  return `￥${this.seller.minPrice}元起送`;
                }else if(this.totalPrice < this.seller.minPrice){
                  return `还差${this.seller.minPrice - this.totalPrice}元`;
                }else{
                  return '去结算';
                }
              }
    	   },
         data(){
            return {
               num:0
            }
         },
         methods:{
              //购物车点击显示 与隐藏 购物车展示详情页面
              showshopDetail(){
                  this.num++;
                  if(this.num%2!=0){
                      this.$store.dispatch('cardetailShow');
                  }else{
                      this.$store.dispatch('cardetailSHide');
                  }
                  
                  
              }
         }
    	   
	  }
</script>
<style lang="less" scoped>
	.footer{
      width: 100%;
      height: 0.92rem;
      background: #141d27;
      position:fixed;
      bottom:0;
      left:0;
      z-index:9999;
      .footer-left{
        width: 2.48rem;
        height:100%;
        float:left;
        border-right: 0.01rem solid rgba(255,255,255,0.1);
        display: inline-block;
        .car{
          width: 0.76rem;
          height:0.76rem;
          border-radius: 0.5rem;
          color:rgba(255,255,255,0.4);
          background:rgba(255,255,255,0.2);
          border:0.12rem solid #141d27;
          position: absolute;
          margin-top: -0.12rem;
          margin-left: 0.24rem;
          text-align: center;
          line-height: 0.6rem;
          &.showBlue{
            background: #00ccff;
          }
          span{
            font-size: 0.48rem;
          }
        }
        .total-num{
          width: 0.48rem;
          height: 0.35rem;
          border-radius: 0.15rem;
          background: red;
          color:#fff;
          position:absolute;
          left:0.9rem;
          margin-top: -0.1rem;
          font-size: 0.18rem;
          font-weight: 700;
          line-height: 0.32rem;
          text-align: center;
        }
        .total-price{
          font-size: 0.28rem;
          color:rgba(255,255,255,0.4);
          font-weight: 700;
          line-height: 0.48rem;
          margin-left: 1.6rem;
          position: relative;
          bottom: 0.3rem;
          &.showWhite{
            color:white;
          }
        }
      }
      .footer-middle{
         height:0.9rem;
         display: inline-block;
         position: absolute;
         z-index:99;
         float:left;
         color:rgba(255,255,255,0.4);
         font-size: 0.32rem;
         line-height: 0.9rem;
         margin-left: 0.24rem;
         
      }
      .footer-right{
        width: 2.1rem;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        background: rgba(255,255,255,0.2);
        display: inline-block;
        float:left;
        color:rgba(255,255,255,0.4);
        font-size: 0.32rem;
        position: absolute;
        right:0;
        &.calc{
          background: #00FF33;
          color:#fff;
        }
      }
    }
</style>