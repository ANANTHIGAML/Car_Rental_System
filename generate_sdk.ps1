# generate_sdk.ps1 - generate python SDK using OpenAPI Generator CLI
# make sure backend is running (uvicorn) before running this
npx @openapitools/openapi-generator-cli generate -i http://127.0.0.1:8000/openapi.json -g python -o car_rental_sdk
Write-Host "SDK generated in car_rental_sdk/"