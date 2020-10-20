This app is running in [Google Cloud](https://pokedex-front.uc.r.appspot.com/)

You can access the backend in http://35.192.126.172:8080/pokemon and http://35.192.126.172:8080/pokemon/pikachu

To get the Backend code visit [Github](https://github.com/danielflorez9612/Pokedex)
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## How to deploy to GCP

* Run 'npm run build' to generate build/ folder 
* Create a nodejs app, configure the proxy for the requests and set the build/ content into the public folder for the node app
* Upload the node app to gcp
* In a GCP project create an AppEngine of language Node.js 
* Create an app.yaml config file with nodejs and flex env
* Run 'gcloud deploy' in the cloud shell for the project