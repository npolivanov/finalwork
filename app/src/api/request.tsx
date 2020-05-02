import axios from "axios";

export default (url: string, data: any) => {
  return axios
    .post(url, { data: data })
    .then((res) => {
      if (res.status !== 200) {
        throw new Error();
      } else {
        return res;
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const requestGet = (url: string) => {
  return axios.get(url);
};
