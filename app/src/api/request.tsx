import axios from "axios";

export default (url: string, data: any, object?: any) => {
  let currentObject;
  if (object) {
    currentObject = {
      data: data,
      ...object,
    };
  } else {
    currentObject = {
      data: data,
    };
  }
  console.log("currentObject");
  console.log(currentObject);
  return axios
    .post(url, currentObject)
    .then(res => {
      if (res.status !== 200) {
        throw new Error();
      } else {
        return res;
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const requestGet = (url: string) => {
  return axios.get(url);
};
