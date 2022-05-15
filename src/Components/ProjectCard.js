
import React, { useState } from "react";

function ProjectCard({ project, setProject, rescue }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clicked, setClicked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [animals, setAnimals] = useState(rescue.animals)
    let newTitle = "";
    let newType = "";
    let projectUpdate = {title: project.title, proj_type: project.proj_type, created_at: project.created_at, updated_at: project.updated_at}
    let projAnimalMatches = [];

    let allProjectAnimals = rescue.animals.map(a => a.project_animals)
    allProjectAnimals.map(pa => {
            if (project.project_animal_id === pa.id) {
                pa.map(pa_id => {
                    animals.map(anim => {
                        if(anim.id === pa_id.animal_id) {
                            if (!projAnimalMatches.includes(anim)) {
                                projAnimalMatches.push(anim)
                            }
                        }
                    })
                })
            }
   })
//     let allProjectAnimals = rescue.animals.map(a => a.project_animals)
//     allProjectAnimals.map(pa => {
//         pa.map(p => {
//             if (project.project_animal_id === p.id) {
//                 console.log("Project", p)
//             }
//         })
//    })
   function handleUpdate(e){
       e.preventDefault();
       setClicked(true)
   }
   function handleDelete(e){
     e.preventDefault();
    //    let id = e.target.parentElement.id
    console.log(e.target.parentElement)
   }
   function handleSubmitUpdate(e){
       e.preventDefault();
       if (newTitle !== "") {
           projectUpdate.title = newTitle
       }
       else {
           projectUpdate.title = project.title
       }
       if (newType !== "") {
          projectUpdate.proj_type = newType;
       }
       else {
        projectUpdate.proj_type = project.proj_type
      }
      setUpdatedProject(projectUpdate);
      setClicked(false)
    //   fetch(`http://localhost:9292/rescue/${rescue.id}/animals/${animal.id}`, {
    //       method: "PATCH",
    //       headers: {
    //           "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(projectUpdate)
    //   })
    //   .then((r) => r.json())
    //   .then((patchedProj) => setAnimal(patchedProj))

 }
   function handleEdit(e){
       e.preventDefault();

       if (e.target.name === "title") {
           newTitle = e.target.value;
       }
       if (e.target.name === "type") {
           newType = e.target.value;
       }
   }
 
return (
        <div>
            <ul key={project.id}>{project.title}
                <li>Type: {project.proj_type}</li>
                <li>Created: {project.created}</li>
                <li>Updated: {project.updated}</li>
                <button key="update" onClick={handleUpdate}>update</button>
                <button key="delete" onClick={handleDelete}>delete</button>
            </ul>
           Animals:
            {projAnimalMatches.map(pam => <div><li>Name: {pam.name}</li><button>Remove</button></div>)}
            {clicked ? <form onSubmit={handleSubmitUpdate}>
                <input name="title" defaultValue={project.title} onChange={handleEdit}/> 
                <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> 
                <button>Submit</button>
            </form>
            : null }
        </div>
)
}
export default ProjectCard; 
