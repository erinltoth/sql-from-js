const pg = require('pg');

const settings = require('./settings'); // settings.json

const client = new pg.Client({
    user    : settings.user,
    password: settings.password,
    database: settings.database,
    host    : settings.hostname,
    port    : settings.port,
    ssl     : settings.ssl
});

const data = process.argv.slice(2)[0];

client.connect();


function fpQuery(data) {
    client.query("SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1", [data], (err, res) => {
        if (err) {
            console.log('ERR', err);
            return false;
        }
        printQuery(data, res.rows);
    })
}

function printQuery(data, res) {
    console.log("Searching...");
    const count = res.length;
    let num = 1;
    console.log(`Found ${count} person(s) by the name ${data}:`);
    for (let i in res) {
        let date = res[i].birthdate.getDate();
        let month = res[i].birthdate.getMonth() + 1;
        let year = res[i].birthdate.getFullYear();

        console.log(`${num++}: ${res[i].first_name} ${res[i].last_name}, born ${year}-0${month}-0${date}`);
    }
    client.end();
}

fpQuery(data);

// client.query("SELECT * FROM famous_people WHERE first_name=$1 OR last_name=$1", [data], (err, res) => {
//     console.log("Searching...");
//     const count = res.rows.length;
//     let num = 1;

    
//     if (err) {
//         console.log('ERR:', err);
//         return false;
//     }
//     console.log(`Found ${count} person(s) by the name ${data}:`);
//     for (let i in res.rows) {
//         let date = res.rows[i].birthdate.getDate();
//         let month = res.rows[i].birthdate.getMonth() + 1;
//         let year = res.rows[i].birthdate.getFullYear();

//         console.log(`${num++}: ${res.rows[i].first_name} ${res.rows[i].last_name}, born ${year}-0${month}-0${date}`);
//     }
//     client.end();
// })

