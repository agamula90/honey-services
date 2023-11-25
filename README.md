# Honey services frontend

## Available Scripts

Start dev server:

### `npm start`

Runs the app in the development mode. (localhost:8081).
Configure cors for honey-services-backend first to make it work (localhost:8080)

### `npm build`

Builds the app for production to the `dist` folder.\
To deploy app to tomcat server in amazon you need to zip all content first before uploading.
Make sure to change apollo base url first before building app to get rid of cors issues.