<template>
  <div class="canvasPanel">
    <GoDiagram :modelData="myModel()"/>
  </div>
</template>

<script>
import GoDiagram from "./GoDiagram";
import go from "gojs/release/go-debug";
var $ = go.GraphObject.make;

export default {
  name: "CanvasPanel",
  data() {
    return {

    };
  },
  methods:{
    myModel(){
      let retModel = $(go.Model);
      // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
      retModel.nodeDataArray = [
        { key: "Alpha" },
        { key: "Beta" },
        { key: "Gamma" }
      ];
      return retModel;
    }
  },
  components:{
    GoDiagram
  }
};
</script>

<style>

</style>