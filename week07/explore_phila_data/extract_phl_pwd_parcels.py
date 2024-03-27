from dotenv import load_dotenv
load_dotenv()

import pathlib
import requests
from google.cloud import storage
import os

DATA_DIR = pathlib.Path(__file__).parent / 'raw_data'
DATA_DIR.mkdir(exist_ok=True, parents=True)  # Create the directory if it doesn't exist

# Download the OPA Properties data as a CSV
url = 'https://opendata.arcgis.com/datasets/84baed491de44f539889f2af178ad85c_0.geojson'
filename = DATA_DIR / 'phl_pwd_parcels.geojson'

response = requests.get(url)
response.raise_for_status()

with open(filename, 'wb') as f:
    f.write(response.content)

print(f'Downloaded {filename}')


# Upload the downloaded file to cloud storage
bucket_name = os.getenv('DATA_LAKE_BUCKET')
blobname = 'raw/phl_pwd_parcels/phl_pwd_parcels.geojson'

storage_client = storage.Client()
bucket = storage_client.bucket(bucket_name)
blob = bucket.blob(blobname)
blob.upload_from_filename(filename)

print(f'Uploaded {blobname} to {bucket_name}')