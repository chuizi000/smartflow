import err from '@/plugins/SFerror'

var code = [];

class Queue {
    constructor() {
        this.arr = [];
    }

    push(tmp) {
        this.arr.push(tmp);
    }

    pop() {
        let ret = this.arr[0];
        this.arr = this.arr.slice(1);
        return ret;
    }
    isEmpty() {
        return this.arr.length == 0;
    }
}

function leafnode(root) {
    if (root.tos.length != 0) err(4);
    return root.text;
}

function compare_height(a, b) {
    return a.loc[1] - b.loc[1];
}

function name(root) {
    let namestr = '';
    let namecount = 0;
    for (let node of root.tos) {
        if (node.SFclass == 'name') {
            namestr = leafnode(node);
            namecount++;
        }
    }
    if (namecount != 1) err(1);
    return namestr;
}

function get_parameters(root) {
    let parameters = '';
    let vartypes = [];
    for (let node of root.tos.sort(compare_height)) {
        if (node.SFclass == 'vartype') {
            vartypes.push(get_vartype(node));
        }
    }
    for (let v of vartypes)
        parameters += v + ', ';
    if (parameters != '')
        parameters = parameters.slice(0, -2);
    return parameters;
}

function get_func_return(root) {
    if (root.tos.length != 1) err(11);
    if (root.tos[0].SFclass != "vartype") err(12);

    return root.tos[0].text;
}

function func_define(root) {
    //function (<parameter types>) {internal|external} [pure|constant|view|payable] [returns (<return types>)]

    let funcname = name(root);
    let func_tag = '';
    let func_count = 0;
    let vis_tag = '';
    let vis_count = 0;
    let parameters = '';
    let return_tag = '';
    let begin_node;
    for (let node of root.tos) {
        if (node.SFclass == 'vis_tag') {
            vis_tag = leafnode(node);
            vis_count++;
        }
        else if (node.SFclass == 'func_tag') {
            func_tag = leafnode(node);
            func_count++;
        }
        else if (node.SFclass == 'parameters') {
            parameters = get_parameters(node);
        }
        else if (node.SFclass == 'returns') {
            return_tag = get_func_return(node)

        }
        else if (node.SFclass == 'begin') {
            begin_node = node;
        }
        else if (node.SFclass != 'name') err(3);
    }
    if (vis_count > 1 || func_count > 1) err(5);
    let func = '';
    let returns_tag = ' returns (' + return_tag + ')';
    if (return_tag == '') returns_tag = '';
    if (funcname != 'constructor') func = 'function ';
    let line = func + funcname + '(' + parameters + ') ' + vis_tag + ' ' + func_tag + returns_tag;

    code.push(line);
    console.log(line);
    return begin_node;
}

function calc2(root){
    if (root.froms.length != 2) err('202');
    let v = root.froms.sort(compare_height);
    let ret = v[0].output+' '+root.text+' '+v[1].output
    return ret;
}

function func(root){
    let parameters = '';
    for (let node of root.froms.sort(compare_height)) 
        parameters += node.output + ', ';
    if (parameters != '')
        parameters = parameters.slice(0, -2);
    let ret = root.text+'('+parameters+')'
    return ret;
}

function emit(root) {
    if (root.froms.length != 1) err('203');
    code.push('emit '+root.froms[0].output+';');
}

function returnn(root) {
    if (root.froms.length != 1) err('204');
    code.push('return '+root.froms[0].output+';');
}

function require(root){
    if (root.froms.length != 1) err('205');
    code.push('require('+root.froms[0].output+');');
}

function calc1(root){
    if (root.froms.length != 1) err('206');
    if (root.tos.length != 1) err('207');
    code.push(root.tos[0].text+' = '+root.froms[0].output+';');
    return root.tos[0];
}

function nop(root){
    for (let node of root.froms.sort(compare_height)) 
        code.push(node.output+';');
}

function iff(root){
    console.log('iff')
    if (root.froms.length != 1)err('208');
    if (!(root.tos.length == 1 && root.tos[0].SFclass=='begin')) err('209');
    code.push('if ('+root.froms[0].output+')');
    code.push('{');
    let endnode = func_flow(root.tos[0]);
    code.push('}');
    return endnode;
}

