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
          <CanvasPanel />
        </el-main>

        <el-aside id="right" width="30%">
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

export default {
  name: "app",
  components: {
    AppFooter,
    AppHeader,
    CodeViewPanel,
    CanvasPanel,
    ShapePanel
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
