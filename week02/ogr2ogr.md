ogr2ogr `
  -f "PostgreSQL" `
  -nln "indego-stations-status-2024-01" `
  -lco "OVERWRITE=yes" `
  PG:"host=localhost port=5432 dbname=musa_509 user=postgres password=000929" `
  "week02\indego-stations-status-2024-01.geojson"

ogr2ogr `
  -f "PostgreSQL" `
  -nln "stations_geo" `
  -lco "SCHEMA=indego" `
  -lco "GEOM_TYPE=geography" `
  -lco "GEOMETRY_NAME=geog" `
  -lco "OVERWRITE=yes" `
  PG:"host=localhost port=5432 dbname=musa_509 user=postgres password=000929" `
  "week02\indego-stations-status-2024-01.geojson"