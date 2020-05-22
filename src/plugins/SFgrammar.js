import err from '@/plugins/SFerror'

var code = '';

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
        else if (node.SFclass =='begin') {
            begin_node = node;
        } 
        else if (node.SFclass != 'name' ) err(3);
    }
    if (vis_count > 1 || func_count > 1) err(5);
    let func = '';
    if (funcname != 'constructor') func = 'function ';
    let line = func + funcname + '(' + parameters + ') ' +
        + ' ' + vis_tag + ' ' + func_tag +
        ' returns (' + return_tag + ')';
    code.push(line);
    
    return begin_node;
}

function func_flow(root) {
    console.log(root);
    code.push('')
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
            if (node.tos.length == 0)
                vartypes.push(node);
            else err(4);
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
    code.push("contract " + name(root) + "{");

    //define var
    for (let node of root.tos) {
        if (node.SFclass == 'vartype')
            if (node.text == 'mapping')
                mapping(node);
            else
                code.push(get_vartype(node) + ';');
        else if (node.SFclass == 'event')
            eevent(node);
        else if (node.SFclass == 'function')
            ffunction(node);
    }


    code.push("}");
}

function smartflow(map) {
    let code = [];
    let node;
    code.push("pragma solidity ^0.4;");

    for (node of map)
        if (node.SFclass == 'contract')
            contract(node);

    return code;
}



export default function grammar(map) {
    code = '';
    let SFcode = smartflow(map);
    return SFcode;
}
