import React, { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";

function Volunteers({ rescue }) {
    const [volunteer, setVolunteer] = useState({})
    const [add, setAdd] = useState(false)
    const [volunteers, setVolunteers] = useState([])
    const [closedVol, setClosedVol] = useState(false)
    const [newVolunteer, setNewVolunteer] = useState({})
useEffect(() => {
  fetch(`http://localhost:9292/rescues/${rescue.id}/volunteers`)
  .then((r) => r.json())
  .then((rescueVolunteers) => setVolunteers(rescueVolunteers));
}, []);   
   function handleClick(e) {
            e.preventDefault();
            volunteers.map(vol => {
                if (vol.name === e.target.innerText) {
                    setVolunteer(vol);
                    setClosedVol(false);
                }
            })
   }
   console.log(closedVol)
    function handleAdd(e) {
        e.preventDefault();
        setAdd(true);
    }

    function handleSubmit(e) {
        e.preventDefault();
        let name = e.target.firstChild.value;
        let location = e.target.firstChild.nextSibling.value;
        let talents = e.target.firstChild.nextSibling.nextSibling.value;
        fetch(`http://localhost:9292/volunteers`, {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify ({
             name,
             location, 
             talents,
             rescue_id: rescue.id, 
             project_volunteers: []
         }),
         })
         .then((r) => r.json())
         .then(newAdd => setVolunteers([...volunteers, newAdd]));    
     }    

return (
        <div>
           <br></br>
                <button onClick={handleAdd}>Add New Volunteer</button>
                { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"/>
                <input name="location" placeholder="Location"/>
                <input name="talents" placeholder="Talents"/>
                <button>Submit</button>
            </form> : null }
            <p>All Volunteers</p>
                  {volunteers.map(v => 
                    <li key={v.id} onClick={handleClick}>{v.name}
                    </li>
                  )}
                 {volunteer.id === undefined || closedVol ? null : <VolunteerCard volunteer={volunteer} setVolunteer={setVolunteer} setClosedVol={setClosedVol} closedVol={closedVol} rescue={rescue} /> }
        </div>
)
}
export default Volunteers; 
