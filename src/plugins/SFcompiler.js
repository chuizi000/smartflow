class Node{
    constructor(node){
        this.category = node.category;
        this.text = node.text;
        this.SFclass = node.SFclass;
        this.key = node.key;
        this.loc = node.loc.split(' ').map((x)=>(parseFloat(x)));
        this.tos = [];
        this.froms = [];
    }

    link(to_node){
        to_node.froms.push(this);
        this.tos.push(to_node);
    }
}


function SFload(JsonString){
    let JsonObject = JSON.parse(JsonString);

    let nodemap = {}
    for (let node of JsonObject.nodeDataArray)
        nodemap[node.key] = new Node(node);

    for (let edge of JsonObject.linkDataArray)
        nodemap[edge.from].link(nodemap[edge.to]);
    let SFmap = []
    for (let node_key in nodemap)
        SFmap.push(nodemap[node_key])

    return SFmap;
}


// function generation(){

// }

import SFgrammar from '@/plugins/SFgrammar'

export default function SFcompile(JsonString){
    let SFmap = SFload(JsonString);
    let SFcode = SFgrammar(SFmap);
    // return SFcode; 
    return SFcode;
}
