<template>

  <div class="playlists" v-if="playlist">
    <div class="headerInfo">
      <div class="bg" :style="{'background-image':'url('+playlist.coverImgUrl+')'}"></div>
      <div class="img">
        <img :src="playlist.coverImgUrl" alt="">
        <span class="lsthd_icon">歌单</span>
        <div class="player"><span class="iconfont icon-tingge"></span>{{ playlist.playCount|playCountData }}</div>
      </div>
      <div class="info">
        <h4>{{playlist.name}}</h4>
        <p>
          <img :src="playlist.creator.avatarUrl" alt="">
          {{playlist.creator.nickname}}
        </p>
      </div>
    </div>
    <div class="listTitle">歌曲列表</div>
    <ul>
      <li v-for="(item,index) in playlist.tracks" :key="item.id">
          <div class="num">{{ index+1 }}</div>
          <router-link class="info" tag="div" :to="'player?id='+item.id">
            <h3 class="row_text">{{ item.name }}</h3>
            <p class="row_text"><i></i>{{ item.ar[0].name }} - {{ item.name }}</p>
          </router-link>
          <div class="icon"></div>
      </li>
    </ul>
  </div>

</template>

<script>
import Request from "../api/http.js";

export default {
  data:function(){
    return{
      playlist:null
    }
  },
  created(){
    console.log(this.$route.query.id);
    let query = this.$route.query;
    if(!("id" in query)){
      this.$router.push("/home");
    }
    Request({
      url:"/playlist/detail",
      method:"get",
      params:{
        id:query.id
      }
    }).then(res=>{
      console.log("歌单列表数据",res);
      this.playlist=res.playlist;
    })
  },
  filters:{
        playCountData(data){
            if(data < 10000){
                return data;
            }
            var w=data >10000?parseInt(data/10000):data;
            var y=w > 10000?parseInt(w/10000)+"亿":w+"万";
            return y;
        }
    }
}
</script>
<style>
.playlists .headerInfo{
  height: 186px;
  overflow: hidden;
  display: flex;
  position: relative;
}

.playlists .headerInfo .bg{
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  margin: auto;
  z-index: -1;
  background: url('../assets/playlistbackground.jpg') no-repeat 50% 50%;
  background-size: cover;
  transform: scale(1.5);
  filter: blur(20px);
}

.playlists .headerInfo .img{
  width: 126px;
  height: 126px;
  margin: 30px 15px;
  position: relative;
}
 .playlists .headerInfo .img img{
   width: 100%;
 }

 .playlists .headerInfo .img .player{
   font-size: 10px;
   color: #fff;
   position: absolute;
   top: 3px;
   right: 5px;
 }

 .playlists .headerInfo .img .player span{
   vertical-align: -1px;
 }

 .playlists .headerInfo .img .lsthd_icon{
   font-size: 12px;
   background: #db5253;
   color: #fff;
   height: 17px;
   line-height: 17px;
   width: 40px;
   display: block;
   text-align: center;
   border-radius: 0px 9px 9px 0px;
   position: absolute;
   left: 0px;
   top: 10px;
 }

 .playlists .headerInfo .info{
   margin-top: 30px;
   flex: 1px;
 }

 .playlists .headerInfo .info h4{
   font-size: 16px;
   color: #fff;
 }

 .playlists .headerInfo .info img{
   width: 30px;
   height: 30px;
   border-radius: 50%;
   overflow: hidden;
   display: inline-block;
   vertical-align: middle;
 }

 .playlists .headerInfo .info p{
   color: #e3e3e3;
   font-size: 12px;
 }

 /* 列表样式 */
 .playlists ul li{
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
  border-bottom: 1px solid #f2f2f3;
  height: 55px;
  position: relative;
 }

 .playlists .listTitle{
   height: 23px;
   line-height: 23px;
   background: #eeeff0;
   color: #666;
   font-size: 12px;
   text-indent: 1em;
 }
 .playlists ul li .num{
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
 .playlists ul li .info{
   display: flex;
   flex-direction: column;
   justify-content: center;
   flex: 1;
 }

.playlists ul li .info h3{
  font-size: 17px;
  color: #333;
  width: 300px;
}

.playlists ul li .info p{
  color: #888;
  font-size: 12px;
  width: 300px;
}

.playlists ul li .info p i{
  display: inline-block;
  width: 12px;
  height: 8px;
  background: url(../assets/index_icon_2x.png) no-repeat 0px 0px;
  background-size: 166px 97px;
  margin-right: 2px;
}

.playlists ul li .icon{
  width: 22px;
  height: 22px;
  background: url("../assets/index_icon_2x.png") no-repeat -24px 0px;
  background-size: 166px 97px;
  margin-right: 10px;
  margin-top: 16px;
}
</style>
