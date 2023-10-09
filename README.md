## Run instructions

- To prepare images before run/build step use `npm run prepare`
- To run app use `npm run run`

## Build instructions
- Prepare resources for artifact: `npm run build`
- Create Procfile in dist directory, so aws knows how to start the app. Content of Procfile: `web: npx parcel index.html`
- Zip all files of dist directory (with Procfile) into archive with unique name and upload archive to aws.