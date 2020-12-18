import * as msal from "@azure/msal-browser";

const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        //authority: 'https://login.microsoftonline.com/common',
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
        redirectUri: process.env.REACT_APP_REDIRECT_URI,

    },
    cache: {
      cacheLocation: "sessionStorage",
      storeAuthStateInCookie: false
  }
};

const msalInstance = new msal.PublicClientApplication(msalConfig);

msalInstance.handleRedirectPromise().then((tokenResponse) => {
  // Check if the tokenResponse is null
  // If the tokenResponse !== null, then you are coming back from a successful authentication redirect. 
  // If the tokenResponse === null, you are not coming back from an auth redirect.
  if (tokenResponse === null) {
    console.log('toke null');
  } else {
    console.log('token ok')
  }
}).catch((error) => {
  // handle error, either in the library or coming back from the server
  console.error(error);
});


export default msalInstance;