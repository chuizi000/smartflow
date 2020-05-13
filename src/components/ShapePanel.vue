<template>
  <div class="ShapePanel">
    <el-card class="ShapeCard" shadow="hover">

      <el-collapse v-model="activeName" @change="collapseChange">
        <el-collapse-item title="基本定义和声明" name="define">
          <div class="fulldiv"><go-palette :modelData="modelData_define"/></div>
        </el-collapse-item>
        <el-collapse-item title="变量类型" name="vartype">
          <div class="fulldiv"><go-palette :modelData="modelData_vartype"/></div>
        </el-collapse-item>
        
        <el-collapse-item title="基本运算" name="calc">
          <div class="fulldiv"><go-palette :modelData="modelData_calc"/></div>
        </el-collapse-item>
        <el-collapse-item title="基本节点" name="var">
          <div class="fulldiv"><go-palette :modelData="modelData_var"/></div>
        </el-collapse-item>
      </el-collapse>

          


      

    </el-card>
  </div>
</template>

<script>
import GoPalette from '@/components/GoPalette'
import "gojs/extensions/Figures"

export default {
  name: "ShapePanel",
  data(){
    return {
      activeName:['define','calc','var','vartype'],
      modelData_var:[
        { category:"var",SFclass:"name",text: "name" ,figure:"Card"},
        { category:"var",SFclass:"CONST",text: "CONST" ,figure:"Hexagon"},
      ],
      modelData_vartype:[
        { category:"vartype",SFclass:"string",text: "string" },
        { category:"vartype",SFclass:"struct",text: "struct" },
        { category:"vartype",SFclass:"bool",text: "bool" },
        { category:"vartype",SFclass:"int",text: "int" },
        { category:"vartype",SFclass:"uint",text: "uint" },
        { category:"vartype",SFclass:"address",text: "address" },

      ],
      modelData_define:[
        { category:"define",SFclass:"contract",text: "contract",figure:"DataStorage"},
        { category:"define",SFclass:"function",text: "function",figure:"Cloud" },
        { category:"define",SFclass:"returns",text: "returns",figure:"Cloud" },
        { category:"define",SFclass:"parameters",text: "parameters",figure:"Cloud" },
        { category:"define",SFclass:"internal",text: "internal",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"pure",text: "pure",figure:"PrimitiveToCall" },
      ],
      modelData_calc:[
        { category:"calc",SFclass: "return",text: "return"},
        { category:"calc",SFclass: "begin",text: "begin",figure:"Circle"},
        { category:"calc",SFclass: "end",text: "end",figure:"Circle"}
      ],
      
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
  height: 750px;
  overflow:auto !important;
}
div.fulldiv{
  height: 300px;
  width: 100%;
}
</style>