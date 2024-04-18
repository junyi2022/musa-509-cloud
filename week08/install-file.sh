pip install `
  functions-framework `
  google-cloud-storage `
  requests `
  python-dotenv

npm install `
  @google-cloud/functions-framework `
  @google-cloud/storage `
  dotenv

# run cloud function locally
functions-framework --debug `
  --target extract_phl_opa_properties

npx @google-cloud/functions-framework `
  --target extract_phl_opa_properties

# deploy cloud function

# template
gcloud functions deploy YOUR_FUNCTION_NAME `
[--gen2] `
--region=YOUR_REGION `
--runtime=YOUR_RUNTIME `
--source=YOUR_SOURCE_LOCATION `
--entry-point=YOUR_CODE_ENTRYPOINT `
TRIGGER_FLAGS

#example
gcloud functions deploy extract_phl_opa_properties `
--gen2 `
--region=us-central1 `
--runtime=python312 `
--source=. `
--project=musa-509-415020 `
--entry-point=extract_phl_opa_properties `
--service-account=data-pipeline-robot-2024@musa-509-415020.iam.gserviceaccount.com `
--set-env-vars='DATA_LAKE_BUCKET=junyiyang_data_lake' `
--memory=4Gi `
--timeout=240s `
--no-allow-unauthenticated `
--trigger-http

gcloud functions deploy prepare_phl_opa_properties `
--gen2 `
--region=us-central1 `
--runtime=nodejs20 `
--source=. `
--project=musa-509-415020 `
--entry-point=prepare_phl_opa_properties `
--service-account=data-pipeline-robot-2024@musa-509-415020.iam.gserviceaccount.com `
--set-env-vars='DATA_LAKE_BUCKET=junyiyang_data_lake' `
--memory=8Gi `
--timeout=480s `
--no-allow-unauthenticated `
--trigger-http

gcloud functions deploy run_sql `
--gen2 `
--region=us-central1 `
--runtime=python312 `
--source=. `
--project=musa-509-415020 `
--entry-point=run_sql `
--service-account=data-pipeline-robot-2024@musa-509-415020.iam.gserviceaccount.com `
--set-env-vars='DATA_LAKE_BUCKET=junyiyang_data_lake,DATA_LAKE_DATASET=data_lake' `
--memory=8Gi `
--timeout=480s `
--no-allow-unauthenticated `
--trigger-http

#run cloud function in the cloud
gcloud functions call extract_phl_opa_properties --project=musa-509-415020
gcloud functions call prepare_phl_opa_properties --project=musa-509-415020

#read error logs
gcloud functions logs read extract_phl_opa_properties --project=musa-509-415020
  # can use --limit to limit the number of logs to read

#run cloud function (with sql selection) in the cloud
#cannot use the above method to run sql related cloud function
Invoke-RestMethod -method POST https://us-central1-musa-509-415020.cloudfunctions.net/run_sql?sql=data_lake/phl_opa_properties.sql `
-headers @{
  'Authorization' = "bearer $(gcloud auth print-identity-token)"
  'Content-Type' = "application/json"
}
