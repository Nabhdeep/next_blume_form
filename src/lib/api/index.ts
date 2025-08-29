import axios from 'axios'



const createInstance = axios.create({
    baseURL:"https://dev.blumehealthco.com/api/v1"
})


export const postPublicForm = (payload: object) => {
  return createInstance
    .post("/public/form", payload)
    .then((res) => res.data)
};