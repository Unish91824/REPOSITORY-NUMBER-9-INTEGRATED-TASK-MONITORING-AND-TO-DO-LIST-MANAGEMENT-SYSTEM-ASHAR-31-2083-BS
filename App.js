import React, { useState } from "react";
import "./App.css";

/* LOGIN */

const EMAIL = "gautam.unish007@gmail.com";
const PASSWORD = "@Everest123";

/* WINDOWS */

const windows = [
"Dashboard",
"Incoming Works",
"Sorted Works",
"Work In Progress Details",
"Completed But Not Submitted",
"Outgoing And Submitted Works",
"Returned Works",
"Works In Redo",
"Remaining Works",
"Completed Works",
"History"
];

export default function App(){

/* LOGIN */

const [loggedIn,setLoggedIn] = useState(false);
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

/* WINDOWS */

const [activeWindow,setActiveWindow] = useState("Dashboard");

/* DATA STATES */

const [incoming,setIncoming] = useState([]);
const [sorted,setSorted] = useState([]);
const [progress,setProgress] = useState([]);
const [completedNotSubmitted,setCompletedNotSubmitted] = useState([]);
const [submitted,setSubmitted] = useState([]);
const [returned,setReturned] = useState([]);
const [redo,setRedo] = useState([]);
const [remaining,setRemaining] = useState([]);
const [completedWorks,setCompletedWorks] = useState([]);
const [history,setHistory] = useState([]);

/* FORM DATA */

const [form,setForm] = useState({
title:"",
classification:"",
chapter:"",
priority:"Low",
givenBy:"",
assigned:"",
deadline:"",
recorded:""
});

/* LOGIN */

const handleLogin=()=>{

if(email===EMAIL && password===PASSWORD){
setLoggedIn(true);
}else{
alert("Invalid Login");
}

};

/* PID GENERATOR */

const generatePID=()=>{
return "PID-"+Math.floor(Math.random()*1000000);
};

/* ADD INCOMING WORK */

const addIncoming=()=>{

if(!form.title) return;

const newTask={
id:Date.now(),
pid:generatePID(),
...form,
started:"",
completed:"",
filePath:"",
sampleWork:"",
sampleWorkPath:"",
submittedTo:"",
submittedDate:"",
returnedDate:"",
remarks:"",
status:"Incoming"
};

setIncoming([...incoming,newTask]);

setHistory([...history,{action:"Incoming Work Added",title:newTask.title}]);

setForm({
title:"",
classification:"",
chapter:"",
priority:"Low",
givenBy:"",
assigned:"",
deadline:"",
recorded:""
});

};

/* MOVE TO SORTED */

const moveToSorted=(task)=>{

setSorted([...sorted,task]);

setIncoming(incoming.filter(t=>t.id!==task.id));

};

/* START WORK */

const startWork=(task)=>{

if(progress.length>=1){
alert("Only one work can be processed at a time");
return;
}

setProgress([{...task,status:"Started"}]);

setSorted(sorted.filter(t=>t.id!==task.id));

};

/* UPDATE PROGRESS */

const updateProgress=(task,status)=>{

if(status==="Completed"){

setCompletedNotSubmitted([...completedNotSubmitted,{
...task,
status:"Submitted"
}]);

setProgress([]);

}else{

setProgress([{...task,status}]);

}

};

/* SUBMIT WORK */

const submitWork=(task)=>{

const date=prompt("Enter Submission Date Time Location");

setSubmitted([...submitted,{...task,submittedDate:date}]);

setCompletedNotSubmitted(completedNotSubmitted.filter(t=>t.id!==task.id));

};

/* CHECK RETURN */

const markChecked=(task)=>{

const returnedDate=prompt("Enter Returned Date Time Location");

setReturned([...returned,{...task,returnedDate}]);

};

/* REDO */

const redoWork=(task)=>{

setRedo([...redo,task]);

setIncoming([...incoming,task]);

};

/* COMPLETE FINAL */

const completeFinal=(task)=>{

setCompletedWorks([...completedWorks,task]);

};

/* DASHBOARD */

const dashboardData={
incoming:incoming.length,
sorted:sorted.length,
progress:progress.length,
submitted:submitted.length,
redo:redo.length
};

/* LOGIN PAGE */

if(!loggedIn){

return(

<div className="login">

<h1>Work Management System</h1>

<input
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
/>

<button onClick={handleLogin}>Login</button>

</div>

);

}

/* MAIN APP */

return(

<div className="app">

<div className="sidebar">

<h2>Task Manager</h2>

{windows.map(w=>(
<button
key={w}
className={activeWindow===w?"active":""}
onClick={()=>setActiveWindow(w)}
>
{w}
</button>
))}

</div>

<div className="main">

<h1>{activeWindow}</h1>

{/* DASHBOARD */}

{activeWindow==="Dashboard" && (

<div className="dashboard">

<div className="card">Incoming {dashboardData.incoming}</div>
<div className="card">Sorted {dashboardData.sorted}</div>
<div className="card">Progress {dashboardData.progress}</div>
<div className="card">Submitted {dashboardData.submitted}</div>
<div className="card">Redo {dashboardData.redo}</div>

</div>

)}

{/* INCOMING */}

{activeWindow==="Incoming Works" && (

<div>

<div className="form">

<input placeholder="Title"
value={form.title}
onChange={(e)=>setForm({...form,title:e.target.value})}
/>

<input placeholder="Classification"
value={form.classification}
onChange={(e)=>setForm({...form,classification:e.target.value})}
/>

<input placeholder="Chapter"
value={form.chapter}
onChange={(e)=>setForm({...form,chapter:e.target.value})}
/>

<input placeholder="Given By"
value={form.givenBy}
onChange={(e)=>setForm({...form,givenBy:e.target.value})}
/>

<select
value={form.priority}
onChange={(e)=>setForm({...form,priority:e.target.value})}
>
<option>Low</option>
<option>Mid</option>
<option>High</option>
</select>

<input placeholder="Assigned Date Time Location"
value={form.assigned}
onChange={(e)=>setForm({...form,assigned:e.target.value})}
/>

<input type="date"
value={form.deadline}
onChange={(e)=>setForm({...form,deadline:e.target.value})}
/>

<input placeholder="Recorded Date Time Location"
value={form.recorded}
onChange={(e)=>setForm({...form,recorded:e.target.value})}
/>

<button onClick={addIncoming}>Add Work</button>

</div>

<table>

<thead>
<tr>
<th>SN</th>
<th>Title</th>
<th>Classification</th>
<th>Chapter</th>
<th>Priority</th>
<th>Assigned</th>
<th>Deadline</th>
<th>Recorded</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{incoming.map((t,i)=>(
<tr key={t.id}>
<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.classification}</td>
<td>{t.chapter}</td>
<td>{t.priority}</td>
<td>{t.assigned}</td>
<td>{t.deadline}</td>
<td>{t.recorded}</td>

<td>

<button onClick={()=>moveToSorted(t)}>Start</button>

<button onClick={()=>setIncoming(incoming.filter(x=>x.id!==t.id))}>
Delete
</button>

</td>

</tr>
))}

</tbody>

</table>

</div>

)}

{/* SORTED */}

{activeWindow==="Sorted Works" && (

<table>

<thead>

<tr>
<th>SN</th>
<th>Title</th>
<th>PID</th>
<th>Classification</th>
<th>Chapter</th>
<th>Priority</th>
<th>Assigned</th>
<th>Deadline</th>
<th>Recorded</th>
<th>Action</th>
</tr>

</thead>

<tbody>

{sorted.map((t,i)=>(
<tr key={t.id}>
<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.classification}</td>
<td>{t.chapter}</td>
<td>{t.priority}</td>
<td>{t.assigned}</td>
<td>{t.deadline}</td>
<td>{t.recorded}</td>

<td>
<button onClick={()=>startWork(t)}>Start Work</button>
</td>

</tr>
))}

</tbody>

</table>

)}

