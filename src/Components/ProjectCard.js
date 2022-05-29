
import React, { useState } from "react";

function ProjectCard({ project, setProject, setClosed, closed, rescue }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [animals, setAnimals] = useState(rescue.animals)
    const [volunteers, setVolunteers] = useState(rescue.volunteers)
    let projectUpdate = project;

function handleUpdateProject(e){
   e.preventDefault();
   setClickedUpdate(true)
}
function handleDeleteProject(e){
 e.preventDefault();
    fetch(`http://localhost:9292/projects/${project.id}`, {
      method: "DELETE",
    })
      .then((r) => r.json())
      .then((deletedProject) => console.log(deletedProject));
}
function handleSubmitUpdateProject(e){
  e.preventDefault();
  setClickedUpdate(false)
  fetch(`http://localhost:9292/project/${project.id}`, {
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
    setUpdatedProject(projectUpdate);
}
 function handleClose(e) {
     e.preventDefault(); 
     setClosed(true)
 }
return (
        <div style={{display: closed === true ? 'none' : 'visible' }}>
            <ul key={project.id}>{project.title}
                <div>Type: {project.proj_type}</div>
                <div>Created: {project.created}</div>
                <div>Updated: {project.updated}</div>
                <div>Project Animals:</div>
                <div>Project Volunteers:</div>
                <button key="update" onClick={handleUpdateProject}>update</button>
                <button key="delete" onClick={handleDeleteProject}>delete</button>
                <button onClick={handleClose}>close</button>
            </ul>
            { clickedUpdate ? <form onSubmit={handleSubmitUpdateProject}>
                <input name="title" defaultValue={project.title} onChange={handleEdit}/> 
                <button>Submit</button>
            </form>
            : null }
        </div>
)
}
export default ProjectCard; 
