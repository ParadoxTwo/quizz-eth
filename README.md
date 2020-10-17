To run it, port 3000 (for frontend) and port 6000 (for backend) must of the computer system must be free. The browser should explicitly allow these ports to run. This can be done by adding --explicitly-allowed-ports=3000,6000 right after the path to browser in the shortcut. For example, for Microsoft Edge (new): <br/>
Target: "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" --explicitly-allowed-ports=3000,6000 <br/>
The browser must have metamask extension installed and connected to the rinkeby testnet. Once these steps are done, QuizzEth can be run. <br/>


For backend, in the backend directory of the project:
### `npm install`
### `node server.js`
<br/>

For frontend, in the main directory of the project:
### `npm install`

<br/>
In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