{/* WORK IN PROGRESS */}

{activeWindow==="Work In Progress Details" && (

<table>

<thead>
<tr>
<th>Title</th>
<th>PID</th>
<th>Priority</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{progress.map((t,i)=>(
<tr key={t.id}>

<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.priority}</td>
<td>{t.status}</td>

<td>

<button onClick={()=>updateProgress(t,"Started")}>
Started
</button>

<button onClick={()=>updateProgress(t,"Partially Completed")}>
Partial
</button>

<button onClick={()=>updateProgress(t,"Ready For Submission")}>
Ready
</button>

<button onClick={()=>updateProgress(t,"Completed")}>
Completed
</button>

</td>

</tr>
))}

</tbody>

</table>

)}

{/* COMPLETED BUT NOT SUBMITTED */}

{activeWindow==="Completed But Not Submitted" && (

<table>

<thead>
<tr>
<th>SN</th>
<th>Title</th>
<th>PID</th>
<th>Deadline</th>
<th>Submit</th>
</tr>
</thead>

<tbody>

{completedNotSubmitted.map((t,i)=>(
<tr key={t.id}>
<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.deadline}</td>

<td>
<button onClick={()=>submitWork(t)}>Submit</button>
</td>

</tr>
))}

</tbody>

</table>

)}

{/* SUBMITTED */}

{activeWindow==="Outgoing And Submitted Works" && (

<table>

<thead>
<tr>
<th>SN</th>
<th>Title</th>
<th>PID</th>
<th>Submitted Date</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{submitted.map((t,i)=>(
<tr key={t.id}>

<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.submittedDate}</td>

<td>
<button onClick={()=>markChecked(t)}>Checked</button>
</td>

</tr>
))}

</tbody>

</table>

)}

{/* RETURNED */}

{activeWindow==="Returned Works" && (

<table>

<thead>
<tr>
<th>SN</th>
<th>Title</th>
<th>PID</th>
<th>Returned Date</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{returned.map((t,i)=>(
<tr key={t.id}>

<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.returnedDate}</td>

<td>

<button onClick={()=>redoWork(t)}>Redo</button>

<button onClick={()=>completeFinal(t)}>
Completed Works
</button>

</td>

</tr>
))}

</tbody>

</table>

)}

{/* COMPLETED WORKS */}

{activeWindow==="Completed Works" && (

<table>

<thead>
<tr>
<th>SN</th>
<th>Title</th>
<th>PID</th>
<th>Deadline</th>
<th>Returned Date</th>
</tr>
</thead>

<tbody>

{completedWorks.map((t,i)=>(
<tr key={t.id}>

<td>{i+1}</td>
<td>{t.title}</td>
<td>{t.pid}</td>
<td>{t.deadline}</td>
<td>{t.returnedDate}</td>

</tr>
))}

</tbody>

</table>

)}

</div>

</div>

);

}