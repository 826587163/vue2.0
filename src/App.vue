<template>
  <div id="app">
    <!-- 头部信息 -->
    <v-header></v-header>
    <!-- 选项卡 -->
    <div class="tab">
        <div class="tab-item">
            <router-link to='/goods'>商品</router-link>
        </div>
        <div class="tab-item">
            <router-link to='/ratings'>评论</router-link>
        </div>
        <div class="tab-item">
            <router-link to='/seller'>商家</router-link>
        </div>
    </div>
    <keep-alive>
         <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import Header from './components/header/Header.vue'
  import {mapGetters} from 'vuex'

  export default {
    name: 'app',
    components:{
      'v-header':Header,
    }

  }
</script>

<style lang="less" scoped>
    .tab{
      width: 100%;
      height: 0.8rem;
      display:flex;
      line-height:0.8rem;
      text-align:center;
      align-items:center;
      border-bottom: 0.01rem solid #ccc;
      .tab-item{
         flex:1;
         font-size:0.28rem;
         color:rgb(77,85,93);
         .active{
            font-size:0.28rem;
            color:rgb(240,20,20);
         }
      }
    }
    
</style>
