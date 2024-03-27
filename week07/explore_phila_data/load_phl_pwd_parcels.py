from dotenv import load_dotenv
load_dotenv()

import os
from google.cloud import bigquery

bucket_name = os.getenv("DATA_LAKE_BUCKET")
dataset_name = os.getenv("DATA_LAKE_DATASET")

# Load the PWD parcels data into BigQuery as an external table
prepared_blobname = "prepared/phl_pwd_parcels/phl_pwd_parcels.jsonl"
table_name = "phl_pwd_parcels"
table_url = f"gs://{bucket_name}/{prepared_blobname}"

create_table_sql = f'''
CREATE OR REPLACE EXTERNAL TABLE {dataset_name}.{table_name}
OPTIONS(
    format="JSON",
    uris=["{table_url}"]
    )
    '''

bigquery_client = bigquery.Client()
bigquery_client.query_and_wait(create_table_sql)
print(f'Loaded {table_url} into {dataset_name}.{table_name}')