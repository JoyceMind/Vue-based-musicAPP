<template>
  <div>
    <!-- 头部导航组件 -->
    <header-nav></header-nav>
    <div class="searchBox">
      <div class="box">
        <span class="iconfont icon-search"></span>
        <input type="text" @input="inputFun" :value="value" placeholder="搜索歌手，歌曲，专辑">
        <div class="iconfont icon-close" @click="closeFun"></div>
      </div>
    </div>
    <!-- 第一个界面 -->
    <div class="hotSearch" v-show="hotSearch">
      <div class="title">
        热门搜索
      </div>
      <ul>
        <li v-for="(item, index) in hotSearchList" :key="index" @click="getThereView(item.first)">{{ item.first }}</li>
      </ul>
    </div>
    <!-- 第二界面 -->
    <div class="searchList" v-show="searchList">
      <div class="title">
        搜索"薛之谦"
      </div>
      <ul>
        <li v-for="(item, index) in searchSuggestList" :key="index" @click="getThereView(item.keyword)">
          <span class="iconfont icon-search"></span>
          <p>{{ item.keyword }}</p>
        </li>
      </ul>
    </div>
    <!-- 第三个界面 -->
    <div class="topContent"  v-show="topContent">
      <h6>最佳匹配</h6>
      <div class="content" v-for="item in multimatchArtist" :key="item.id">
        <div class="img">
          <img :src="item.picUrl+'?param=100y100'" alt="">
        </div>
        <div class="name">歌手:<i>{{item.name}}</i>{{item.alias[0]}}</div>
        <span class="iconfont icon-arrow-right-bold "></span>
      </div>
    </div>

    <div class="search" v-show="search">

      <ul>

        <li v-for="item in cloudsearchList" :key="item.id">
          <router-link tag="div" :to="'/player?id='+item.id" class="info">
              <h3 class="row_text">{{item.name}}<span>{{item.alia[0]}}</span></h3>
              <p  class="row_text"><i></i>{{item.ar[0].name}} - {{item.name}}</p>
          </router-link>
          <div class="icon"></div>
        </li>

      </ul>
    </div>



  </div>
</template>

<script>
import HeaderNav from "../components/HeaderNav.vue"
import Request from "../api/http"
export default {
  data: function () {
    return {
      hotSearch: true,
      searchList: false,
      topContent: false,
      search: false,
      hotSearchList: null,
      clearSetData: null,
      searchSuggestList: null,
      value: "",
      cloudsearchList:null,
      multimatchArtist:null,
    }
  },
  methods: {
    searchHotFun() {
      Request({
        url: "/search/hot",
        method: "get"
      }).then(data => {
        console.log(data);
        this.hotSearchList = data.result.hots;
      })
    },
    inputFun(event) {
      clearTimeout(this.clearSetData);
      this.clearSetData = setTimeout(() => {
        if (event.target.value) {

          console.log(event.target.value);
          this.value = event.target.value;
          this.searchSuggest(event.target.value);
        } else {
          this.hotSearch = true;
          this.searchList = false;
          this.topContent = false;
          this.search = false;
        }
      }, 500)
    },
    // 请求提示数据
    // /search/suggest?keywords=海阔天空
    searchSuggest(value) {
      Request({
        url: "/search/suggest",
        method: "get",
        params: {
          keywords: value,
          type: "mobile"
        }
      }).then(data => {
        console.log(data);
        this.searchSuggestList = data.result.allMatch;
        this.hotSearch = false;
        this.searchList = true;
      })
    },
    // 删除
    closeFun() {
      this.hotSearch = true;
      this.searchList = false;
      this.topContent = false;
      this.search = false;
      this.value = "";
    },
    // 跳转第三个界面
    getThereView(keyword){
      console.log(keyword);
      this.value = keyword;

      Request({
        url: "/cloudsearch",
        method: "get",
        params: {
          keywords:keyword
        }
      }).then(data => {
        console.log("搜索内容",data);
        this.cloudsearchList = data.result.songs;
      })

      // /search/multimatch?keywords=刘德华
      Request({
        url: "/search/multimatch",
        method: "get",
        params: {
          keywords:keyword
        }
      }).then(data => {
        console.log("搜索内容匹配",data);
        this.multimatchArtist = data.result.artist
      })
      this.hotSearch = false;
      this.searchList = false;
      this.topContent = true;
      this.search = true;
    }
  },
  created() {
    this.searchHotFun();
  },
  components: {
    HeaderNav
  }
}
</script>

