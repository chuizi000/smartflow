export default function(codes){
    let space_num = 0;
    let ret = '';
    for (let line of codes){
        if (line == '}') space_num-=4;
        for (let i=1;i<=space_num;i++)
            ret +=' ';
        ret += line+'\n';
        if (line == '{') space_num+=4;
        
    }
    return ret;
}