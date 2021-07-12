import React from "react";
import Amplify, {Storage } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);
function Upload() {
  const fileInput = React.useRef();

  const handleClick = (event) => {
    event.preventDefault();
    let newArr = fileInput.current.files;
  
    for (let i = 0; i < newArr.length; i++) {
      handleUpload(newArr[i],i);
    }
  };

  const handleUpload =  (file,i) => {
    let newFileName = file.name.replace(/\..+$/, "");
    
    try {
     Storage.put(newFileName, file, {
        progressCallback(progress) {
            console.log(`Uploaded: ${Math.round((progress.loaded/progress.total)*100)}`);
          // fruits.set(newFileName,Math.round((progress.loaded/progress.total)*100));
            let t   = Math.round((progress.loaded/progress.total)*100);
            //map.set(newFileName,track)
            console.log(t,i,newFileName)
        
          },
    }).then(e=>{
     // console.log(e)
    });
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
    // const ReactS3Client = new S3(config);
    // ReactS3Client.uploadFile(file, newFileName).then((data) => {
    //   if (data.status === 204) {
    //     console.log("success");
    //   } else {
    //     console.log("fail");
    //   }
    // });
  };


  return (
    <>
      <form className='upload-steps' onSubmit={handleClick}>
        <label>
          Upload file:
          <input type='file' multiple ref={fileInput} />
        </label>
        <br />

        <button type='submit'>Upload</button>
      </form>
    </>
  );
}
export default withAuthenticator(Upload);
//export default Upload;