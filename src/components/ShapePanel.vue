<template>
  <div class="ShapePanel">
    <el-card class="ShapeCard" shadow="hover">
      <!-- <div slot="header" class="clearfix">
        <span>卡片名称</span>
      </div>-->

      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>导航一</span>
          </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-submenu>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">导航二</span>
        </el-menu-item>
      </el-menu>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "ShapePanel"
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
</style>