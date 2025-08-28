import { useEffect, useState } from 'react'
import {jwtDecode} from 'jwt-decode'

export function useAuth(){
  const [user, setUser] = useState(()=>{
    const token = localStorage.getItem('token');
    if(!token) return null;
    try{
      const payload = jwtDecode(token);
      return { id: payload.id, name: payload.name, email: payload.email, role: payload.role, token };
    }catch{
      return null;
    }
  });
  function login(token, user){
    localStorage.setItem('token', token);
    setUser({ ...user, token });
  }
  function logout(){
    localStorage.removeItem('token');
    setUser(null);
  }
  return { user, login, logout };
}
