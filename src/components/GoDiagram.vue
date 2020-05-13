<template>
  <div id="Diagram" />
</template>

<script>
import go from "gojs";
import { GetNTM, GetLT } from "../plugins/GoNode";

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

    // when the document is modified, add a "*" to the title and enable the "Save" button
    // this.myDiagram.addDiagramListener("Modified", function() {
    //   var button = document.getElementById("SaveButton");
    //   if (button) button.disabled = !this.myDiagram.isModified;
    //   var idx = document.title.indexOf("*");
    //   if (this.myDiagram.isModified) {
    //     if (idx < 0) document.title += "*";
    //   } else {
    //     if (idx >= 0) document.title = document.title.substr(0, idx);
    //   }
    // });
    // helper definitions for node templates

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
    loadJson(json){
      this.myDiagram.model = go.Model.fromJson(json);
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