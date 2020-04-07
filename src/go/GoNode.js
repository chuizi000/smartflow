import go from "gojs"

var $ = go.GraphObject.make;

var DiagramNodeTemplate = $(
    go.Node, "Auto",
    $(
        go.Shape,
        new go.Binding("figure", "fig"),
        new go.Binding("fill", "color")
    ),
    $(
        go.TextBlock,
        { margin: 5 },
        new go.Binding("text", "key")
    )
);

var PaletteNodeTemplate = $(
    go.Node, "Vertical",
    { locationObjectName: "TB", locationSpot: go.Spot.Center },
    $(
        go.Shape,
        new go.Binding("figure", "fig"),
        new go.Binding("fill", "color")
    ),
    $(
        go.TextBlock,
        {name:'TB'},
        new go.Binding("text", "key")
    )
);


export {DiagramNodeTemplate as DNT,PaletteNodeTemplate as PNT};
export default "GoNode";