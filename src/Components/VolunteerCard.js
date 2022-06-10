import React, { useState } from "react";

function VolunteerCard({ volunteer, setVolunteer, closedVol, setClosedVol, onDeleteVolunteer, rescue }) {
    const [updatedVolunteer, setUpdatedVolunteer] = useState({})
    const [submitted, setSubmitted] = useState(false)
    const [clickedUpdate, setClickedUpdate] = useState(false)
    let  volunteerUpdate = volunteer;

    function handleUpdateVolunteer(e){
        e.preventDefault();
        setClickedUpdate(true)
    }
    function handleDeleteVolunteer(e){
      e.preventDefault();
      fetch(`http://localhost:9292/volunteers/${volunteer.id}`, {
        method: "DELETE",
      })
          onDeleteVolunteer(volunteer.id);
    }
    
    function handleSubmitUpdateVolunteer(e){
       e.preventDefault();
       setClickedUpdate(false)
       fetch(`http://localhost:9292/volunteers/${volunteer.id}`, {
           method: "PATCH",
           headers: {
               "Content-Type": "application/json",
           },
           body: JSON.stringify({
              updatedVolunteer,
           }),
       })
       .then((r) => r.json())
       .then((patchedVolunteer) => setVolunteer(patchedVolunteer))
  }
    function handleEdit(e){
        e.preventDefault();
        if (e.target.name === "name") {
         volunteerUpdate.name = e.target.value;
        }
        if (e.target.name === "talents") {
         volunteerUpdate.talents = e.target.value;
        }
        if (e.target.name === "location") {
         volunteerUpdate.location = e.target.value;
        }
         setUpdatedVolunteer(volunteerUpdate);
    }
    function handleClose(e) {
        e.preventDefault(); 
        setClosedVol(true)
    }
return (
        <div className="volunteercard" style={{display: closedVol ? 'none' : 'visible' }}>
            <ul key={volunteer.id}>{volunteer.name}
                <div>{volunteer.location}</div>
                <div>{volunteer.talents}</div>
                <button key="update" onClick={handleUpdateVolunteer}>update</button>
                <button key="delete" onClick={handleDeleteVolunteer}>delete</button>
                <button onClick={handleClose}>close</button>
            </ul>
            { clickedUpdate ? <form onSubmit={handleSubmitUpdateVolunteer}>
                <input name="name" defaultValue={volunteer.name} onChange={handleEdit}/> 
                <input name="talents" defaultValue={volunteer.talents} onChange={handleEdit}/> 
                <input name="location" defaultValue={volunteer.location} onChange={handleEdit} />
                <button>Submit</button>
            </form>
            : null }
        </div>
 )
}
export default VolunteerCard; 