function func_flow(root) {
    //console.log(root);
    if (root.SFclass != 'begin') err('201');
    let queue = new Queue();
    for (let node of root.tos) {
        if (node.type != 'null') {
            console.log(node);
            queue.push(node);
            node.output = node.text;
        }
    }
    console.log("@@@");
    while (!queue.isEmpty()) {
        let node = queue.pop();
        console.log(node);
        for (let next of node.tos) {
            if (next.indegree == -1)
                next.indegree = next.froms.length;
            next.indegree -= 1;
            if (next.indegree == 0) {
                if (next.type == "value") 
                    next.output = next.text;
                else if (next.type == "mid") 
                {
                    if (next.SFclass == '2calc')
                        next.output = calc2(next);
                    else if (next.SFclass == 'func')
                        next.output = func(next);
                }
                else if (next.type == "end") 
                {
                    if (next.SFclass == 'emit')
                        emit(next);
                    else if (next.SFclass == 'return')
                        returnn(next);
                    else if (next.SFclass == 'require')
                        require(next);
                    else if (next.SFclass == '1calc')
                    {
                        queue.push(calc1(next));
                        continue;
                    }
                    else if (next.SFclass == 'nop')
                        nop(next);
                    else if (next.SFclass == 'if')
                    {
                        queue.push(iff(next));
                        continue;
                    }
                }
                else if (next.SFclass == 'end')
                {
                    return next;
                } 
                queue.push(next);
            }
        }
        node.indegree = -1;
    }

}

function ffunction(root) {
    let begin_node = func_define(root);
    if (!begin_node) err(13);
    code.push('{');
    func_flow(begin_node);
    code.push('}');
}

function get_vartype(root) {
    let varname = name(root);
    let count = 0;
    let vis_tag = '';
    let arraytype = '';
    let typecount = 0;
    let retcode = ''
    if (root.text != 'array') //string/bool/int/address/byte32
    {
        for (let node of root.tos)
            if (node.SFclass == 'vis_tag') {
                vis_tag = leafnode(node);
                count++;
            }
            else if (node.SFclass != 'name') err(3);
        if (count > 1) err(2);
        retcode = root.text + ' ' + vis_tag + ' ' + varname;
    }
    else if (root.text == 'array') {
        for (let node of root.tos)
            if (node.SFclass == 'vis_tag') {
                vis_tag = leafnode(node);
                count++;
            }
            else if (node.SFclass == 'vartype') {
                arraytype = leafnode(node);
                typecount++;
            }
            else if (node.SFclass != 'name') err(3);
        if (count > 1 || typecount != 1) err(2);
        retcode = arraytype + '[] ' + vis_tag + ' ' + varname;
    }
    return retcode;
}

function mapping(root) {
    let varname = name(root);
    let count = 0;
    let vis_tag = '';
    let vartypes = [];
    let v1, v2;
    for (let node of root.tos) {
        if (node.SFclass == 'vis_tag') {
            vis_tag = node.text;
            count++;
        }
        else if (node.SFclass == 'vartype') {
            vartypes.push(node);
        } else if (node.SFclass != 'name') err(3);
    }
    if (vartypes.length != 2) err(5);
    if (compare_height(vartypes[0], vartypes[1]) <= 0) {
        v1 = vartypes[0].text;
        v2 = vartypes[1].text;
    } else {
        v1 = vartypes[1].text;
        v2 = vartypes[0].text;
    }
    if (count > 1) err(2);
    code.push('mapping(' + v1 + ' => ' + v2 + ')' + vis_tag + ' ' + varname + ';')
}

function eevent(root) {
    let varname = name(root);
    let parameters = get_parameters(root);
    // event HighestBidIncreased(address bidder, uint amount);
    code.push('event ' + varname + '(' + parameters + ');');
}

function contract(root) {
    //get contract name
    let conname = name(root);
    code.push("contract " + conname );
    code.push("{");
    //define var
    for (let node of root.tos) {
        if (node.SFclass == 'vartype')
            if (node.text == 'mapping')
                mapping(node);
            else {
                let line = get_vartype(node) + ';';
                code.push(line);
            }
    }
    for (let node of root.tos)
        if (node.SFclass == 'event')
            eevent(node);
    for (let node of root.tos)
        if (node.SFclass == 'function')
            ffunction(node);

    code.push("}");

}

function smartflow(map) {
    let node;
    code.push("pragma solidity ^0.4;");

    for (node of map)
        if (node.SFclass == 'contract')
            contract(node);

    return code;
}



export default function grammar(map) {
    code = [];
    let SFcode = smartflow(map);
    return SFcode;
}
