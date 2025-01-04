import { products } from '@/components/mock/products';
import { algoliasearch } from 'algoliasearch';

// Ensure the environment variables are defined, otherwise throw an error
const appId = process.env.ALOGOLIA_APP_ID;
const apiKey = process.env.ALGOLIA_API_KEY;

if (!appId || !apiKey) {
  throw new Error(
    'Algolia App ID and API Key must be defined in environment variables'
  );
}

const client = algoliasearch(appId, apiKey);

// Fetch and index objects in Algolia
const processRecords = async () => {
  return await client.saveObjects({
    indexName: 'movies_index',
    objects: products,
  });
};

processRecords()
  .then(() => console.log('Successfully indexed objects!'))
  .catch((err) => console.error(err));
