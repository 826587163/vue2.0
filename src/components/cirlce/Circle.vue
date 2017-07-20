<template>
	<div class="circle">
	   <transition enter-active-class="animated slideInRight" leave-active-class='animated zoomOut'>
           <span class="icon-remove_circle_outline icon-decrease" @click='doDelete' v-show="foods.count>0"></span>
	   </transition>
	   <span class="shownum" ref='shownum' v-show="foods.count">{{foods.count}}</span>
	   <span class="icon-add_circle icon-circle" @click="doAdd"></span>

	</div>
</template>
<script>
    import Vue from 'vue'
    import "animate.css/animate.css"
  	export default{
  	   props:['foods'],
       data(){
            return{
               timer:{}
            }
       },
       methods:{
         	 doAdd(){
               if(!this.foods.count){
                  Vue.set(this.foods,'count',1);
               }else{
                 this.foods.count++;
               }

         	 },

         	 doDelete(){
           	 	if(this.foods.count){
           	 		this.foods.count--;
           	 	}
         	 }

       }
  	}
</script>
<style lang="less" scoped>
	 .circle{
       height: 0.48rem;

       line-height: 0.48rem;
	 	.icon-decrease{
        	color:#00ccff;
        	font-size: 0.48rem;
          float: left;
        }
        .shownum{
          float: left;
          margin:0 0.2rem;
          color:rgb(147,153,159);

        }
        .icon-circle{
        	color:#00ccff;
        	font-size: 0.48rem;
        	float: left;
        }
	 }
</style>