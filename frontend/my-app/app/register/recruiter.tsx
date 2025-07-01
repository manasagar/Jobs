
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState,useRef } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Plus, X } from "lucide-react"
import { registerUser,RegisterPayload} from "@/data/urlRecruiter"
export default function Recruiter(){
  const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword,setconfirmPassword]=useState("");
    const [company,setCompany]=useState("");
    const [experience,setExperiance]=useState("");
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
        linkdein:linkdeinProflie,
        name:name,
        email:email,
        password:password,
        role:"RECRUITER",
        currentPosition:currentPosition,
        yearsOfExperience:experience,
        specialisationAreas:skills,
        companyName:company
      }
      await registerUser(request);
    }
   
    return (<>
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
            <div className="space-y-2">
              <Label htmlFor="experience">Years of Experience</Label>
              <Select value={experience} onValueChange={setExperiance}>
                <SelectTrigger>
                  <SelectValue placeholder="Select experience range"  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3-5">3-5 years</SelectItem>
                  <SelectItem value="6-10">6-10 years</SelectItem>
                  <SelectItem value="11-15">11-15 years</SelectItem>
                  <SelectItem value="15+">15+ years</SelectItem>
                </SelectContent>
              </Select>
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
          </>
    )
}