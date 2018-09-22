export function isValidEmail(email) {
  let lastAtPos = email.lastIndexOf('@');
  let lastDotPos = email.lastIndexOf('.');
  if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
    return false;
  }
  return true;
}