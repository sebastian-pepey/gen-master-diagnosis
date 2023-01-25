const fs = require('fs');
const path = require('path');
const moment = require('moment');

const csvTrend = path.join(__dirname, './../../public/files/trend_m01.csv');

const csvAlarm01 = path.join(__dirname, './../../public/files/alarm_m01.csv');

const csvAlarm02 = path.join(__dirname, './../../public/files/alarm_m02.csv');

const fileTrend = fs.readFileSync(csvTrend, {encoding: 'binary'})

const fileAlarm = [
    fs.readFileSync(csvAlarm01, {encoding: 'binary'}),
    fs.readFileSync(csvAlarm02, {encoding: 'binary'})
]

const fileController = {
    loadTrend: (req, res) => {

        var outputArray = [];

        let fileArray = fileTrend.split('\r\n')

        fileArray[0] = 'timestamp' + fileArray[0];

        for (i = 0; i < fileArray.length; i ++) {

            let rowArray = fileArray[i].split(';').filter(e => {
                return e !== ''
            });

            if (i === 0) {

                for (k = 1; k < rowArray.length; k ++) {

                    let nameArray = rowArray[k].split(' [')

                    outputArray.push({
                        name: nameArray[0],
                        unit: nameArray[1].slice(0, -1),
                        values: []
                    })

                };

            } else {

                for (j = 1; j < rowArray.length; j ++) {

                    outputArray[j - 1].values.push({
                        date: moment(rowArray[0], 'DD/MM/YYYY hh:mm:ss').toDate(),
                        value: parseFloat(rowArray[j].replace(',', '.'))
                    })
                }
            }
        }

        let respuesta = {

            meta: {
                status: 200
            },
            data: outputArray
        }

        res.json(respuesta);
    },

    loadAlarm: (req, res) => {

        let fileArray = {};

        let rowArray = [];

        let fileParsed = [];

        fileAlarm.forEach(readedFile => {

            let indiceMaquina = readedFile.lastIndexOf(';M') + 1;

            let nombreMaquina = readedFile.substring(indiceMaquina, indiceMaquina + 3);

            fileParsed = readedFile.split('\r\n').filter(e => {
                return e !== ''
            });

            fileArray[nombreMaquina] = {};

            fileParsed.forEach(fileRow => {

                let fileArrayRow = fileRow.split(';').filter(e => {
                    return e !== ''
                });

                let objectInfo = {};

                for (let i = 6; i < fileArrayRow.length; i++) {

                    if (isNaN(parseFloat(fileArrayRow[i])) && !isNaN(parseFloat(fileArrayRow[i + 1]))) {

                        objectInfo[fileArrayRow[i]] = parseFloat(fileArrayRow[i + 1]);

                    }
                }

                let objectData = {
                    timestamp: new Date(
                        (new Date(fileArrayRow[0].slice(0, -1) + '.' + fileArrayRow[1]) - (new Date()).getTimezoneOffset() * 60000)
                    ).toISOString(),
                    info: objectInfo
                }

                if (fileArrayRow[2] in fileArray[nombreMaquina] !== true) {

                    fileArray[nombreMaquina][fileArrayRow[2]] = {
                        description: fileArrayRow[3],
                        type: fileArrayRow[5],
                        data: [objectData]
                    };

                } else {

                    fileArray[nombreMaquina][fileArrayRow[2]].data.push(objectData)

                };

            });

        });

        let respuesta = {

            meta: {
                status: 200
            },
            data: rowArray
        }

        res.json(fileArray);

    }
}

module.exports = fileController;
