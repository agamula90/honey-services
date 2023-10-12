## Run instructions

- To prepare images before run/build step use `npm run prepare`
- To run app use `npm run run`

## Deploy instructions
- Upload images to aws s3.
- Build app: `npm run build`
- Create Procfile in dist directory, so aws knows how to start the app. Content of Procfile: `web: npx parcel index.html`
- Zip all files from dist directory (with Procfile) into archive with name: `${day_number}_${upload_id}` and upload to aws