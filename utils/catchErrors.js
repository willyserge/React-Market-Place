function catchErrors(error , displayError){
  let errorMsg;
  if (error.response) {
      errorMsg = error.response.data
      console.log("Error response",errorMsg)

      // for cloudinary

      if(error.response.data.error){
          errorMsg = error.response.data.message;
      }
  }
  else if(error.request){
    errorMsg = error.request
    console.log("Error request",errorMsg)

  }
  else{
      errorMsg = error.message
      console.log('Error messsage',errorMsg)
  }

  displayError(errorMsg)
}

export default catchErrors;