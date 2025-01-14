// import { Storage } from 'aws-amplify';

// const uploadFiles = async (files) => {
//   if (files.length > 0) {
//     try {
//       const uploadPromises = files.map(async (file) => {
//         const result = await Storage.put(file.name, file);
//         console.log('File successfully uploaded:', result);
//       });

//       await Promise.all(uploadPromises);
//       console.log('All files uploaded successfully');
//     } catch (error) {
//       console.error('Error uploading files:', error);
//     }
//   } else {
//     console.error('No files selected');
//   }
// }

// export default uploadFiles;