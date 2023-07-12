<template>
    <div class="player" v-if="songDetail">
        <div class="bg" :style="{'background-image':'url('+songDetail.al.picUrl+'?param=160y160)'}">
        
        </div>
        <!-- 挡针 -->
        <div :class="['playImage',{'play': !isplay}]">
            <div class="needle"></div>
            <!-- pause :暂停动画效果 -->
            <div :class="['box',{'pause':isplay}]" @click="setPlayMusic">
                <div class="dd"></div>
                <div class="disc_light"></div>
                <div class="img">
                    <img :src="songDetail.al.picUrl+'?param=160y160'" alt="">
                </div>
                <div class="playBtn" v-show="isplay"></div>
            </div>
        </div>
        <div class="title">{{ songDetail.name }}  --  <span>{{ songDetail.ar[0].name }}</span>
        
        </div>
       <!-- 音频标签 -->
        <audio ref="audio" hidden :src="songUrl" controls @timeupdate="timeupdateFun" @ended="endedFun"></audio>
        <!-- 歌词界面 -->
        <div class="lyricView">
            <ul :style="{'top':lyricTop}">
                <li :class="{'con':currentIndex==index || currentTime==item.time}" v-for="(item,index) in lyric"  :key="index">{{ item.text }}</li>
            </ul>
        </div>
        <!-- 上一曲，暂停，下一曲操作界面 -->
        <div class="bottom">
            <div class="operators">
                <div class="icon-left">
                    <i class="iconfont icon-shangyishou"></i>
                </div>
                <div @click="setPlayMusic" class="icon-center">
                    <i class="iconfont icon-bofang1" v-show="isplay"></i>
                    <i class="iconfont icon-zanting" ></i>
                </div>
                <div class="icon-right">
                    <i class="iconfont icon-xiayishou"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Request from "../api/http.js";
export default {
    data:function(){
        return{
            songDetail:null,
            isplay:true,
            songUrl:"",
            lyric:[],
            lyricTop:"20px",
            currentIndex:0,
            currentTime:0,
        }
    },
    methods:{
        songDetailFun(){
            let id = this.$route.query.id;
            Request({
                url:"/song/detail",
                method:"get",
                params:{
                    ids:id
                }
            }).then(data=>{
                console.log("歌曲详情",data);
                this.songDetail = data.songs[0]
            })
        },
        songUrlFun(){
            let id = this.$route.query.id;
            Request({
                url:"/song/url",
                method:"get",
                params:{
                    id:id
                }
            }).then(data=>{
                console.log("音乐url",data);
                this.songUrl = data.data[0].url;
            })
        },
        setPlayMusic(){
            console.log(this.$refs.audio);
            if(this.isplay){
                this.$refs.audio.play();
            }else{
                this.$refs.audio.pause();
            }
            this.isplay = !this.isplay;
        },
        lyricFun(){
            let id = this.$route.query.id;
            Request({
                url:"/lyric",
                method:"get",
                params:{
                    id:id
                }
            }).then(data=>{
                this.formatLyric(data.lrc.lyric)
            })
        },
        formatLyric(text){
            this.lyric=[];
            let arr = text.split("\n");
            for (let i=0;i<arr.length;i++){
                let temp_arr = arr[i].split("]");
                if(temp_arr[1]){
                    var obj = {};
                    let time_arr = temp_arr[0].substring(1,temp_arr[0].length-1).split(':');
                    console.log(time_arr);
                    obj.time = time_arr[0]*60+Math.ceil(time_arr[1]);
                    obj.text = temp_arr[1]
                    if(temp_arr[1].length>47){
                        obj.height=2;
                    }else{
                        obj.height=1
                    }
                    this.lyric.push(obj);
                }
            }
            console.log(this.lyric);
        },
        timeupdateFun(){
            console.log("更新",this.$refs.audio.currentTime);
            let height = 0;
            for(let i=0;i<this.lyric.length;i++){
                height += this.lyric[i].height * 25;
                if(parseInt(this.$refs.audio.currentTime) == this.lyric[i].time){
                    this.lyricTop=20-height+"px";
                    this.currentIndex=i;
                    this.currentTime = this.$refs.audio.currentTime;
                    return;
                }
            }
        },
        //音乐结束暂停
        endedFun(){
            this.$refs.audio.pause();
            this.isplay = true;
        }
    },
    created(){
        this.songDetailFun();
        this.songUrlFun();
        this.lyricFun();
    }
}
</script>

<style>
.player .bottom{
    position: absolute;
    bottom: 10px;
    width: 200px;
}
.player .operators {
   
    display: flex;
    color: #f3f;
    padding-left: 150px;
    align-items: center;
 
}



.player .operators .icon-shangyishou{
    align-items: center;
    height: 14px;
    width: 14px;
    color: #f2d3d5;
    text-align: center;


}

.player .bg{
    position: fixed;
    top: 0px;
    bottom: 0px;
    width: 100%;
    background: url("../assets/headshot.jpg") no-repeat 50% 50%;
    background-size: cover;
    transform: scale(1.5);
    filter: blur(20px);
    z-index: -1;
}

.player .playImage{
    padding-top: 55px;
    height: 247px;
}

.player .playImage .box{
    position: relative;
    height: 247px;
    animation:rotate 20s linear infinite;
}
.player .playImage .box.pause{
    animation-play-state: paused;
}

.player .playImage .dd{
    width: 247px;
    height: 247px;
    background: url("../assets/player_img/03.png") no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
}

.player .playImage .disc_light{
    width: 247px;
    height: 247px;
    background: url("../assets/player_img/disc_light.png") no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
}

.player .playImage .img{
    width: 155px;
    height: 155px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 46px;
    margin: auto;
}

.player .playImage .img img{
    width: 100%;
}

.player .playImage .playBtn{
    width: 56px;
    height: 56px;
    background: url("../assets/player_img/download.png") no-repeat center center;
    background-size: 100%;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 123px;
    margin: auto;
    transform: translateY(-50%);
}

.player .playImage .needle{
    width: 86px;
    height: 126px;
    background: url("../assets/player_img/needle.png") no-repeat 0 0;
    background-size: contain;
    position: absolute;
    left: 0px;
    right: 0px;
    top: 0px;
    margin: auto;
    transform: translateX(50%);
    z-index: 10;
    /* 档针挪动 */
    transform: translateX(50%) rotate(-20deg);
    transform-origin: left top;
    transition: all 0.5s linear;
}

.player .playImage.play .needle{
    transform: translateX(50%) rotate(0);
}

.player .title{
    text-align: center;
    font-size: 18px;
    font-weight: bold;
    color: #fff;
    padding: 15px 0px;
}

.player .title span{
    font-size: 13px;
    font-weight: normal;
}

.player .lyricView{
    padding: 0px 40px;
    margin-top:10px;
    text-align:center;
    color:#fff;
    font-size: 14px;
    height: 250px;
    overflow: hidden;
    position: relative;
}

.player .lyricView ul{
    position: absolute;
    width: 100%;
    top: 20px;
    left: 0px;
    transition: all 0.3s linear;
}

.player .lyricView ul li{
    line-height: 25px;
}

.lyricView ul li.con{
    font-weight: bold;
    font-size: 16px;
}

@keyframes rotate{
    0%{
        transform: rotate(0);
    }
    100%{
        transform: rotate(360deg);
    }
}
</style>