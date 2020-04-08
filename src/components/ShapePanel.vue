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
        { text: "default name" },
        { text: 'default string' ,figure:"PaperTape"},
      ],
      modelData_vartype:[
        { category:"vartype",text: "string" },
        { category:"vartype",text: "struct" },
        { category:"vartype",text: "bool" },
        { category:"vartype",text: "int" },
        { category:"vartype",text: "uint" },
        { category:"vartype",text: "address" },

      ],
      modelData_define:[
        { category:"define",text: "contract",figure:"DataStorage"},
        { category:"define",text: "function",figure:"Cloud" },
        { category:"define",text: "returns",figure:"Cloud" },
        { category:"define",text: "parameters",figure:"Cloud" },
        { category:"define",text: "internal",figure:"PrimitiveToCall" },
        { category:"define",text: "pure",figure:"PrimitiveToCall" },
      ],
      modelData_calc:[
        { category:"calc",text: "return"},
        { category:"calc",text: "begin",figure:"Circle"},
        { category:"calc",text: "end",figure:"Circle"}
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