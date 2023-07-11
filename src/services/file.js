import axios from 'axios';

export async function uploadImages(image) {
const formData = new FormData();
  formData.append('file', image);
  const config = {
      headers: { 'content-type': 'multipart/form-data' }
  }
  const imgurl = await axios.post(`${API_URL}/firebase/files`, formData, config)
      .then(res => JSON.parse(JSON.stringify(res)))
      .then(res => res.data)
      .catch(error => {
          console.log(error);
      });
   return imgurl;
};

export const uploadQRcode = async options => {
    const { onSuccess, onError, file, onProgress } = options;

    const fmData = new FormData();
    const config = {
      headers: { "content-type": "multipart/form-data" },
    };
    fmData.append("image", file);
    try {
      const res = await axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        fmData,
        config
      );

      onSuccess("Ok");
      console.log("server res: ", res);
    } catch (err) {
      console.log("Eroor: ", err);
      const error = new Error("Some error");
      onError({ err });
    }
};

//   export async function uploadQRcode(image) {
//     const formData = new FormData();
//       formData.append('file', image);
//       const config = {
//           headers: { 'content-type': 'multipart/form-data' }
//       }
//       const imgurl = await axios.post(`${API_URL}/firebase/files`, formData, config)
//           .then(res => JSON.parse(JSON.stringify(res)))
//           .then(res => res.data)
//           .catch(error => {
//               console.log(error);
//           });
//        return imgurl;
//     };