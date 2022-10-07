const fs=require('fs');
var moment=require('moment');
archivo=fs.readFileSync('M01.csv','utf-8');

let arreglo=archivo.split('\r\n');

//El arreglo de objetos literales debe tener la siguiente forma: {Symbol:1,Date:1,value:1}

//console.log(arreglo[1].split(',').map(e=>parseInt(e)));

let encabezado=arreglo[0].split(';');

let arreglo2=[]

function acomodar(encabezado,arreglo2,arreglo){
    for(let i=1;i<arreglo.length;i++){
        for(j=0;j<encabezado.length-1;j++){
            arreglo2[i-1+j*(arreglo.length-1)]=
            {   
                nombre:encabezado[j+1],
                fecha:moment(arreglo[i].split(';')[0], "DD/MM/YYYY hh:mm:ss", true).format("DD/MM/YYYY hh:mm:ss"),
                valor:arreglo[i].split(';').map(e=>parseFloat(e))[j+1]
            }
        }
    }
}

acomodar(encabezado,arreglo2,arreglo)
fs.writeFileSync('arreglo2.json',JSON.stringify(arreglo2),'utf-8')





