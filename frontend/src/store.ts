// store/authStore.js
import {create} from 'zustand';

 export type AuthStore = {
    token: string
    name:string
    email:string
    login: (token:string,name:string,email:string) => void
    logout: () => void
  }

  const data=JSON.parse(localStorage.getItem("session-data")||"{}")

const useAuthStore = create<AuthStore>()((set) => ({
  token: data.token||"",
  name:data.name||"",
  email:data.email||"",
  login: (token:string,name:string,email:string) => {
    const session={ token,name,email }
    set(session)
    localStorage.setItem("session-data",JSON.stringify(session))
  },
  logout: () => {
    set({ token:"",name:"",email:"" })
    localStorage.setItem("session-data","")
  },
}));

export default useAuthStore;
