const settings = require('./settings'); // settings.json

const options = {
    client: 'pg',
    version: '7.2',
    connection: {
        host : settings.hostname,
        user : settings.user,
        password : settings.password,
        database : settings.database
      }
}

const knex = require('knex')(options);

const data = process.argv.slice(2)[0];

knex('famous_people')
    .where({
        first_name: data 
    })
    .orWhere({
        last_name: data
    })
    .asCallback(function (err, rows) {
        if (err) return console.error(err);
        console.log("Searching...");
        const count = rows.length;
        let num = 1;
        console.log(`Found ${count} person(s) by the name ${data}:`);
        for (let i in rows) {
            let date = rows[i].birthdate.getDate();
            let month = rows[i].birthdate.getMonth() + 1;
            let year = rows[i].birthdate.getFullYear();

            console.log(`${num++}: ${rows[i].first_name} ${rows[i].last_name}, born ${year}-0${month}-0${date}`);
        }
    knex.destroy();

    })


