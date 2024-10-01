import Axios from "axios";

const HTTP = (url) => {
  return Axios.create({
    baseURL: url
  })
}

export default HTTP