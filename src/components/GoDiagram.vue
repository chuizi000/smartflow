<template>
  <div id="Diagram" />
</template>

<script>
import go from "gojs";
import { GetNTM, GetLT } from "../plugins/GoNode";
import model1 from '@/assets/model1';
import model2 from '@/assets/model2';

var $ = go.GraphObject.make;

export default {
  name: "GoDiagram",
  props: ["modelData"],
  mounted() {
    let showLinkLabel = function(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null)
        label.visible = e.subject.fromNode.data.category === "Conditional";
    };

    this.myDiagram = $(go.Diagram, this.$el, {
      grid: $(
        go.Panel,
        "Grid",
        $(go.Shape, "LineH", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineH", {
          stroke: "gray",
          strokeWidth: 0.5,
          interval: 10
        }),
        $(go.Shape, "LineV", { stroke: "lightgray", strokeWidth: 0.5 }),
        $(go.Shape, "LineV", { stroke: "gray", strokeWidth: 0.5, interval: 10 })
      ),
      LinkDrawn: showLinkLabel, // this DiagramEvent listener is defined below
      LinkRelinked: showLinkLabel,
      "undoManager.isEnabled": true
    });

    this.myDiagram.model = new go.GraphLinksModel(this.modelData);
    this.myDiagram.nodeTemplateMap = GetNTM();
    this.myDiagram.linkTemplate = GetLT();
    this.myDiagram.toolManager.linkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
    this.myDiagram.toolManager.relinkingTool.temporaryLink.routing =
      go.Link.Orthogonal;
  },
  methods: {
    getJson(){
      return this.myDiagram.model.toJson();
    },
    loadJson(num){
      if (num == 1)
        this.myDiagram.model = go.Model.fromJson(model1);
      else if (num==2)
        this.myDiagram.model = go.Model.fromJson(model2);

    }
  }
};
</script>

<style>
div#Diagram {
  width: 100%;
  height: 100%;
  background-color: #dae4e4;
}
</style>