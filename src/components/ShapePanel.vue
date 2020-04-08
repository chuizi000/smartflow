<template>
  <div class="ShapePanel">
    <el-card class="ShapeCard" shadow="hover">

      <el-collapse v-model="activeName" @change="collapseChange">
        <el-collapse-item title="title1" name="namea">
          <div class="fulldiv"><go-palette :modelData="modelData"/></div>
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


export default {
  name: "ShapePanel",
  data(){
    return {
      activeName:['namea'],
      modelData:[
        { text: "Step" }
      ]
    };
  },
  components:{
    GoPalette
  },
  methods: {
    collapseChange(val) {
        console.log(val);
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