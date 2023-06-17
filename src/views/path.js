exports.viewFolder = __dirname;

const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://admin:admin@stocks.odxmw62.mongodb.net/';
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

await client.db('Stocks').collection('users').insertOne({
  firstName: 'Oneill',
  lastName: 'Panker',
  email: 'oneill@mail.com',
  password: 'sfnlaskntguejrahbtp23895y29rfhah4htoweuhitfh',
});

await client.db('Stocks').collection('users').findOne({
  email: 'oneill@mail.com',
});

await client.db('Stocks').collection('users').updateOne(
  { email: 'oneill@mail.com' },
  { $set: { email: 'oneill2@gmail.com' } },
  { upsert: true },
);

await client.db('Stocks').collection('users').deleteOne({
  email: 'oneill@mail.com',
});

await client.db('stocks').collection('users').find(
  { age: { $gte: 18 } }
);

await client.db('stocks').collection('users').find(
  { $or: [ { firstName: 'Oneill' }, { firstName: 'Dorin' } ] }
);

