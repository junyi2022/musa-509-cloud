import fs from 'node:fs';
import BigJSON from 'big-json';

// Load the data from the GeoJSON file
const data = await BigJSON.parse({
  body: fs.readFileSync('../exercises/opa_properties_public.geojson')
});

// Write the data to a JSONL file
const f = fs.createWriteStream('../exercises/opa_properties_public.jsonl');
for (const feature of data.features) {
  const row = feature.properties;
  row.geog = JSON.stringify(feature.geometry);
  f.write(JSON.stringify(row) + '\n'); // '\n' is to make a new line for each write
}
