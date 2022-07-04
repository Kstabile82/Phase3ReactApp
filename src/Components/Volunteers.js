import React, { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";

function Volunteers({ rescue, displayedVolunteers, setDisplayedVolunteers, assignNew }) {
    const [volunteer, setVolunteer] = useState({})
    const [add, setAdd] = useState(false)
    const [closedVol, setClosedVol] = useState(false)
    // const [displayedVolunteers, setDisplayedVolunteers] = useState([]) 
    const [displayedPVs, setDisplayedPVs] = useState([])
    const [checked, setChecked] = useState(false)
    const [volSubmitted, setVolSubmitted] = useState(false)
    let filterlocation;
    let filtertalent;
    const [filterLocation, setFilterLocation] = useState("All")
    const [filterTalent, setFilterTalent] = useState("All")
    let volMatchArray = []
    let locationMatches = [];
    let talentMatches;
    const [locations, setLocations] = useState(([...new Set(displayedVolunteers.map(dv => dv.location))]))
    const [talents, setTalents] = useState(([...new Set(displayedVolunteers.map(dv => dv.talents))]))

    console.log(talents)

   function handleClick(e) {
    e.preventDefault();
    displayedVolunteers.map(vol => {
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
         .then(newAdd => setDisplayedVolunteers([...displayedVolunteers, newAdd]));    
     }    

     function onDeleteVolunteer(id) {
        const updatedVolunteers = rescue.volunteers.filter((volunteer) => volunteer.id !== id);
        setDisplayedVolunteers(updatedVolunteers)
       }
       function handleFilterVolChange(e) {
        e.preventDefault();
        setDisplayedVolunteers(rescue.volunteers)
        if (e.target.name === "location") {
            filterlocation = e.target.value;
            setFilterLocation(filterlocation)
        }
        if (e.target.name === "talent") {
            filtertalent = e.target.value;
            setFilterTalent(filtertalent)
        }
    } 
    volMatchArray = rescue.volunteers;

    function handleSubmitVolFilter(e) {
        e.preventDefault(); 
        setVolSubmitted(true);
       if (filterLocation === undefined || filterLocation === "All") { 
            locationMatches = volMatchArray; 
        }
        else {
            locationMatches = volMatchArray.filter(v => v.location === filterLocation)  
        }
        if (filterTalent === undefined || filterTalent === "All") {
            talentMatches = locationMatches; 
        }
        else {
            talentMatches = locationMatches.filter(v => v.talents === filterTalent)
        }
        setDisplayedVolunteers(talentMatches)
    }

  function sortVols(e) {
    setChecked(!checked)
    if (e.target.checked === true) {
        displayedVolunteers.sort((a,b) => (a.project_volunteers.length > b.project_volunteers.length) ? -1 : 1)
    }
    else { 
        displayedVolunteers.sort((a,b) => (a.project_volunteers.length > b.project_volunteers.length) ? 1 : -1)
    }

}
return (
        <div>
            <h2>Volunteers</h2>
            <div className="filter"> 
            Filter by:
            <br></br>
            <label className="sortbybusiness"> Busiest (most to least) 
             <input id="sortBusiest" type="checkbox" onChange={sortVols} />
            </label>
            <form onSubmit={handleSubmitVolFilter}>
            <select name="location" onChange={handleFilterVolChange}>
                     <option value="" hidden>Location</option>
                     <option>All</option>
                     {locations.map(l => <option>{l}</option>)}
                </select>
                <select name="talent" onChange={handleFilterVolChange}>
                    <option value="" hidden>Talent</option>
                     <option>All</option>
                     {talents.map(t => <option>{t}</option>)}
                </select>
                <button>Submit</button>
            </form>
            </div>
                 {displayedVolunteers.map(v => <li key={v.id} onClick={handleClick}>{v.name}</li> )  }
            {volunteer.id === undefined || closedVol ? null : <VolunteerCard volunteer={volunteer} onDeleteVolunteer={onDeleteVolunteer} setVolunteer={setVolunteer} closedVol={closedVol} setClosedVol={setClosedVol} /> }            
            <button style={{display: assignNew === "Volunteer" ? 'none' : 'visible' }} onClick={handleAdd}>Add New Volunteer</button>
                { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"/>
                <input name="location" placeholder="Location"/>
                <input name="talents" placeholder="Talents"/>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Volunteers; 
