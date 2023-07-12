<template>
  <div>
      <!-- 头部 -->
      <header-nav></header-nav>
      <div class="headerHot">
          <div class="bg"></div>
          <div class="box">
              <div class="title"></div>
              <div class="time">更新日期：{{ playlist.updateTime | updateTimeFun }}</div>
          </div>
      </div>

      <div class="hotSong" v-if="playlist">
          <ul>
              <li v-for="(item,index) in playlist.tracks" :key="item.id">
                  <div :class="['num',{'con':index<=2}]">{{ index | setIndex }}</div>
                  <router-link class="info" tag="div" :to="'/player?id='+item.id">
                    <h3 class="row_text">{{item.name}} <span>{{ item.alia[0] }}</span></h3>
                    <p class="row_text"><i></i>{{item.ar[0].name}} -- {{ item.name }}</p>
                  </router-link>
                  <div class="icon"></div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue"
import Request from "../api/http.js"
export default {
    components:{
        HeaderNav
    },
    data:function(){
        return{
            playlist:null
        }
    },
    created(){
        Request({
            url:"/playlist/detail",
            method:"get",
            params:{
                id:'3778678'
            }
        }).then(data=>{
            console.log(data);
            this.playlist = data.playlist;
        })
    },

    filters:{
        updateTimeFun(num){
            var dd=new Date(num);
            return (dd.getMonth()+1)+"月"+dd.getDate()+"日"
        },
        setIndex(index){
            index=index+1;
            return index < 9?"0"+index:index;
        }
    }

}
</script>
<style>

.headerHot{
    height: 145px;
    background: url("../assets/player_img/hot_music_bg_2x.jpg") no-repeat 0 0;
    background-size: cover;
    position: relative;
}

.headerHot .bg{
    position: absolute;
    height: 145px;
    width: 100%;
    top: 0px;
    left: 0px;
    background-color:rgba(0,0,0,0,2) ;
    z-index: 1;
}

.headerHot .box{
    position: absolute;
    height: 120px;
    padding-top: 25px;
    width: 100%;
    top: 0px;
    left: 0px;
    z-index: 2;
}

.headerHot .title{
    width: 142px;
    height: 67px;
    background: url("../assets/index_icon_2x.png") no-repeat -28px -28px;
    background-size: 166px 97px;
    margin-left: 20px;
}

.headerHot .time{
    margin-left: 20px;
    font-size: 12px;
    color: #fff;
    margin-top: 10px;
}

.hotSong ul li{
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
  border-bottom: 1px solid #f2f2f3;
  height: 55px;
  position: relative;
 }

.hotSong ul li .num{
   width: 40px;
   height: 55px;
   line-height: 55px;
   text-align: center;
   position: absolute;
   left: -40px;
   top: 0px;
   color: #999;
   font-size: 16px;
 }

.hotSong ul li .num.con{
    color: #e13436;
}

.hotSong ul li .info{
   display: flex;
   flex-direction: column;
   justify-content: center;
   flex: 1;
 }

.hotSong ul li .info h3{
  font-size: 17px;
  color: #333;
  width: 300px;
}

.hotSong ul li .info h3 span{
    color: #888;
}

.hotSong ul li .info p{
    color: #888;
    font-size: 12px;
    width: 300px;
}

.hotSong ul li .info p i{
    display: inline-block;
    width: 12px;
    height: 8px;
    background: url("../assets/index_icon_2x.png") no-repeat 0px 0px;
    background-size: 166px 97px;
    margin-right: 2px;
}

.hotSong ul li .icon{
    width: 22px;
    height: 22px;
    background: url("../assets/index_icon_2x.png") no-repeat -24px 0px;
    background-size: 166px 97px;
    margin-right: 10px;
    margin-top: 16px;
}

</style>