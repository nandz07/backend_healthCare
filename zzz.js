function squ(a){
    if(mem[a]){
        console.log('if');
        return mem[a]
    }else{
        console.log('else');
        mem[a]=a*a
        return mem[a]
    }
}

let mem={}

console.log(squ(2));
console.log(squ(3));
console.log(squ(2));
