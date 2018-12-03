export function getErrorMessage(error) {
  let errorString = "";
  if (Array.isArray(error)){
    for (let index=0; index<error.length; index++){
      errorString += error[index].join(',');
    }
  } else if (error && error.hasOwnProperty('message')){
    errorString = error.message;
  } else if (error){
    for(var key in error){
      errorString += `${error[key]} `;
    }
  } else {
    errorString = JSON.stringify(error);
  }

  return errorString;
}