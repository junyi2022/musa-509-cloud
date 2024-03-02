import json


# Load the data from the GeoJSON file
with open('opa_properties_public.geojson', 'r', encoding='utf-8') as f:
    data = json.load(f)


# Write the data to a JSONL file
# Normally, without empty geog
# with open('opa_properties_public.jsonl', 'w') as f:
#     for feature in data['features']:
#         row = feature['properties']
#         row['geog'] = json.dumps(feature['geometry'])
#         f.write(json.dumps(row) + '\n')

with open('opa_properties.jsonl', 'w') as f:
    for feature in data['features']:
        row = feature['properties']
        if feature['geometry'] and feature['geometry']['coordinates']:
            row['geog'] = json.dumps(feature['geometry'])
        else:
            row['geog'] = None
        f.write(json.dumps(row) + '\n')
