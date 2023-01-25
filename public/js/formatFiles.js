const gsaAlarm = [];

const alarms = [];

const readFileAsBinary = (inputFile) => new Promise((resolve, reject) => {   
    
    const reader = new FileReader();

    reader.onload = () => {
        resolve(reader.result);
    };

    reader.onerror = () => {
        reader.abort();
        reject(new DOMException("Problem parsing input file."));
    };

    reader.readAsBinaryString(inputFile);
});

document.querySelector('button#loadFiles').addEventListener('click', (e) => {

    if (document.querySelector('.hideElement')) {
        document.querySelector('.hideElement').classList.remove('hideElement');
    } else {
        document.querySelector('table#alarmTable tbody').innerHTML = '';
    }

    const csvFiles = document.querySelector('input[name=alarmInput]').files;

    let promises=[];

    const fileArray = {};

    let fileArrayOrdered = {};

    for (let i = 0; i < csvFiles.length; i++) {

        if (csvFiles[i] !== undefined) {

            promises.push(readFileAsBinary(csvFiles[i]));

        }
    }

    Promise.all(promises).then( outputFileArray => {

        outputFileArray.forEach(readedFile => {

            let indiceMaquina = readedFile.lastIndexOf(';M')+1;

            let nombreMaquina = readedFile.substring(indiceMaquina,indiceMaquina+3);

            if (!fileArray.hasOwnProperty(nombreMaquina)){
                fileArray[nombreMaquina] = [];
            }

            fileArray[nombreMaquina].push(readedFile);
            
            fileArrayOrdered = Object.keys(fileArray).sort().reduce(
                (obj, key) => { 
                  obj[key] = fileArray[key].join(';').split('\r\n'); 
                  return obj;
                }, 
                {}
            );
        });
            
        for (const [key, value] of Object.entries(fileArrayOrdered)) {

            let fileArrayRow = value;

            for (i = 0; i < fileArrayRow.length - 1; i++) {

                let rowArray = fileArrayRow[i].split(';').filter(e => { return e !== '' });

                alarms.push(
                    {
                        index: i,
                        values: [
                            new Date((new Date(rowArray[0].slice(0, -1) + '.' + rowArray[1])-(new Date()).getTimezoneOffset() * 60000)).toISOString(),
                            rowArray[2],
                            rowArray[3],
                            rowArray[4].replace(/\s+/g, ''),
                        ]
                    }
                )
    
                if (parseInt(rowArray[2]) === 3264) {

                    gsaAlarm.push(alarms[alarms.length - 1])

                }
            }
        }
    
        if (gsaAlarm.length > 0) {

            gsaAlarm.forEach(alarm => {
        
                const tbody = document.querySelector('table#alarmTable tbody');
        
                let tr = document.createElement('tr');
                tr.setAttribute('id', alarm.values[3]);
        
                tbody.appendChild(tr);
        
                alarm.values.forEach( element => {
        
                    let td = document.createElement('td');
        
                    td.textContent = element;
        
                    tr.appendChild(td);
                })
        
                let td = document.createElement('td');
        
                tr.appendChild(td);
        
                let checkbox = document.createElement('input');
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', alarm.index);
        
                td.appendChild(checkbox);        
            });

            let eDate = document.querySelector('input#eventDate');

            eDate.setAttribute('value',gsaAlarm[0].values[0].slice(0,-1));

        };  
    });

});



document.querySelector('button#updateTime').addEventListener('click', (e) => {
    const checked = document.querySelectorAll('input[type="checkbox"]:checked');

    let eDate = document.querySelector('input#eventDate').value;

    let timeDifference = {};

    for (element of checked){
    
        let gsaRow = gsaAlarm.find( object => object.index === parseInt(element.name));

        timeDifference[gsaRow.values[3]] = (new Date(gsaRow.values[0]) - new Date((new Date(eDate)-(new Date()).getTimezoneOffset() * 60000)));

    }

    console.log(timeDifference)
})


