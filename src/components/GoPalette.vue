<template>
  <div class="GoPalette" />
</template>

<script>
import go from "gojs";

var $ = go.GraphObject.make;

export default {
  name: "GoPalette",
  props: ["modelData"],
  mounted: function() {
    var myPalette = $(go.Palette, this.$el);
    myPalette.model = this.modelData;
    myPalette.nodeTemplate = $(
      go.Node,
      "Vertical",
      { locationObjectName: "TB", locationSpot: go.Spot.Center },
      $(
        go.Shape,
        { width: 20, height: 20, fill: "white" },
        new go.Binding("figure", "fig"),
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, { name: "TB" }, new go.Binding("text", "key"))
    );
  }
};
</script>

<style>
div.GoPalette {
  width: 100%;
  height: 100%;
  background-color: #12cf4bc7;
}
</style>