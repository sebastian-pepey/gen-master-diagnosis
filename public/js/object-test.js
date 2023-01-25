let object = {
    M01: {
        2139: {
            description: 'Esta es una descripción de la alarma',
            type: 'B',
            data:
                [
                    {
                        timestamp: new Date(),
                        parameters: { value01: 300, value02: 300, value03: 300 }
                    },
                    {
                        timestamp: new Date(),
                        parameters: { value01: 400, value02: 400, value03: 400 }
                    }
                ]
        },

        4000: {
            description: 'Esta es una descripción de la alarma',
            type: 'B',
            data:
                [
                    {
                        timestamp: new Date(),
                        parameters: { value01: 301, value02: 300, value03: 300 }
                    },
                    {
                        timestamp: new Date(),
                        parameters: { value01: 400, value02: 400, value03: 400 }
                    }
                ]

        }
    },

    M02: {
        3000: {
            description: 'Esta es una descripción de la alarma',
            type: 'B',
            data:
                [
                    {
                        timestamp: new Date(),
                        parameters: { value01: 300, value02: 300, value03: 300 }
                    },
                    {
                        timestamp: new Date(),
                        parameters: { value01: 400, value02: 400, value03: 400 }
                    }
                ]
        },

        5000: {
            description: 'Esta es una descripción de la alarma',
            type: 'B',
            data:
                [
                    {
                        timestamp: new Date(),
                        parameters: { value01: 301, value02: 300, value03: 300 }
                    },
                    {
                        timestamp: new Date(),
                        parameters: { value01: 400, value02: 400, value03: 400 }
                    }
                ]

        }
    }
}

for (gen in object) {

    for (alarm in object[gen]) {

        object[gen][alarm].data.forEach(register => {
            console.log(register.timestamp)
        });

    }
}
