<template>
  <div class="CanvasPanel">
    <go-diagram :modelData="modelData" ref='diagram'/>
  </div>
</template>

<script>
import GoDiagram from '@/components/GoDiagram'

export default {
  name: "CanvasPanel",
  data() {
    return {
      modelData:[]
    };
  },
  methods: {
    getJson(){
      return this.$refs.diagram.getJson()
    },
    loadJson(num){
      this.$refs.diagram.loadJson(num)
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