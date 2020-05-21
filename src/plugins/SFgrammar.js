import err from '@/plugins/SFerror'

function name(node) {
    return node.text;
}

function func_return(root) {
    if (root.froms.length != 1) err(3);
    if (root.froms[0].category != "vartype") err(4);// TODO: 结构体
    return root.froms[0].SFclass;
}

function func_define(code, root) { 
    //function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]

    let funcname;
    let inter_tags = ''; //{internal|external}
    let vis_tags = ''//[pure|constant|view|payable];
    let contract_tag = 0;
    let return_tag = '';
    for (let node of root.froms) {
        let nclass = node.SFclass;
        if (nclass == 'contract')
            contract_tag += 1;
        else if (nclass == 'name')
            funcname = name(node);
        else if (nclass == 'vis') 
            vis_tags = node.text;
        else if (nclass == 'inter')
            inter_tags = node.text;
        else if (nclass == 'return')
            return_tag = func_return(node);
        else if (nclass == '');
    }
    if (contract_tag != 1) err(5);
    if (return_tag == '') err(6); // ?
    let line = 'function ' + funcname + '() ' +
        tags['internal'] + ' ' + tags['pure'] +
        ' returns (' + return_tag + ')';
    code.push(line);
}

function func_flow(code, root) {
    
}

function ffunction(code, root) {
    func_define(code, root);
    code.push('{');
    if (root.tos.length != 1) err(9);
    if (root.tos[0].SFclass != 'begin') err(10);
    func_flow(code, root.tos[0]);
    code.push('}');
}

function contract(code, root) {
    if (root.froms.length != 1) err(1);
    if (root.froms[0].SFclass != "name") err(2);

    let namestr = name(root.froms[0]);
    code.push("contract " + namestr + "{");

    for (let node of root.tos)
        if (node.SFclass == 'function')
            ffunction(code, node);
    // TODO: struct class

    code.push("}");
}

function smartflow(map) {
    let code = [];
    let node;
    code.push("pragma solidity ^0.4;");

    for (node of map)
        if (node.SFclass == 'contract')
            contract(code, node);

    return code;
}



export default function grammar(map) {
    let SFcode = smartflow(map);
    return SFcode;
}
