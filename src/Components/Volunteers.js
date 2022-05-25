import React, { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";

function Volunteers({ rescue }) {
    const [volunteer, setVolunteer] = useState({})
    const [add, setAdd] = useState(false)
    const [volunteers, setVolunteers] = useState([])
    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/volunteers`)
        .then((r) => r.json())
        .then((rescueVolunteers) => setVolunteers(rescueVolunteers));
    }, []);
   function handleClick(e){
       e.preventDefault(); 
       volunteers.map(v => {
           if (v.name === e.target.innerText) {
               setVolunteer(v);
           }
       })
   }
   function handleAdd(e) {
    e.preventDefault();
    setAdd(true);
}
function handleSubmit(e) {
    e.preventDefault();
    let name = e.target.firstChild.value;
    let location = e.target.firstChild.nextSibling.value;
   fetch(`http://localhost:9292/rescue/rescue${rescue.id}/volunteers`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify ({
         name,
         location,
         rescue_id: rescue.id 
     }),
     })
     .then((r) => r.json())
     .then(newAddition => setVolunteers([...volunteers, newAddition]));
}
return (
        <div>
            <p>Current Volunteers</p>
            {volunteers.map(v => <li key={v.id} onClick={handleClick}>{v.name} </li>)}
            {volunteer.id === undefined ? null : <VolunteerCard volunteer={volunteer} rescue={rescue}/> }
            <button onClick={handleAdd}>Add New Volunteer</button>
            { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"/>
                <input name="location" placeholder="Location"/>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Volunteers; 
