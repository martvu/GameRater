import { defineConfig } from 'cypress';
import { connect, disconnect } from './cypress/support/db';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173/project2',
    setupNodeEvents(on) {
      // This task cleans the reviews and users collections in the database
      on('task', {
        async clearDB() {
          const db = await connect();
          const reviews = db.collection('reviews');
          await reviews.deleteMany({});
          await reviews.dropIndexes();
          const users = db.collection('users');
          await users.deleteMany({});
          await users.dropIndexes();
          await disconnect();
          return null;
        },
      });
    },
  },
});
