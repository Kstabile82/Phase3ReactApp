import React, { useState } from "react";

function VolunteerCard({ volunteer, setVolunteer, rescue }) {
    let proj = volunteer.project_volunteers
    const [updatedVolunteer, setUpdatedVolunteer] = useState({})
    const [clicked, setClicked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    let newName = "";
    let newLocation = "";
    let  volunteerUpdate = {name: volunteer.name, location: volunteer.location}

    function handleUpdate(e) {
        setClicked(true)
    }
    function handleDelete(e){
        e.preventDefault();
          let id = e.target.parentElement.id
          //delete request to animal/id
       }
       function handleSubmitUpdate(e){
        e.preventDefault();
        if (newName !== "") {
            volunteerUpdate.name = newName
        }
        else {
            volunteerUpdate.name = volunteer.name
        }
        if (newLocation !== "") {
           volunteerUpdate.location = newLocation;
        }
        else {
         volunteerUpdate.location = volunteer.location;
       }
       setUpdatedVolunteer(volunteerUpdate);
       setClicked(false)
       fetch(`http://localhost:9292/rescue/${rescue.id}/volunteers/${volunteer.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedVolunteer)
      })
        .then((r) => r.json())
        .then((updatedVolunteer) => setVolunteer(updatedVolunteer));
         setSubmitted(true)
     }
console.log(volunteer)
function handleEdit(e){
    e.preventDefault();
 
    if (e.target.name === "name") {
        newName = e.target.value;
    }
    if (e.target.name === "location") {
        newLocation = e.target.value;
    }
 }
return (
        <div>
            <ul key={volunteer.id}>{volunteer.name}
                <li>{volunteer.location}</li>
                <button key="update" onClick={handleUpdate}>update</button>
                <button key="delete" onClick={handleDelete}>delete</button>
            </ul>
            { clicked ? <form onSubmit={handleSubmitUpdate}>
            <input name="name" defaultValue={volunteer.name} onChange={handleEdit}/> 
            <input name="location" defaultValue={volunteer.location} onChange={handleEdit}/> 
            <button>Submit</button>
        </form>
        : null }
        </div>
 )
}
export default VolunteerCard; 
