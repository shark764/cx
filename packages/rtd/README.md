# Realtime Dashboard

Front-End project made with Javascript technologies to provide realtime data.
It replaces old Config-UI Realtime-Dashboard project made with AngularJS.

## Installation

This project requires [Node.js](https://nodejs.org/) v14+ to run.

Using .nvmrc file helps to normalize node version used by all maintainers.
If you are required to use version specified in this file, run these commands.

```bash
nvm use
nvm install
```

Use the package manager [Yarn](https://classic.yarnpkg.com/en/docs/install) v1.22+ to install dependencies and devDependencies.

```bash
yarn install
```
## Usage

**Run project**

```bash
yarn start:rtd
```

This will run project silently on port 3007. Change following line on `package.json` file to run on a different port if needed
```json
{
  "scripts": {
    "start": "BROWSER=none PORT=3007 react-app-rewired start"
  }
}
```
setting `BROWSER=none` makes project to run without opening browser automatically

If you run this project from its package folder

```bash
cd packages/rtd/
yarn start
```

## Utilities

Format code using [Eslint](https://eslint.org/)

```bash
yarn run lint:fix
```

## Tech Stack
- [ReactJS](https://reactjs.org/)

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
UNLICENSED