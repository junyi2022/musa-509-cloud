ogr2ogr `
  -f "PostgreSQL" `
  -nln "indego-stations-status-2024-01" `
  -lco "OVERWRITE=yes" `
  PG:"host=localhost port=5432 dbname=musa_509 user=postgres password=000929" `
  "week02\indego-stations-status-2024-01.geojson"