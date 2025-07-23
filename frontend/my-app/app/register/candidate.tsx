
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Upload } from "lucide-react"
import {RegisterPayload,registerUser,loginWelcome,uploadResume} from "@/data/urlJobseeker"
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"
import { DataLoader } from "@/data/common"
export default function Candidate(){
   const [isDataLoading, setIsDataLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setconfirmPassword]=useState(""); 
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const router=useRouter()
const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
   
    if (file) setResumeFile(file);
  };

  const handleUploadClick = () => {
    inputRef.current?.click();
  };
const RegisterCandidate= async ()=>{
 

  const request:RegisterPayload={
    name:name,
    email:email,
    password:password,
    role:"CANDIDATE"
  }
  
  try{
  if(resumeFile){
    setIsDataLoading(true);
    try{
  await registerUser(request,resumeFile)
    }
    catch(error){
      console.log(error);
    }
    setIsDataLoading(false);
    router.push("/Jobsearch");
  }
  else{
    // notify
  }
}
catch(e){
    console.log(e)
}
  
 
}
    return (
         <>
         { isDataLoading?<DataLoader/>:<br/>}
          <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email"
                    value={email}
                  onChange={(e) => setEmail(e.target.value)}
                 required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                 required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" 
                 value={confirmPassword}
                onChange={(e) => setconfirmPassword(e.target.value)}
                required />
              </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="Name"> Name</Label>
                <Input id="Name" placeholder="Manas" 
                 value={name}
                onChange={(e) => setName(e.target.value)}
                required />
              </div>
              
            </div>
            
          
          
            <div className="space-y-2">
              <Label htmlFor="resume">Resume</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors" onClick={handleUploadClick}>
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">
                  <span className="font-medium text-blue-600 hover:underline cursor-pointer">Click to upload</span>
                 
                </p>
           
             
              </div>
                <input
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        ref={inputRef}
        onChange={handleFileSelect}
      />
           {resumeFile && (
          <p className="mt-2 text-sm text-green-600">
            Selected: <strong>{resumeFile.name}</strong>
          </p>
        )}
         <Button onClick={RegisterCandidate} type="submit" className="w-full">
                Create Account
              </Button>
            </div>
          </>
    )
}