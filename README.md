# cx

![Disclaimer](https://media.giphy.com/media/AhjXalGPAfJg4/giphy.gif)

- `yarn install`
- `npm start` to run development mode
- `npm test` to run unit tests, e2e tests, lighthouse tests

_WFM - Scheduling + Forecasting_

## Node
- [Node v14](https://nodejs.org/dist/latest-v14.x/docs/api/)
- [NPM v6](https://www.npmjs.com/package/npm?activeTab=versions)

## API
For the api calls to work for now you will need to run chrome without CORs enabled
https://alfilatov.com/posts/run-chrome-without-cors/

## Tech Stack

The UI project is made using the following libraries:

- [React.js](https://reactjs.org/)
- [Recharts](https://recharts.org/en-US/)
- [React-Query](https://react-query.tanstack.com/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React-Hook-Form](https://react-hook-form.com/)
- [React DatePicker](https://reactdatepicker.com/)
- [React Big Calendar](https://github.com/jquense/react-big-calendar)
- [Luxon](https://moment.github.io/luxon/)
- [React Table](https://react-table.tanstack.com/)
- [Styled-Components](https://styled-components.com/)



#tips
Size props for svgs should be numbers not strings…
This way you can apply arithmetic to them for dynamic sizing.

Re-usable components should just take color (or 2 , 3 act) as a prop and not assume there is a theme associated. The parent application can deal with theming and passing color in. This makes the component more reusable across different apps in case no theme is set and also in our case de-couples the component to the parent apps context..   reusable components shouldn’t be tied to any specific context..  it should be able to work with the props provided.

On the topic of color ,  there should always be a fallback default.

If we make icons that are interactive,  they should be able to handle a non-interactive state too..   for example..  if you have hover effects that wouldn’t make sense for a non-interactive icon..   IE an icon that’s display only.

You don’t need any of these props on an svgs in react… xmlns="http://www.w3.org/2000/svg" version="1.1" x="0" y="0"

Always use span instead of div unless you need 100% width, this makes it so we don't need to declare inline-block so much and leads to more consise code

Don't use optional parameters with props that are boolean based..  you lose some of the power of typescript as it won't hint at incorrect usage if you don;t provide it. Instead just make sure the component consumer either provides the true or false explicitly.

Wfm forecasts are using this library for holidays information
https://github.com/dr-prodigy/python-holidays#available-countries

WFM apis:
http://us-east-1-staging-wfm-cx-forecast.cxengagelabs.net/docs
http://us-east-1-staging-wfm-cx-planning.cxengagelabs.net/docs