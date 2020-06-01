<template>
  <div id="app">
    <el-container>
      <el-header height="80px">
        <AppHeader />
      </el-header>

      <el-container>
        <el-aside id="left" width="15%">
          <ShapePanel />
        </el-aside>

        <el-main>
          <CanvasPanel ref="smartflow"/>
        </el-main>

        <el-aside id="right" width="30%">
          <el-button type="primary" @click="compileSF" :loading="compileing">编译</el-button>
          <el-button type="primary" @click="load1">示例1</el-button>
          <el-button type="primary" @click="load2">示例2</el-button>
          <CodeViewPanel :solcode="code"/>
        </el-aside>
      </el-container>

      <el-footer>
        <AppFooter />
      </el-footer>
    </el-container>
  </div>
</template>


<script>
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import CodeViewPanel from "./components/CodeViewPanel";
import CanvasPanel from "./components/CanvasPanel";
import ShapePanel from "./components/ShapePanel";
import SFcompile from '@/plugins/SFcompiler';

export default {
  name: "app",
  components: {
    AppFooter,
    AppHeader,
    CodeViewPanel,
    CanvasPanel,
    ShapePanel
  },
  data:function() {
  return {
      compileing:false,
      code:"",
    };
  },
  methods:{
    compileSF(){
      console.log("xxx");
      this.compileing = true;
      let SFJson = this.$refs.smartflow.getJson(); 
      console.log(SFJson);
      // print(SFJson)
      this.code=SFcompile(SFJson);
      this.compileing = false;
    },
    load1(){
      this.code = '';
      this.$refs.smartflow.loadJson(1);
    },
    load2(){
      this.code = '';
      this.$refs.smartflow.loadJson(2);
    }
  }
};
</script>

<style>
.el-aside {
  text-align: center;
  height: 100%;
}

.el-header {
  align-items: center;
}

.el-main {
  height: 100%;
}

.el-container {
  height: 100%;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
