import React, { useEffect, useState } from "react";
import './App.css';
import Rescue from './Components/Rescue' 
import image from './AnimalRescue.jpg'

function App() {
 const [rescues, setRescues] = useState([])
 const [rescue, setRescue] = useState("")
 const [loggedOut, setLoggedOut] = useState(true);
 const [inputID, setInputID] = useState(0);
 const [add, setAdd] = useState(false)
 const [name, setName] = useState("");
 const [location, setLocation] = useState("")
 const [submitted, setSubmitted] = useState(false)
 const [newRescue, setNewRescue] = useState({})

   useEffect(() => {
     fetch("http://localhost:9292/rescues")
      .then((r) => r.json())
      .then((rescuelist) => setRescues(rescuelist));
   }, []);
function handleLogIn(e) {
  e.preventDefault();
  setInputID(e.target.firstChild.nextSibling.value)
  rescues.map(r => {
    if (r.id === parseInt(inputID)) {
      setRescue(r)
      setLoggedOut(false)
    }
  })
}
function handleShowAddForm(e) {
  e.preventDefault();
  setAdd(true);
}
function handleSubmit(e) {
  e.preventDefault();
  fetch("http://localhost:9292/rescues", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify ({
      name,
      location, 
  }),
})
    .then((r) => r.json())
    .then((newAddition) => {
      setRescues([...rescues, newAddition])
      setRescue(newAddition)
      setSubmitted(true)
    })
}
function onDeleteRescue(id) {
  const updatedRescues = rescues.filter((rescue) => rescue.id !== id);
  setRescues(updatedRescues)
 }
   return (
    <div>
      <img className="pic" src={image} height={300} width={1200}></img>
      {!rescue && loggedOut ? 
      <div>
        <form className="login" onSubmit={handleLogIn} > 
                Rescue ID:  
                <input 
                type="text" 
                id="inputname" 
                placeholder="Enter Rescue ID"
                onChange={(e) => setInputID(e.target.value)}></input>  
                <button>Enter</button>
            </form> 
            <button onClick={handleShowAddForm}>Add New Rescue</button>
            </div>
            : 
            <div>
            <Rescue rescue={rescue} setRescue={setRescue} setLoggedOut={setLoggedOut} onDeleteRescue={onDeleteRescue}/> 
             </div> } 
            { add && submitted === false ? <form onSubmit={handleSubmit} style={{display: loggedOut ? 'visible' : 'none' }}>
                <input 
                name="name" 
                placeholder="Name" 
                autoComplete="off" 
                value={name} 
                onChange={(e) => setName(e.target.value)}/>
                <input 
                name="location" 
                placeholder="Location" 
                autoComplete="off" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)}/>
                <button>Submit</button>
            </form> : null }
     
    </div>
   );
}

export default App;
