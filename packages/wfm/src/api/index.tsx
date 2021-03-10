import { WFMAPI } from '@cx/wfmapi';

// Will need to grab an auth token at some point, maybe localstorage ot some other place
// along with other global config items.  like tenant ect
export const wfm = WFMAPI('auth token goes here');

