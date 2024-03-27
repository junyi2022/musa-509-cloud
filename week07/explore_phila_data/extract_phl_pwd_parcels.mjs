import dotenv from 'dotenv';
dotenv.config();

import fetch from 'node-fetch';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { Storage } from '@google-cloud/storage';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// const __dirname = new URL('.', import.meta.url).pathname; // not working because there is a leading slash
const DATA_DIR = __dirname + '/raw_data';
// create the directory if it doesn't exist
await fs.mkdir(DATA_DIR, { recursive: true });

const url = 'https://opendata.arcgis.com/datasets/84baed491de44f539889f2af178ad85c_0.geojson';
const filename = path.join(DATA_DIR, 'phl_pwd_parcels.geojson');

const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}

await fs.writeFile(filename, await response.text());

console.log(`Downloaded ${filename}`);

// Upload the downloaded file to cloud storage
const bucketName = process.env.DATA_LAKE_BUCKET;
const blobName = 'raw/phl_pwd_parcels/phl_pwd_parcels.geojson';

const storageClient = new Storage();
const bucket = storageClient.bucket(bucketName);
await bucket.upload(filename, {
  destination: blobName,
});

console.log(`Uploaded ${blobName} to ${bucketName}`);