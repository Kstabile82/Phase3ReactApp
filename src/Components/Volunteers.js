import React, { useState } from "react";
import VolunteerCard from "./VolunteerCard";

function Volunteers({ rescue }) {
    const [volunteer, setVolunteer] = useState({})
    const [add, setAdd] = useState(false)
    const [newVolunteer, setNewVolunteer] = useState({})
    //option to filter by location and projects busiest to least

   function handleClick(e){
       e.preventDefault(); 
       rescue.volunteers.map(v => {
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
    let newName = e.target.firstChild.value;
    let newLocation = e.target.firstChild.nextSibling.value;
   setNewVolunteer({name: newName, location: newLocation}) 
   //post request
}
return (
        <div>
            <p>Current Volunteers</p>
            {rescue.volunteers.map(v => <li key={v.id} onClick={handleClick}>{v.name} </li>)}
            {volunteer.id === undefined ? null : <VolunteerCard volunteer={volunteer} setVolunteer rescue={rescue}/> }
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
