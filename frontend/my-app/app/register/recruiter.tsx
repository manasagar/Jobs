
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { registerUser,RegisterPayload} from "@/data/urlRecruiter"
import { DataLoader } from "@/data/common"
export default function Recruiter(){
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const [company,setCompany]=useState("");
    const [skills,setSkills]=useState<string[]>([]);
    const [currentPosition, setCurrentPosition] = useState("");
    const [skill,setSkill]=useState("");
   const [linkdeinProflie,setLinkdeinProfile]=useState("");
    const router=useRouter()
    function addSkill(){
    if (skill&& skill.trim() && !skills.includes(skill.trim())) {
      setSkills([...skills, skill.trim()])
      setSkill("")
    }
  }
    const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove))
  }
    const registerRecruiter=async ()=>{
      const request:RegisterPayload={
        linkedein:linkdeinProflie,
        name:name,
        email:email,
        password:password,
        role:"RECRUITER",
        currentPosition:currentPosition,
        skills:skills,
        companyName:company
      }
      setIsDataLoading(true);
      try{
      await registerUser(request);
      }
      catch(error){
        console.log(error);
      }
      setIsDataLoading(false);
      router.push("/Jobmanagement");
    }
   
    return (<>
     { isDataLoading?<DataLoader/>:<div>
     <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter your email" required value={email} onChange={(e)=>{setEmail(e.target.value)}} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a strong password" required value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" required value={confirmPassword} onChange={(e)=>{setconfirmPassword(e.target.value)}} />
              </div>
        <div className="grid  gap-4">
           
                <Label htmlFor="firstName"> Name</Label>
                <Input id="firstName" placeholder="Jane" required value={name} onChange={(e)=>{setName(e.target.value)}}/>
  
          </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" placeholder="Tech Corp Inc." required value={company} onChange={(e)=>{setCompany(e.target.value)}} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="position">Current Position</Label>
              <Input id="position" placeholder="Senior Software Engineer" required value={currentPosition} onChange={(e)=>{setCurrentPosition(e.target.value)}}/>
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
              <Label htmlFor="linkedin">LinkedIn Profile</Label>
              <Input id="linkedin" placeholder="https://linkedin.com/in/yourprofile" value={linkdeinProflie} onChange={(e)=>{setLinkdeinProfile(e.target.value)}}/>
            </div>
              <Button type="submit" className="w-full" onClick={registerRecruiter}>
                Create Account
              </Button>
     </div>}
          </>
    )
}