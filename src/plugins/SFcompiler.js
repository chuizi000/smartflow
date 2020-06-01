function get_type(node) {
    let node_type = {
        "end": ["emit", "return", "require", "1calc", "nop","if"],
        "mid": ["2calc", "func"],
        "value": ["msg", "now", "var", "const"]
    };
    for (let type in node_type)
        for (let sfc of node_type[type])
            if (node.SFclass == sfc) return type;
    return "null";
}

class Node {
    constructor(node) {
        this.category = node.category;
        this.text = node.text;
        this.SFclass = node.SFclass;
        this.key = node.key;
        this.loc = node.loc.split(' ').map((x) => (parseFloat(x)));
        this.tos = [];
        this.froms = [];
        this.type = get_type(node);
        this.indegree = -1;
        this.output = "";
    }

    link(to_node) {
        to_node.froms.push(this);
        this.tos.push(to_node);
    }
}


function SFload(JsonString) {
    let JsonObject = JSON.parse(JsonString);

    let nodemap = {}
    for (let node of JsonObject.nodeDataArray)
        nodemap[node.key] = new Node(node);

    for (let edge of JsonObject.linkDataArray)
        nodemap[edge.from].link(nodemap[edge.to]);
    let SFmap = []
    for (let node_key in nodemap)
        SFmap.push(nodemap[node_key]);

    return SFmap;
}



import SFgrammar from '@/plugins/SFgrammar'
import SFlint from '@/plugins/SFlint'

export default function SFcompile(JsonString) {
    let SFmap = SFload(JsonString);
    let SFcode = SFgrammar(SFmap);
    let SFcodeStr = SFlint(SFcode);
    return SFcodeStr; 
    // return SFmap;
}
