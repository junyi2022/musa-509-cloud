import dotenv from 'dotenv';
dotenv.config();

import { BigQuery } from '@google-cloud/bigquery';

const bucketName = process.env.BUCKET_NAME;
const datasetName = process.env.DATA_LAKE_DATASET;

// Load the data into BigQuery as an external table
const preparedBlobName = 'prepared/pho_pwd_parcels/phl_pwd_parcels.jsonl';
const tableName = 'phl_pwd_parcels';
const tableUrl = `gs://${bucketName}/${preparedBlobName}`;

const createTableQuery = `
CREATE OR REPLACE EXTERNAL TABLE \`${datasetName}.${tableName}\`
OPTIONS (
    format = 'JSON',
    uris = ['${tableUrl}']
    )
`;

const bigqueryClient = new BigQuery();
await
console.log('Loaded ${tableUrl} into ${datasetName}.${tableName}...')