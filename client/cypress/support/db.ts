import { MongoClient } from 'mongodb';

const uri = 'mongodb://it2810-48.idi.ntnu.no:27017';
if (!uri) {
    throw new Error('Missing MONGODB_URI');
}

const client = new MongoClient(uri);
export async function connect() {
  await client.connect();
  return client.db('GameRaterTest');
}

export async function disconnect() {
  await client.close();
}

export default {connect, disconnect};