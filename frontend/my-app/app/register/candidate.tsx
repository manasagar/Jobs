
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {  Upload } from "lucide-react"
import {RegisterPayload,registerUser,loginWelcome,uploadResume} from "@/data/urlJobseeker"
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"
import { DataLoader } from "@/data/common"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
export default function Candidate(){
      const [skills,setSkills]=useState<string[]>([]);
        const [skill,setSkill]=useState("");

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
   function addSkill(){
    if (skill&& skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()])
      setSkill("")
    }
  }
    const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }
const RegisterCandidate= async ()=>{
 

  const request:RegisterPayload={
    name:name,
    email:email,
    password:password,
    role:"CANDIDATE",
    skills:skills
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
            
            <div className="grid gap-3">
              <Label htmlFor="username-3">Skills</Label>
                    <div className="flex gap-2">
                        <Input placeholder="Enter a skill..." value={skill} onChange={(e) => setSkill(e.target.value)} className="flex-1"/>
                        <Button onClick={addSkill} size="icon" variant="outline">
                        <Plus className="h-4 w-4" />
                        </Button>
                    </div>
                   <div className="flex flex-wrap gap-2">
                     {skills.map((skill) => (
            <Badge
              key={skill}
              variant="secondary"
              className="px-3 py-1 text-sm flex items-center gap-2 hover:bg-secondary/80 transition-colors"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
            ))}
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