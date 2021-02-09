export const theme = {
  colors: {
    brand: '#07487a',
    primary: '#07487a',
    secondary: '#a3acbd',
    'accent-1': '#3498db',
    'accent-2': '#e6f5ff',
    'accent-3': '#ffffff',
    text: '#222222',
    info: '#00529b',
    success: '#4f8a10',
    warning: '#9f6000',
    error: '#d8000c',
  },
};

export const fetchTheme = () => new Promise( ( resolve, reject ) => {
  if ( !theme ) {
    return setTimeout( () => reject( new Error( 'Theme not found' ) ), 100 );
  }

  return setTimeout( () => resolve( { data: theme } ), 100 );
} );
