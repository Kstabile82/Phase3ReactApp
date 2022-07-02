
import React, { useEffect, useState } from "react";

function ProjectCard({ projCard, setProjCard, setClosed, closed, rescue, onDeleteProject, displayedVolunteers }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    const [assignNew, setAssignNew] = useState("")
    const [assignNewAnimal, setAssignNewAnimal] = useState("")
    const [displayedAddVols, setDisplayedAddVols] = useState([])
    const [displayedAddAnimals, setDisplayedAddAnimals] = useState([])
    const [projVols, setProjVols] = useState(projCard.volunteers)
    const [projAnimals, setProjAnimals] = useState(projCard.animals)

let projectUpdate = projCard;
let pvs = projCard.project_volunteers
let pas = projCard.project_animals
let displayedPVsToAddArr = []
let displayedPAsToAddArr = []

let volIdArr = [];
projVols.map(p => {
    volIdArr.push(p.id)
})
let animalIdArr = [];
projAnimals.map(p => {
    animalIdArr.push(p.id)
})

function handleUpdateProject(e){
   e.preventDefault();
   setClickedUpdate(true)
}

function handleDeleteProject(e){
 e.preventDefault();
    fetch(`http://localhost:9292/projects/${projCard.id}`, {
      method: "DELETE",
    })
        onDeleteProject(projCard.id);
}
function handleEdit(e){
   e.preventDefault();
   if (e.target.name === "title") {
    projectUpdate.title = e.target.value;
   }
   if (e.target.name === "type") {
    projectUpdate.proj_type = e.target.value;
   }
    setUpdatedProject(projectUpdate);
}
 function handleClose(e) {
     e.preventDefault(); 
     setClosed(true)
     setAssignNew("")
     setAssignNewAnimal("")
     setProjCard("")
 }
 function handleDeletePV(e, pv) {
     e.preventDefault();
     let pvToDelete = pvs.find(p => p.volunteer_id === pv.id) 
    let volToDelete = projVols.find(projV => projV.id === pvToDelete.volunteer_id)
        fetch(`http://localhost:9292/project_volunteers/${pvToDelete.id}`, {
        method: "DELETE",
     })
     .then((r) => r.json())
     .then(() => {
         setProjVols(projCard.volunteers.filter(pv => pv.id !== pvToDelete.volunteer_id))
         setDisplayedAddVols([...displayedAddVols, volToDelete])
     })
}
function handleDeletePA(e, pa) {
    e.preventDefault();
    let paToDelete = pas.find(p => p.animal_id === pa.id) 
    let animalToDelete = projAnimals.find(projA => projA.id === paToDelete.animal_id)
       fetch(`http://localhost:9292/project_animals/${paToDelete.id}`, {
       method: "DELETE",
    })
    .then((r) => r.json())
    .then(() => {
        setProjAnimals(projCard.animals.filter(pa => pa.id !== paToDelete.animal_id))
        setDisplayedAddAnimals([...displayedAddAnimals, animalToDelete])
    })
}

function handleAssignAnimal(e) {
    e.preventDefault();
    setAssignNewAnimal("Animal")
    rescue.animals.map(anim => {
        if (!animalIdArr.includes(anim.id)) {
            displayedPAsToAddArr.push(anim)
        }
    })
    setDisplayedAddAnimals(displayedPAsToAddArr) 
}

function handleAssignVolunteer(e) {
    e.preventDefault();
    setAssignNew("Volunteer")
    displayedVolunteers.map(vol => {
        if (!volIdArr.includes(vol.id)) {
            displayedPVsToAddArr.push(vol)
        }
    })
    setDisplayedAddVols(displayedPVsToAddArr) 
}

function handleAddVolToProject(e, displayedV) {
    e.preventDefault();
    let volunteer_id = displayedV.id
    let project_id = projCard.id

    if (projVols.length === 0 || !volIdArr.includes(volunteer_id)) {
        fetch(`http://localhost:9292/project_volunteers`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                volunteer_id,
                project_id    
                }),
            })
            .then((r) => r.json())
            .then((newAdd) => { 
            newAdd = displayedVolunteers.find(v => v.id === volunteer_id)
            setProjVols([...projVols, newAdd])
            setDisplayedAddVols(displayedAddVols.filter(dpv => dpv.id !== volunteer_id))
            })
        }
 }
 function handleAddAnimalToProject(e, displayedA) {
    e.preventDefault();
    let animal_id = displayedA.id
    let project_id = projCard.id
    if (projAnimals.length === 0 || !animalIdArr.includes(animal_id)) {
        fetch(`http://localhost:9292/project_animals`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify ({
                animal_id,
                project_id    
                }),
            })
            .then((r) => r.json())
            .then((newAdd) => { 
            newAdd = rescue.animals.find(a => a.id === animal_id)
            setProjAnimals([...projAnimals, newAdd])
            setDisplayedAddAnimals(displayedAddAnimals.filter(daa => daa.id !== animal_id))
            })
        }
 }

return (
        <div className="projectcard" style={{display: closed === true ? 'none' : 'visible' }}>
            <div key={projCard.id}>Title: {projCard.title}
            { clickedUpdate ? <input name="title" defaultValue={projCard.title} onChange={handleEdit}/> : null}
                <div>Type: {projCard.proj_type}</div>
            { clickedUpdate ? <input name="type" defaultValue={projCard.proj_type} onChange={handleEdit}/> : null }
                <div></div>
                <div>Project Animals: 
                {projAnimals ? projAnimals.map(pa => <div><li>{pa.name}</li>{clickedUpdate ? <button onClick={e => handleDeletePA(e, pa)}>-</button> : null} </div> ) : null}
                </div>
                <div>Project Volunteers:
                {projVols ? projVols.map(pv => <div><li>{pv.name}</li>{clickedUpdate ? <button onClick={e => handleDeletePV(e, pv)}>-</button> : null} </div> ) : null}
                 </div>
                </div> {clickedUpdate ? <div><button onClick={handleAssignVolunteer}>Assign New Volunteer</button><button onClick={handleAssignAnimal}>Assign New Animal</button></div> : null}
                {assignNew === "Volunteer" && displayedAddVols.length > 0 ? displayedAddVols.map(displayedV => <div> <li>{displayedV.name}</li> <button onClick={e => handleAddVolToProject(e, displayedV)}>+</button></div> ) : null}
                {assignNewAnimal === "Animal" && displayedAddAnimals.length > 0 ? displayedAddAnimals.map(displayedA => <div> <li>{displayedA.name}</li> <button onClick={e => handleAddAnimalToProject(e, displayedA)}>+</button></div> ) : null}
                {assignNew == "Volunteer" && displayedAddVols.length === 0 ? <p>No more volunteers to add</p> : null }
                {assignNewAnimal == "Animal" && displayedAddAnimals.length === 0 ? <p>No more animals to add</p> : null }
                {!clickedUpdate ? <button key="update" onClick={handleUpdateProject}>Update</button> : null}
                <button key="delete" onClick={handleDeleteProject}>Delete Project</button>
                 <button onClick={handleClose}>Close</button>
            </div>
)
}
export default ProjectCard; 

