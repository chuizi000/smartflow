<template>
  <div class="ShapePanel">
    <el-card class="ShapeCard" shadow="hover">

      <el-collapse v-model="activeName" @change="collapseChange">
        <el-collapse-item title="title1" name="namea">
          <div class="fulldiv"><go-palette :modelData="Model_1()"/></div>
        </el-collapse-item>
        <el-collapse-item title="title2" name="nameb">
          <div>2</div>
        </el-collapse-item>
        <el-collapse-item title="title3" name="namec">
          <div>3</div>
        </el-collapse-item>
      </el-collapse>

          


      

    </el-card>
  </div>
</template>

<script>
import GoPalette from '@/components/GoPalette'
import go from "gojs";
var $ = go.GraphObject.make;


export default {
  name: "ShapePanel",
  data(){
    return {
      activeName:['namea']
    };
  },
  components:{
    GoPalette
  },
  methods: {
    collapseChange(val) {
        console.log(val);
    },
    Model_1() {
      let retModel = $(go.Model);
      // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
      retModel.nodeDataArray = [
    {key:'1', name: "Alpha", color: "lightblue", fig: "RoundedRectangle" },
    {key:'2', name: "Beta", color: "lightblue", fig: "Ellipse" },
    {key:'3', name: "Gamma", color: "lightblue", fig: "Rectangle" },
    {key:'4', name: "Delta", color: "lightblue", fig: "Diamond" },
    {key:'5', name: "Epsilon", color: "lightblue", fig: "TriangleRight" },
    {key:'6', name: "Zeta", color: "lightblue", fig: "TriangleDown" }
  ];
      return retModel;
    }
  },
};
</script>

<style>
div.ShapePanel {
  padding-left: 10%;
  padding-right: 10%;
  /* padding-top: 20px; */
  margin-top: 20px;
  height: 95%;
}
.ShapeCard {
  height: 100%;
}
.el-menu {
  border-right: 0px !important;
  height: 100%;
}
div.fulldiv{
  height: 100px;
  width: 100%;
}
</style>