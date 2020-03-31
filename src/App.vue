<template>
<div id='app'>
  <el-container>

    <el-header>
      <AppHeader/>
    </el-header>

    <el-container>

        <el-aside width="200px">
          <ShapePanel/>
        </el-aside>

        <el-main>
          <CanvasPanel/>
        </el-main>

        <el-aside width="200px">
          <CodeViewPanel/>
        </el-aside>

    </el-container>

    <el-footer>
      <AppFooter/>
    </el-footer>

  </el-container>

</div>


</template>


<script>
import AppFooter from './components/AppFooter'
import AppHeader from './components/AppHeader'
import CodeViewPanel from './components/CodeViewPanel'
import CanvasPanel from './components/CanvasPanel'
import ShapePanel from './components/ShapePanel'


export default {
  name: 'app',
  components:{
    AppFooter,
    AppHeader,
    CodeViewPanel,
    CanvasPanel,
    ShapePanel
  }
}
</script>

<style>
.el-aside{
  text-align: center;
}

.el-main{
  text-align: center;
}

.el-container{
  height: 100%;
}

#app{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
