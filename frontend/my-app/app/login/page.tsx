'use client'
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase } from "lucide-react"
import { useState } from "react"
import { loginUser,LoginPayload } from "@/data/common"
import { useRouter } from "next/navigation"
import { DataLoader } from "@/data/common"
import { checkRole } from "@/data/common"
export default   function  LoginPage()  {
  const router=useRouter();
    const [isDataLoading, setIsDataLoading] = useState(false);
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const onSubmit=async ()=>{
    const request : LoginPayload={
      email:email,
      password:password
    }
   
     try{
    setIsDataLoading(true);
    await loginUser(request);
    setIsDataLoading(false);
     }
     catch(error){
      console.log(error);
     }
    console.log("manas"+checkRole());
    if(checkRole()=='CANDIDATE')
      router.push('/Jobsearch');
    else
      router.push('/Jobmanagement');
  }
  return (
    <>
        {isDataLoading?<DataLoader/>:<br/>}
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600 rounded-full">
              <Briefcase className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your CareerHub account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required />
          </div>
          
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="submit" className="w-full" onClick={onSubmit}>
            Sign In
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
    </>
  )
}
