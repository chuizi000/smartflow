<template>
  <div class="CanvasPanel">
    <go-diagram :modelData="modelData"/>
  </div>
</template>

<script>
import GoDiagram from '@/components/GoDiagram'

export default {
  name: "CanvasPanel",
  data() {
    return {
      modelData:[{ text: "Step" }]
    };
  },
  methods: {

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