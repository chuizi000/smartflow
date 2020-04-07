<template>
  <div class="CanvasPanel">
    <go-diagram :modelData="myModel()"/>
  </div>
</template>

<script>
import GoDiagram from '@/components/GoDiagram'
import go from "gojs";
var $ = go.GraphObject.make;

export default {
  name: "CanvasPanel",
  data() {
    return {};
  },
  methods: {
    myModel() {
      let retModel = $(go.Model);
      // 在model的数据中, 每个节点数据的值都是由一个JS对象来表示:
      retModel.nodeDataArray = [];
      return retModel;
    }
  },
  components: {
    GoDiagram
  }
};
</script>

<style>
div.CanvasPanel {
  height: 100%;
}
</style>