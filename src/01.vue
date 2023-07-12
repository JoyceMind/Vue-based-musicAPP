<template>
  <div>
    <h1>基于vue的音乐APP</h1>
    <div>数据计算：{{1+1}}</div>
    <div>数据计算:1>3</div>
    <div>数据计算</div>
    <div>js数据绑定：{{num>3 ? "yes":"no"}}</div>
    <h1>数组数据遍历{{lists}}</h1>
    <div v-for="(item,index) in lists" :key="index">
      值：{{item}}--------------下标：{{index}}
    </div>
    <h1>歌曲列表</h1>
    <div>{{objs}}</div>
    <div>{{musiclists}}</div>
    <h2>对象数据操作</h2>
    <div>姓名：{{objs.name}}</div>
    <div>年龄：{{objs.age}}</div>
    <div>地址：{{objs.address}}</div>
    <div>学校：{{objs.school}}</div>
    <div v-for="(item,index) in musiclists" :key="index">
      <h3>{{item.song_name}}</h3>
      <p>{{item.singer}}</p>
    </div>
    <h1>点击事件</h1>
    <h2>数值加1：{{count}}</h2>
    <button @click="count--">点击-1按钮</button> 
    <button @click="setData">点击+1按钮</button>
    <button @click="setData2('参数1','参数2')">点击+1--传参</button>
    <button @click="setEvent">点击+1--事件对象</button>
    <button @click="setDataEvent('参数1','参数2',$event)">点击+1--事件对象--传参</button>

  </div>
</template>

<script>
export default {
  data:function(){
    return{
    num:2,
    count:0,
    lists:["张撒不","小城市",44443],
    objs:{name:'秦挺',age:20,address:"成都",school:"西华大学"},
    musiclists:[{song_name:"夜曲",singer:"周杰伦"},
                {song_name:"知足",singer:"五月天"},
                {song_name:"美丽人生",singer:"梁静茹"},
                {song_name:"笼",singer:"张碧晨"},
                {song_name:"我记得",singer:"赵雷"},
                {song_name:"把回忆拼好给你",singer:"王贰浪"},
                {song_name:"达尔文",singer:"林俊杰"},
                {song_name:"唯一",singer:"告五人"},
                {song_name:"天外来物",singer:"薛之谦"}]
          }

},
  methods:{ //定义方法
    setData(){
      console.log(this.count);
      this.count=this.count+1
    },
    setData2(one,two){
      console.log("获取参数",one,two);
    },
    setEvent(event){
      console.log("触发事件对象",event);
    },
    setDataEvent(one,two,event){
      console.log("获取参数",one,two);
      console.log("触发事件对象",event);
    }
  }
}
</script>

<style>

</style>