<style>
.search ul li {
  display: flex;
  justify-content: space-between;
  margin-left: 10px;
  border-top: 1px solid #F2F2F3;
  height: 55px;
}

.search ul li .info {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.search ul li .info h3 {
  font-size: 17px;
  color: #333;
  width: 300px;
}

.search ul li .info h3 span {
  color: #888;
}

.search ul li .info p {
  color: #888;
  font-size: 12px;
  width: 300px;
}

.search ul li .info p i {
  display: inline-block;
  width: 12px;
  height: 8px;
  background: url('../assets/index_icon_2x.png') no-repeat 0px 0px;
  background-size: 166px 97px;
  margin-right: 2px;
}

.search ul li .icon {
  width: 22px;
  height: 22px;
  background: url('../assets/index_icon_2x.png') no-repeat -24px 0px;
  background-size: 166px 97px;
  margin-right: 10px;
  margin-top: 16px;
}

.topContent h6 {
  height: 20px;
  line-height: 24px;
  font-size: 12px;
  color: #666666;
  text-indent: 8px;
}

.topContent .content {
  padding: 8px;
  display: flex;
  justify-content: space-between;
}

.topContent .content .img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
}

.topContent .content .img img {
  width: 100%;
}

.topContent .content .name {
  height: 40px;
  line-height: 40px;
  color: #333333;
  flex: 1;
}

.topContent .content .name i {
  color: #507daf;
  font-style: normal;
}

.topContent .content .iconfont {
  height: 40px;
  line-height: 40px;
  margin-right: 10px;
}

.searchList .title {
  height: 40px;
  line-height: 40px;
  font-size: 12px;
  color: #507daf;
  text-indent: 10px;
  border-bottom: 1px solid #ebecec;
}

.searchList ul {}

.searchList ul li {
  display: flex;
  height: 35px;
  line-height: 35px;
  font-size: 12px;
}

.searchList ul li span {
  width: 27px;
  text-align: center;
  line-height: 35px;
}

.searchList ul li p {
  color: #333;
  flex: 1;
  border-bottom: 1px solid #ebecec;
}

.searchBox {
  padding: 15px 10px;
  border-bottom: 1px solid #f1f2f3;
}

.searchBox .box {
  height: 30px;
  line-height: 30px;
  background-color: #ebecec;
  border-radius: 15px;
  display: flex;
}

.searchBox .box .iconfont {
  margin: 0px 8px;
}

.searchBox .box .icon-close {
  background-color: #c0c1c1;
  height: 14px;
  width: 14px;
  border-radius: 50%;
  font-size: 10px;
  line-height: 14px;
  text-align: center;
  margin-top: 7px;
  color: #fff;
}

.searchBox .box input {
  border: 0px;
  background-color: transparent;
  outline: none;
  font-size: 12px;
  color: #c9c9c9;
  flex: 1;
}

.hotSearch .title {
  height: 34px;
  line-height: 34px;
  padding-top: 4px;
  font-size: 14px;
  text-indent: 10px;
  color: #666666;
}

.hotSearch ul {
  display: flex;
  flex-wrap: wrap;
}

.hotSearch li {
  font-size: 14px;
  border: 1px solid #e5e6ea;
  border-radius: 15px;
  height: 30px;
  line-height: 30px;
  padding: 0px 8px;
  margin-left: 10px;
  color: #333333;
  margin-bottom: 8px;
}</style>

