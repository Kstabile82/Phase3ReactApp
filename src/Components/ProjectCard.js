
import React, { useState } from "react";
import VolunteerCard from "./VolunteerCard";
import AnimalCard from "./AnimalCard";


function ProjectCard({ project, setProject, setClosed, closed, rescue, onDeleteProject }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    const [projVolunteers, setProjVolunteers] = useState(project.project_volunteers);
    const [projAnimals, setProjAnimals] = useState(project.project_animals);
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
 }
 function handleDeletePV(e) {
     e.preventDefault();
     //delete pv
    let vo = rescue.volunteers.find(v => v.name + " -" === e.target.parentElement.innerText)
    let projVolDelete = projVolunteers.find(pv => pv.volunteer_id === vo.id)
    console.log(projVolDelete)
}
return (
        <div style={{display: closed === true ? 'none' : 'visible' }}>
            <form>
            <div key={project.id}>Title:{project.title}
            { clickedUpdate ? <input name="title" defaultValue={project.title} onChange={handleEdit}/> : null}
                <div>Type: {project.proj_type}</div>
            { clickedUpdate ? <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> : null }
                <div></div>
                <div>Created: {project.created_at}</div>
                <div>Updated: {project.updated_at}</div>
                <div>Project Animals: {projAnimals.map(pa => pa.project_id === project.id ? rescue.animals.map(ra => ra.id === pa.animal_id ? <div><li>{ra.name}</li> {clickedUpdate ? <button>-</button> : null} </div>: null) : null)}
                </div> {clickedUpdate ? <button>Assign New</button> : null}
                <div>Project Volunteers: {projVolunteers.map(pv => pv.project_id === project.id ? rescue.volunteers.map(rv => rv.id === pv.volunteer_id ? <li>{rv.name}</li> : null) : null)}
                </div>                
                {!clickedUpdate ? <button key="update" onClick={handleUpdateProject}>update</button> : null}
            </div>
            {clickedUpdate ? <button>Submit Updates</button> : null}
            </form> 
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
        </div>
)
}
export default ProjectCard; 