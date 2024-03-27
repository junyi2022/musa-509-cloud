import dotenv from 'dotenv';
dotenv.config();

import BigJSON from 'big-json';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import BigJSON from 'big-json';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DATA_DIR = __dirname + '/raw_data';
// create the directory if it doesn't exist
await fs.mkdir(RAW_DATA_DIR, { recursive: true });
const PREPARED_DATA_DIR = __dirname + '/prepared_data';
// create the directory if it doesn't exist
await fs.mkdir(PREPARED_DATA_DIR, { recursive: true });

const rawFilename = path.join(RAW_DATA_DIR, 'phl_pwd_parcels.geojson');
const preparedFilename = path.join(PREPARED_DATA_DIR, 'phl_pwd_parcels.jsonl');

const bucketName = process.env.BUCKET_NAME;
const storage = new Storage();
const bucket = storageClient.bucket(bucketName);

// Download the data from Google Cloud Storage
const rawBlobName = 'raw.phl_pwd_parcels/phl_pwd_parcels.geojson';
await bucket.file(rawBlobName).download({ destination: rawFilename });
console.log(`Downloaded to ${rawFilename}`);

// Load the data from the GeoJSON file
const data = await BigJSON.parse({
  body: await fs.readFile(rawFilename)
});

// fs.readFile(rawFilename).then(contents => {}) 
// .then will handle the result of the promise when the promise is fulfilled

// Write the data to a JSONL file
const f = await fs.open(preparedFilename, 'w');
for (const feature of data.features) {
  const row = feature.properties;
  row.geog = (
    feature.geometry && feature.geometry.coordinates
    ? JSON.stringify(feature.geometry)
    : null
  );
  await f.write(JSON.stringify(row) + '\n');
}

console.log(`Processed data into ${preparedFilename}`);

// Upload the prepared data to Google Cloud Storage
const preparedBlobName = 'prepared.phl_pwd_parcels/phl_pwd_parcels.jsonl';
await bucket.upload(preparedFilename, { destination: preparedBlobName });
console.log(`Uploaded to ${preparedBlobName}`);
