<template>
  <div class="GoPalette" />
</template>

<script>
import go from "gojs";
import {GetNTM} from "../go/GoNode"
var $ = go.GraphObject.make;

export default {
  name: "GoPalette",
  props: ["modelData"],
  mounted: function() {
    let animateFadeDown = function(e) {
        var diagram = e.diagram;
        var animation = new go.Animation();
        animation.isViewportUnconstrained = true; // So Diagram positioning rules let the animation start off-screen
        animation.easing = go.Animation.EaseOutExpo;
        animation.duration = 900;
        // Fade "down", in other words, fade in from above
        animation.add(diagram, 'position', diagram.position.copy().offset(0, 200), diagram.position);
        animation.add(diagram, 'opacity', 0, 1);
        animation.start();
      }


    var myPalette = $(go.Palette, this.$el,
    {
      "animationManager.initialAnimationStyle": go.AnimationManager.None,
            "InitialAnimationStarting": animateFadeDown, // Instead, animate with this function

            nodeTemplateMap: GetNTM(),  // share the templates used by myDiagram
           
    }
    );
    myPalette.model = new go.GraphLinksModel(this.modelData);
    
  }
};
</script>

<style>
div.GoPalette {
  width: 186px;
  height: 300px;
  background-color: #ffffffc7;
}
</style>