import { extractToken, JwtResponse, SaveJwt ,BASE_URL ,JobPayload} from "./common";


interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  role:string;
  currentPosition:string;
  skills:Array<string>;
  linkedein:string;
  companyName:string;
}

export const jobList=async()=>{
   const res = await fetch(`${BASE_URL}/recruiter/get`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${extractToken()}`},
  });
  if (!res.ok) throw new Error('could not get JobList');
  return res.json();
}
export const loginUser = async (payload: LoginPayload) => {
  const res = await fetch(`${BASE_URL}/user/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Login failed');
  return res.json();
};
export const createNewJob= async(payload:JobPayload)=>{
  const res=await fetch(`${BASE_URL}/recruiter/add`,{
    method: 'POST',
    headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${extractToken()}`},
    body: JSON.stringify(payload),
  });
  if(!res.ok) throw new Error('Creation Failed');
  return res.json();
}
export const registerUser = async (payload: RegisterPayload) => {
  const res = await fetch(`${BASE_URL}/recruiter/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  
 
  if (!res.ok) throw new Error('Registration failed');
      const data= await res.json();
      const jwtResponse:JwtResponse=data as JwtResponse
      await SaveJwt(jwtResponse);
     
  return res.json();
};

export const getApplicationByJob=async(jobId:number,page:number)=>{
  const res=await fetch(`${BASE_URL}/recruiter/get_applications/${jobId}?page=${page}`,{
    method:'GET',
     headers: { 'Content-Type': 'application/json' ,'Authorization': `Bearer ${extractToken()}`},
  });
  if(!res.ok) throw new Error('Creation Failed');
  return res.json();
}
