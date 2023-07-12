<template>
  <div>
      <h1>添加删除歌曲案例</h1>
      <div>
          id:<input type="text" v-model="id"><br>
          歌手名称：<input type="text" v-model="name"><br>
          <button @click="addData">点击添加数歌曲信息</button>
      </div>
      <h2>歌曲列表</h2>
      <ul>
          <li v-for="(item,index) in lists" :key="item.id">
            {{item.id}}.{{item.name}}  --- {{index}}
            <button @click="del(item.id)">删除</button>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            lists:[{id:1,name:'周杰伦'},{id:2,name:'林俊杰'}],
            id:"",
            name:""
        }
    },
    methods:{
        addData(){
            console.log(this.id,this.name);
            this.lists.push({
                id:this.id,
                name:this.name
            })
        },
        del(id){
            let index=this.lists.findIndex(function(item){
                return item.id==id;
            })
            console.log(index);
            this.lists.splice(index,1);
        }
    }

}
</script>

<style>

</style>