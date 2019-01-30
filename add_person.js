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

const [first, last, dob] = process.argv.slice(2);

const date = new Date(dob);

console.log(typeof first);
console.log(last);
console.log(dob);
console.log(typeof date);

knex('famous_people')
    .insert([{ first_name: first, last_name: last, birthdate: date  }])
    .catch((err) => { console.log(err); throw err})
    .finally(() => {
        console.log("It worked!");
        knex.destroy();
    })
