import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('session-data')||"{}").token||""}`,
  },
});

api.interceptors.response.use((res)=>{console.log("res:",res)
  

  return res;
},(error)=>{
  if(error.status===401){
    localStorage.setItem("session-data","")
    window.location.assign("/login")
  }
})

export default api;