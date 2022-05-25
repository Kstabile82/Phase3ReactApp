
import React, { useState } from "react";

function ProjectCard({ project, setProject, setClosed, closed, rescue }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clicked, setClicked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [animals, setAnimals] = useState(rescue.animals)
    const [volunteers, setVolunteers] = useState(rescue.volunteers)
    let newTitle = "";
    let newType = "";
    let projectUpdate = {title: project.title, proj_type: project.proj_type, created: project.created, updated: project.updated}
    let projAnimalMatches = [];
    let projVolunteerMatches = [];
//     let allProjectAnimals = rescue.animals.map(a => a.project_animals)
//     allProjectAnimals.map(pa => {
//             if (project.project_animal_id === pa.id) {
//                 pa.map(pa_id => {
//                     animals.map(anim => {
//                         if(anim.id === pa_id.animal_id) {
//                             if (!projAnimalMatches.includes(anim)) {
//                                 projAnimalMatches.push(anim)
//                             }
//                         }
//                     })
//                 })
//             }
//    })
//    rescue.volunteers.map(vol => {
//      vol.project_volunteers.map(v => {
//         if (v.id === project.proj_volunteer_id) {
//             if (!projVolunteerMatches.includes(vol)) {
//                 projVolunteerMatches.push(vol)
//             }
//         }
//      })
//    })
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
    // console.log(e.target.parentElement)
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
    //   fetch(`http://localhost:9292/projects/${id}`, {
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
 function handleClose(e) {
     e.preventDefault(); 
     setClosed(true)
     console.log(closed)
 }
return (
        <div style={{display: closed === true ? 'none' : 'visible' }}>
            <ul key={project.id}>{project.title}
                <li>Type: {project.proj_type}</li>
                <li>Created: {project.created}</li>
                <li>Updated: {project.updated}</li>
                <div>Project Animals:</div>
                <div>Project Volunteers</div>
                {/* <button key="update" onClick={handleUpdate}>Update</button>
                <button key="delete" onClick={handleDelete}>Delete</button>
                <button key="volunteer">Add Volunteer</button> */}
            </ul>
           {/* Current Animals: */}
            {/* {projAnimalMatches.map(pam => <div><li>Name: {pam.name}</li><button>Remove</button></div>)}
            {clicked ? <form onSubmit={handleSubmitUpdate}>
                <input name="title" defaultValue={project.title} onChange={handleEdit}/> 
                <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> 
                <button>Submit</button>
            </form>
            : null } <br></br><button key="animal">Add Another Animal</button> */}
            {/* Current Volunteers:  */}
                        {/* {projVolunteerMatches.map(pvm => <div><li>Name: {pvm.name}</li><button>Remove</button></div>)}
                        {clicked ? <form onSubmit={handleSubmitUpdate}>
                            <input name="title" defaultValue={project.title} onChange={handleEdit}/> 
                            <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> 
                            <button>Submit</button>
                        </form>
                        : null }             <br></br><button key="volunteer">Add Another Volunteer</button> */}
           <button onClick={handleClose}>Close</button>
        </div>
)
}
export default ProjectCard; 
