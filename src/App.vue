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
          <el-row>
            <el-input type="textarea" v-model="json" placeholder="" autosize></el-input>
          </el-row>
          <el-button type="primary" @click="compileSF" :loading="compileing">编译</el-button>
          <el-button type="primary" @click="loadSF">Load</el-button>
          <CodeViewPanel />
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
      json:"",
    };
  },
  methods:{
    compileSF(){
      console.log("xxx");
      this.compileing = true;
      let SFJson = this.$refs.smartflow.getJson(); 
      console.log(SFJson);
      // print(SFJson)
      console.log(SFcompile(SFJson));

      setTimeout(()=>{this.compileing = false},1000);
    },
    loadSF(){
      this.$refs.smartflow.loadJson(this.json);
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
