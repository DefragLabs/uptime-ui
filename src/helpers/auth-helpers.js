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