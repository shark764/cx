import * as React from "react";
import * as ReactDOM from "react-dom";

function App() {
  const [ count, setCount ] = React.useState( 0 );

  React.useEffect( () => {
    document.title = `You clicked ${count} times`;
  } );

  return <div>
    <button onClick={ () => setCount( count + 1 ) }> plus 1</button>
  </div>;
}

ReactDOM.render( <App />, document.getElementById( "app" ) );
