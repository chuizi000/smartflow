<template>
  <div id="Diagram" />
</template>

<script>
import go from "gojs";
// import DNT from "../go/GoNode"

var $ = go.GraphObject.make;

export default {
  name: "GoDiagram",
  props: ["modelData"],
  mounted: function() {
    let showLinkLabel = function(e) {
      var label = e.subject.findObject("LABEL");
      if (label !== null)
        label.visible = e.subject.fromNode.data.category === "Conditional";
    };

    var myDiagram = $(go.Diagram, this.$el, {
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
    myDiagram.addDiagramListener("Modified", function() {
      var button = document.getElementById("SaveButton");
      if (button) button.disabled = !myDiagram.isModified;
      var idx = document.title.indexOf("*");
      if (myDiagram.isModified) {
        if (idx < 0) document.title += "*";
      } else {
        if (idx >= 0) document.title = document.title.substr(0, idx);
      }
    });
    // helper definitions for node templates

    myDiagram.model = this.modelData;
    myDiagram.nodeTemplate = $(
      go.Node,
      "Auto",
      $(
        go.Shape,
        new go.Binding("figure", "fig"),
        new go.Binding("fill", "color")
      ),
      $(go.TextBlock, { margin: 5 }, new go.Binding("text", "name"))
    );
    // myDiagram.undoManager.isEnabled = true;
  },
  methods: {
    makePort(name, align, spot, output, input) {
      var horizontal =
        align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
      // the port is basically just a transparent rectangle that stretches along the side of the node,
      // and becomes colored when the mouse passes over it
      return $(go.Shape, {
        fill: "transparent", // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: horizontal
          ? go.GraphObject.Horizontal
          : go.GraphObject.Vertical,
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: "pointer", // show a different cursor to indicate potential link point
        mouseEnter: function(e, port) {
          // the PORT argument will be this Shape
          if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
        },
        mouseLeave: function(e, port) {
          port.fill = "transparent";
        }
      });
    },
    nodeStyle() {
      return [
        // The Node.location comes from the "loc" property of the node data,
        // converted by the Point.parse static method.
        // If the Node.location is changed, it updates the "loc" property of the node data,
        // converting back using the Point.stringify static method.
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(
          go.Point.stringify
        ),
        {
          // the Node.location is at the center of each node
          locationSpot: go.Spot.Center
        }
      ];
    },
    textStyle() {
      return {
        font: "bold 11pt Lato, Helvetica, Arial, sans-serif",
        stroke: "#F8F8F8"
      };
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