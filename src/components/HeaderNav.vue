<template>
    <div>
        <div class="header_logo">
            <div class="logo">
                <img src="../assets/wangyiyunapp_logo.png" alt="">
                <span>网易云音乐</span>
            </div>
            <div class="btn">下载APP</div>
        </div>
        <div class="navlists">
            <router-link tag="div" to="/home" class="item">
                <span>推荐音乐</span>
            </router-link>
            <router-link tag="div" to="/hotsong" class="item">
                <span>热歌榜</span>
            </router-link>
            <router-link tag="div" to="/search" class="item">
                <span>搜索</span>
            </router-link>
        </div>
    </div>
</template>

<script >
export default{

}
</script>

<style>

.navlists{
    height: 39px;
    line-height: 39px;
    display: flex;
    background: #fff;
    border-bottom: 1px solid #ebebeb;
    text-align: center;
    font-size: 15px;
    color: #333333;
}
.navlists .item{
    flex: 1;

}
.navlists .item.router-link-active{
    color: #dd001b;
}
.navlists .item span{
    display: inline-block;
    padding: 0px 5px;
    position:relative;
}
.navlists .item.router-link-active span::after{
    content: "";
    display: block;
    width:100%;
    height: 2px;
    background: #dd001b;
    position:absolute;
    left:0px;
    bottom:0px;
}



.header_logo{
    height: 84px;
    background:#d43c33;
    display: flex;
    justify-content: space-between;
}
.header_logo .logo{
    padding-top: 30px;
    margin-left: 10px;
}
.header_logo .logo span{
    height: 25px;
    line-height: 25px;
    font-size: 19px;
    color: #fff;
}
.header_logo .logo img{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    display: inline-block;
    vertical-align: middle;
    margin-right: 5px;
}
.header_logo .btn{
    width: 100px;
    height: 36px;
    color: #d43c33;
    text-align: center;
    background: #fff;
    line-height: 36px;     
    border-radius: 36px;
    margin-top: 24px;
    margin-right: 9px;
}
</style>