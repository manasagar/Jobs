
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {  Upload } from "lucide-react"
import {RegisterPayload,registerUser,loginWelcome,uploadResume} from "@/data/urlJobseeker"
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import {Button} from "@/components/ui/button"
export default function Candidate(){
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword,setconfirmPassword]=useState("");
  const [phoneNo,setPhoneNo]=useState("");
  const [experience,setExperiance]=useState<string | undefined>(undefined);
  const [skills,setSkills]=useState<Array<string>|undefined>([]);
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
  console.log("what1")
  try{
  if(resumeFile){
  await registerUser(request,resumeFile)
  
  }
  else{
    // notify
  }
}
catch(e){
    console.log(e)
}
  
  router.push("/Jobsearch");
}
    return (
         <>
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
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+1 (555) 123-4567"
               value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
               />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select value={experience} onValueChange={setExperiance} >
                <SelectTrigger>
                  <SelectValue placeholder="Select experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                  <SelectItem value="mid">Mid Level (3-5 years)</SelectItem>
                  <SelectItem value="senior">Senior Level (6-10 years)</SelectItem>
                  <SelectItem value="lead">Lead/Principal (10+ years)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Key Skills</Label>
              <Textarea
                id="skills"
                placeholder="e.g., JavaScript, React, Node.js, Python..."
                className="min-h-[80px]"
                value={skills}
               
              />
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