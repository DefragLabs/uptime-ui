export function getAuthToken() {
  let auth;
  const userSession = JSON.parse(localStorage.getItem('state'));
  const authToken = userSession.auth.userSession.token;
  if (authToken) {
    auth = `JWT ${authToken}`;
  } else {
    auth = '';
  }
  return auth;
}

export const setStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch(err) {
    console.log(err);
  }
};

export const getStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch(err) {
    return undefined;
  }
};

export const clearLocalStorage = () => {
  localStorage.clear();
};

export function isUserSessionActive(userSession) {
  let isSessionActive = false;
  if (userSession && userSession.token) {
    isSessionActive = true;
  } else {
    isSessionActive = false;
  }
  return isSessionActive;
};

export function isUserActive() {
  let userSession = JSON.parse(localStorage.getItem('state'));
  if (userSession && userSession.auth.userSession.token) {
    return true;
  }
  return false;
};

export function getUserName() {
  let userSession = JSON.parse(localStorage.getItem('state'));
  if(userSession){
    const token = userSession.auth.userSession.token;
    const tokenDetails = decodeJwtToken(token);
    return `${tokenDetails.firstName} ${tokenDetails.lastName}`;
  }
  return null;
}

export function isTokenValid(token) {
  const jwt = decodeJwtToken(token);
  let currentTime = new Date();
  let authTokenExpiryTime = new Date(jwt.exp * 1000);
  var timeDiff = Math.abs(authTokenExpiryTime.getTime() - currentTime.getTime());
  var minuteDiff = Math.round(timeDiff / 60000);
  if (minuteDiff <= 30) {
    // refreshToken();
  }
};

export function decodeJwtToken(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  const tokenDetails = JSON.parse(window.atob(base64));

  return tokenDetails;
};