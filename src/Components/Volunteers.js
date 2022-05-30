import React, { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";

function Volunteers({ rescue }) {
    const [volunteer, setVolunteer] = useState({})
    const [add, setAdd] = useState(false)
    const [volunteers, setVolunteers] = useState([])
    const [closedVol, setClosedVol] = useState(false)


    const [checked, setChecked] = useState(false)
    const [volSubmitted, setVolSubmitted] = useState(false)
    let filterlocation;
    let filtertalent;
    const [filterLocation, setFilterLocation] = useState("")
    const [filterTalent, setFilterTalent] = useState("")
    let volMatchArray = []
    let locationMatches = [];
    let talentMatches;
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
     function onDeleteVolunteer(id) {
        const updatedVolunteers = volunteers.filter((volunteer) => volunteer.id !== id);
        setVolunteers(updatedVolunteers)
       }

       function handleFilterVolChange(e) {
        e.preventDefault();
        if (e.target.name === "location") {
            filterlocation = e.target.value;
            setFilterLocation(filterlocation)
        }
        if (e.target.name === "talent") {
            filtertalent = e.target.value;
            setFilterTalent(filtertalent)
        }
    } 
    volMatchArray = volunteers;

    function handleSubmitVolFilter(e) {
        e.preventDefault(); 
        setVolSubmitted(true);
       if (filterLocation === undefined) { 
            locationMatches = volMatchArray; 
        }
        else {
            locationMatches = volMatchArray.filter(v => v.location === filterLocation)  
        }
        if (filterTalent === undefined) {
            talentMatches = locationMatches; 
        }
        else {
            talentMatches = locationMatches.filter(v => v.talent === filterTalent)
        }
        setVolunteers(talentMatches)
    }
  function sortVols(e) {
    setChecked(!checked)
    if (e.target.checked === true) {
        volunteers.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
    }
    else { 
        volunteers.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
    }
}
return (
        <div>
          <p>All Volunteers</p>
            <div className="filter"> 
            Filter by:
            <br></br>
            <label className="sortbybusiness"> Projects (most to least) 
             <input id="sortBusiest" type="checkbox" onChange={sortVols} />
            </label>
            <br></br>
            <form onSubmit={handleSubmitVolFilter}>
            <select name="location" onChange={handleFilterVolChange}>
                     <option value="" hidden>Location</option>
                     <option>Long Island</option>
                     <option>Brooklyn</option>
                     <option>Queens</option>
                     <option>Manhattan</option>
                     <option>New Jersey</option>
                     <option>Bronx</option>
                     <option>Staten Island</option>
                     <option>Westchester</option>
                     <option>All</option>
                </select>
                <select name="talent" onChange={handleFilterVolChange}>
                    <option value="" hidden>Talent</option>
                     <option>Website</option>
                     <option>Social Media</option>
                     <option>Fundraising</option>
                     <option>Fostering</option>
                     <option>Rescuing</option>
                     <option>Event Management</option>
                     <option>Office Management</option>
                </select>
                <button>Submit</button>
            </form>
            </div>
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
                 {volunteer.id === undefined || closedVol ? null : <VolunteerCard volunteer={volunteer} setVolunteer={setVolunteer} setClosedVol={setClosedVol} closedVol={closedVol} rescue={rescue} onDeleteVolunteer={onDeleteVolunteer} /> }
        </div>
)
}
export default Volunteers; 
