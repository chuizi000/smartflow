import err from '@/plugins/SFerror'

function name(node){
    return node.text;
}


function ffunction(code,root){
    let funcname;
    let 
    for (let node of root){
        let nclass = node.SFclass;
        if (nclass == 'name')
            funcname = name(node);
        else if (nclass == 'pure' || nclass == 'internal' ) //TODO:

    }
}

function contract(code,root) {
    if (root.froms.length != 1) err(1);
    if (root.froms[0].SFclass != "name") err(2);

    let namestr = name(root.froms[0]);
    code.push("contract "+namestr+"{");

    for (let node of root.tos)
        if (node.SFclass == 'function')
            ffunction(code,node);
        // TODO: struct class
    
    code.push("}");
}

function smartflow(map) {
    let code = [];
    let node;
    code.push("pragma solidity ^0.4;");

    for (node of map) 
        if (node.SFclass == 'contract')
            contract(code,node);

    return code;
}



export default function grammar(map) {
    let SFcode = smartflow(map);
    return SFcode;
}
