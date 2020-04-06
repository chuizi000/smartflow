<template>
  <div id="Canvas" />
</template>

<script>
import go from "gojs/release/go-debug";
var $ = go.GraphObject.make;

export default {
  name: "GoDiagram",
  props: ["modelData"],
  mounted: function() {
    var myDiagram = $(go.Diagram, this.$el, {
      initialContentAlignment: go.Spot.Center, // 居中显示Diagram内容
      "undoManager.isEnabled": true // 打开Ctrl-Z撤销和Ctrl-Y重做功能
    });
    myDiagram.model = this.modelData;
  }
};
</script>

<style>
div#Canvas {
  width: 100%;
  height: 100%;
  background-color: #dae4e4;
}
</style>