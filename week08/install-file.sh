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
[--gen2] `
--region=us-central1 `
--runtime=python312 `
--source=. `
--entry-point=extract_phl_opa_properties `
--service-account=data-pipeline-robot-2024@musa-509-415020.iam.gserviceaccount.com \
--memory=1Gi `
--no-allow-unauthenticated `
--trigger-http
