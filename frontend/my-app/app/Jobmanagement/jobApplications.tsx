
import { useState } from "react";

import { ArrowLeft } from 'lucide-react';
import ApplicationList from "./applicationList"
import MeetingList from "./meeting"
import AImode from "./AImode";
export default function JobApplications({application,changeApplication}:{application:number,changeApplication : (id:any) => void}){
const [activeTab, setActiveTab] = useState('application');
 
  return(
    <>

    <div className="w-full">
     
    <button onClick={()=>{changeApplication(-1)}}><ArrowLeft/></button>
     <div className="flex space-x-4 border-b">
        <button
          className={`px-4 py-2 ${activeTab === 'application' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('application')}
        >
         Application
        </button>
        <button
          className={`px-4 py-2 ${activeTab === 'meetings' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('meetings')}
        >
          Meetings
        </button>
         <button
          className={`px-4 py-2 ${activeTab === 'aimode' ? 'border-b-2 border-blue-500 font-semibold' : 'text-gray-500'}`}
          onClick={() => setActiveTab('aimode')}
        >
          AImode
        </button>
      </div>
      <div className="mt-4">
       {'application'===activeTab&&<ApplicationList jobId={application} />}
       {'meetings'===activeTab&&<MeetingList  jobId={application}/>}
       {'aimode'===activeTab&&<AImode jobId={application}/>}
        {/* {activeTab === 'application'?<ApplicationList jobId={application} isActive={'application'===activeTab}/>:<MeetingList jobId={application} isActive={'meetings'===activeTab}/>} */}
      </div>

      
    </div>
    </>
    
  )
}