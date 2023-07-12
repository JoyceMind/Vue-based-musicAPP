<template>
  <div>
      <!-- 头部 -->
      <header-nav></header-nav>

      <!-- 编辑推荐 -->
      <div class="reclists">
          <div class="title">编辑推荐</div>
          <div class="content">
              <ul>
                  <li v-for="item in personalized" :key="item.id">
                    <router-link tag="div" :to="'/playlist?id='+item.id" class="item">
                      <div class="item">
                          <div class="img">
                              <img :src="item.picUrl" alt="">
                          </div>
                          <p>{{item.name}}</p>
                          <div class="player"><span class="iconfont icon-tingge"></span>{{item.playCount|playCountData}}</div>
                      </div>
                    </router-link>
                  </li>
              </ul>
          </div>
      </div>
      <div class="newmusic">
          <div class="title">最新音乐</div>
          <ul>
              <li v-for="item in newsong" :key="item.id">
                  <router-link tag="div" :to="'/player?id='+item.id" class="info">
                    <h3 class="raw-text">{{ item.name }}<span>{{ item.song.alias[0] }}</span></h3>
                    <p class="row_text"><i></i>{{ item.song.artists[0].name }} -- {{ item.name }}</p>
                  </router-link>
                  <div class="icon"></div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue"
import Request from "../api/http.js";
export default {
    data:function(){
        return{
            personalized:[],
            newsong:[]
        }
    },
    methods:{
        personalizedFun(){
            Request({
                url:"personalized",
                method:"get",
                params:{
                    limit:6
                }
            }).then((data)=>{
                console.log("推荐歌曲",data);
                this.personalized=data.result;
            })
        },
        newsongFun(){
            Request({
                url:"/personalized/newsong",
                method:"get",
                params:{
                    limit:10
                }
            }).then(data=>{
                console.log("最新音乐",data);
                this.newsong=data.result;
            })
        }
    },
    created(){
        this.personalizedFun();
        this.newsongFun();
    },
    components:{
        HeaderNav
    },
    // 过滤播放量的数据
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

.newmusic ul li .icon{
    width: 22px;
    height: 22px;
    background: url("../assets/index_icon_2x.png") no-repeat -24px 0px;
    background-size: 166px 97px;
    margin-right: 10px;
    margin-top: 16px;
}

.newmusic ul li .info p i{
    display: inline-block;
    width: 12px;
    height: 8px;
    background: url("../assets/index_icon_2x.png") no-repeat 0px 0px;
    background-size: 166px 97px;
    margin-right: 2px;
}

.newmusic ul li{
    display: flex;
    justify-content: space-between;
    margin-left: 10px;
    border-bottom: 1px solid #f2f2f3;
    height: 55px;
}

.newmusic ul li .info{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.newmusic ul li .info h3{
    color: #333;
    font-size: 17px;
}

.newmusic ul li .info h3 span{
    color: #888;
}

.newmusic ul li .info p{
    color: #888;
    font-size: 12px;
}

.newmusic ul li .info {
    color: #333;
}

.reclists .content ul{
    display: flex;
    flex-wrap: wrap;
}

.reclists .content ul li{
    width: 33.33%;
    margin-bottom: 13px;
}

.reclists .content ul li .item{
    padding-right: 2px;
    position: relative;
}

.reclists .content ul li:nth-child(3n) .item{
    padding: 0px;
}

.reclists .content ul li .item .player{
    font-size: 10px;
    color: #fff;
    position: absolute;
    top: 3px;
    right: 5px;
}

.reclists .content ul li .item .player span{
    vertical-align: -1px;
}

.reclists .content ul li p{
    padding: 2px;
    font-size: 13px;
}

.reclists .content ul li img{
    /* width:100%; */
    height: 123px;
    width: 123px;
}

.reclists .title,.newmusic .title{
    height: 54px;
    line-height: 54px;
    font-size: 17px;
    color: #333333;
    background-color: #fff;
    text-indent: 10px;
    position: relative;
}
.reclists .title::after,.newmusic .title::after{
    content:"";
    display: block;
    width: 2px;
    height: 16px;
    background: #d33a31;
    position: absolute;
    left: 0px;
    top: 21px;
}
</style>