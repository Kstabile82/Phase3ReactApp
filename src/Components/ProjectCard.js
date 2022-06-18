
import React, { useEffect, useState } from "react";
import VolunteerCard from "./VolunteerCard";
import AnimalCard from "./AnimalCard";
import Animals from "./Animals";
import Volunteers from "./Volunteers";
import ProjectAssigner from "./ProjectAssigner";

function ProjectCard({ project, setProject, setClosed, closed, rescue, onDeleteProject }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    const [projVolunteers, setProjVolunteers] = useState(project.volunteers)
    const [projAnimals, setProjAnimals] = useState(project.project_animals);
    const [assignNew, setAssignNew] = useState("")
    const [deleteP, setDeleteP] = useState({})
    const [pvs, setPvs] = useState(project.project_volunteers)
    let projectUpdate = project;
    let volArr; 
    let animalArr;

function handleUpdateProject(e){
   e.preventDefault();
   setClickedUpdate(true)
}
volArr = projVolunteers.map(pv => {
    rescue.volunteers.filter(v => v.id === pv.volunteer_id)
})

animalArr = projAnimals.map(pa => {
    rescue.animals.filter(a => a.id === pa.animal_id)
})
function handleDeleteProject(e){
 e.preventDefault();
    fetch(`http://localhost:9292/projects/${project.id}`, {
      method: "DELETE",
    })
        onDeleteProject(project.id);
}
function handleSubmitUpdateProject(e){
  e.preventDefault();
  setClickedUpdate(false)
  fetch(`http://localhost:9292/projects/${project.id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify({
         updatedProject,
      }),
  })
  .then((r) => r.json())
  .then((patchedProject) => setProject(patchedProject))
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
 }
 function handleDeletePV(e, pv) {
     e.preventDefault();
     let pvToDelete = pvs.find(p => p.volunteer_id === pv.id) 
    //  setDeleteP(pvToDelete);
        fetch(`http://localhost:9292/project_volunteers/${pvToDelete.id}`, {
        method: "DELETE",
     })
    //  onDeletePv(pvToDelete.id) 
}

// function onDeletePv(id) {
//     const updatedPVs = project.project_volunteers.filter(p => p.id !== id);
//         setProjVolunteers(updatedPVs); 
//         // setDeleteP({})
// }
function handleAssignAnimal(e) {
    e.preventDefault();
    setAssignNew("Animal")
}
function handleAssignVolunteer(e) {
    e.preventDefault();
    setAssignNew("Volunteer")
}
function handleSubmitUpdatedProj(e){
    e.preventDefault();
}
return (
        <div className="projectcard" style={{display: closed === true ? 'none' : 'visible' }}>
            <div key={project.id}>Title:{project.title}
            { clickedUpdate ? <input name="title" defaultValue={project.title} onChange={handleEdit}/> : null}
                <div>Type: {project.proj_type}</div>
            { clickedUpdate ? <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> : null }
                <div></div>
                <div>Created: {project.created_at}</div>
                <div>Updated: {project.updated_at}</div>
                <div>Project Animals: {projAnimals.map(pa => pa.project_id === project.id ? rescue.animals.map(ra => ra.id === pa.animal_id ? <div><li>{ra.name}</li> {clickedUpdate ? <button>-</button> : null} </div>: null) : null)}
                </div> {clickedUpdate ? <button onClick={handleAssignAnimal}>Assign New</button> : null}
                {assignNew === "Animal" ? <Animals rescue={rescue} assignNew={assignNew} setAssignNew={setAssignNew} project={project}/> : null}
                <div>Project Volunteers: {projVolunteers.map(pv => <div><li>{pv.name}</li> {clickedUpdate ? <button onClick={e => handleDeletePV(e, pv)}>-</button> : null}  

                {/* {deleteP === true ? <ProjectAssigner deleteP={deleteP} setDeleteP={setDeleteP} pv={pv} project={project} /> : null} */}
                </div>)} 
                </div> {clickedUpdate ? <button onClick={handleAssignVolunteer}>Assign New</button> : null}
                {/* </div> {clickedUpdate ? <button onClick={handleAssignVolunteer}>Assign New</button> : null} */}
                {assignNew === "Volunteer" ? <Volunteers rescue={rescue} assignNew={assignNew} setAssignNew={setAssignNew} project={project} setProject={setProject} projVolunteers={projVolunteers} setProjVolunteers={setProjVolunteers}/> : null}
                {/* <div>Project Volunteers: {projVolunteers.map(pv => pv.project_id === project.id ? rescue.volunteers.map(rv => rv.id === pv.volunteer_id ? <li>{rv.name}</li> : null) : null)} */}               
                {!clickedUpdate ? <button key="update" onClick={handleUpdateProject}>update</button> : null}
            </div>
            {clickedUpdate ? <button onClick={handleSubmitUpdatedProj}>Submit Updates</button> : null}
            <button key="delete" onClick={handleDeleteProject}>Delete Project</button>
                <button onClick={handleClose}>Close</button>
            {/* { clickedUpdate ? <form onSubmit={handleSubmitUpdateProject}>
                Title: <input name="title" defaultValue={project.title} onChange={handleEdit}/>
                <br>
                </br>Type: <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/>  
                <div>Project Volunteers:
                    <div>{projVolunteers.map(pv => rescue.volunteers.map(rv => rv.id === pv.volunteer_id ? <li key={rv.name}>{rv.name} <button onClick={handleDeletePV}>-</button></li> : null)) }</div>
                     <button>Assign New</button>
                </div>
                <div>Project Animals:
                <div>{projAnimals.map(pa => rescue.animals.map(ra => ra.id === pa.animal_id ? <li key={ra.name}>{ra.name} <button onClick={handleDeletePV}>-</button></li> : null)) }</div>
                   <button>Assign New</button>
                </div>
                <button>Submit</button>
            </form>
            : null } */}
                            {/* {deleteP !== {} ? <ProjectAssigner deleteP={deleteP} setDeleteP={setDeleteP} project={project} onDeletePv={onDeletePv} /> : null} */}

        </div>
)
}
export default ProjectCard; 
