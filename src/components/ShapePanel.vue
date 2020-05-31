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
        <el-collapse-item title="系统函数" name="sysfunc">
          <div class="fulldiv"><go-palette :modelData="modelData_sysfunc"/></div>
        </el-collapse-item>
        <el-collapse-item title="系统变量" name="sysvar">
          <div class="fulldiv"><go-palette :modelData="modelData_sysvar"/></div>
        </el-collapse-item>
        
      </el-collapse>

          


      

    </el-card>
  </div>
</template>

<script>
import GoPalette from '@/components/GoPalette'
import "gojs/extensions/Figures"

export default {  //TODO：取值 for struct . [] 删掉 加入函数调用
  name: "ShapePanel",
  data(){
    return {
      activeName: ['define','calc','var','vartype','sysfunc','sysvar'],
      modelData_define:[
        { category:"define",SFclass:"contract",text: "contract",figure:"DataStorage"},
        { category:"define",SFclass:"function",text: "function",figure:"Cloud" },
        { category:"define",SFclass:"event",text: "event",figure:"StopSign" },

        { category:"define",SFclass:"returns",text: "returns",figure:"HalfEllipse" },
        { category:"define",SFclass:"parameters",text: "parameters",figure:"HalfEllipse" },
        
        { category:"define",SFclass:"vis_tag",text: "internal",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"vis_tag",text: "external",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"vis_tag",text: "private",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"vis_tag",text: "public",figure:"PrimitiveToCall" },
        
        { category:"define",SFclass:"func_tag",text: "pure",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"func_tag",text: "constant",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"func_tag",text: "view",figure:"PrimitiveToCall" },
        { category:"define",SFclass:"func_tag",text: "payable",figure:"PrimitiveToCall" },
      ],
      modelData_vartype:[
        { category:"vartype",SFclass:"vartype",text: "string" },
        { category:"vartype",SFclass:"vartype",text: "bool" },
        { category:"vartype",SFclass:"vartype",text: "int" },
        { category:"vartype",SFclass:"vartype",text: "address" },
        { category:"vartype",SFclass:"vartype",text: "byte32" },
        { category:"vartype",SFclass:"vartype",text: "mapping",figure:"DoubleEndArrow2"},
        { category:"vartype",SFclass:"vartype",text: "array",figure:"MultiProcess" },
      ],
      modelData_var:[
        { category:"var",SFclass:"name",text: "name" ,figure:"Card"},
        { category:"var",SFclass:"var",text: "var" ,figure:"Terminator"},
        { category:"var",SFclass:"const",text: "CONST" ,figure:"Hexagon"},
        { category:"var",SFclass: "func",text: "func",figure:"Parallelogram"},

      ],
    
      modelData_calc:[
        { category:"calc",SFclass: "2calc",text: "+",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "-",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "*",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "/",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "<",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "<=",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "==",figure:"Circle"},
        { category:"calc",SFclass: "2calc",text: "!=",figure:"Circle"},
        { category:"calc",SFclass: "1calc",text: ":=",figure:"Circle"},


      ],
      modelData_sysfunc:[
        { category:"sysfunc",SFclass: "emit",text: "emit",figure:"FireHazard"},
        { category:"sysfunc",SFclass: "if",text: "if",figure:"Decision"},
        { category:"sysfunc",SFclass: "begin",text: "begin",figure:"Border"},
        { category:"sysfunc",SFclass: "end",text: "end",figure:"Border"},
        { category:"sysfunc",SFclass: "return",text: "return",figure:"Procedure"},
        { category:"sysfunc",SFclass: "require",text: "require",figure:"Procedure"},
      ],
      modelData_sysvar:[
        { category:"sysvar",SFclass: "msg",text: "msg",figure:"File"},
        { category:"sysvar",SFclass: "now",text: "now",figure:"BpmnEventTimer"},
        { category:"sysvar",SFclass: "nop",text: "NOP",figure:"Circle"},
        
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
  height: 750px;
  overflow:auto !important;
}
div.fulldiv{
  height: 300px;
  width: 100%;
}
</style>