
import React, { useEffect, useState } from "react";
import Animals from "./Animals";

function ProjectCard({ displayedProjects, projCard, setProjCard, setClosed, closed, rescue, onDeleteProject }) {
    const [updatedProject, setUpdatedProject] = useState({})
    const [clickedUpdate, setClickedUpdate] = useState(false)
    const [assignNew, setAssignNew] = useState("")
    const [displayedAddVols, setDisplayedAddVols] = useState([])
    const [projVols, setProjVols] = useState(projCard.volunteers)
let projectUpdate = projCard;
let pvs = projCard.project_volunteers
let displayedPVsToAddArr = []

let volIdArr = [];
projVols.map(p => {
    volIdArr.push(p.id)
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
// function handleSubmitUpdateProject(e){
//   e.preventDefault();
//   setClickedUpdate(false)
//   fetch(`http://localhost:9292/projects/${projCard.id}`, {
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//          updatedProject,
//       }),
//   })
//   .then((r) => r.json())
// }
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
     setProjCard("")
 }
 function handleDeletePV(e, pv) {
     e.preventDefault();
     let pvToDelete = pvs.find(p => p.volunteer_id === pv.id) 
        fetch(`http://localhost:9292/project_volunteers/${pvToDelete.id}`, {
        method: "DELETE",
     })
     .then((r) => r.json())
     .then(() => setProjVols(projCard.volunteers.filter(pv => pv.id !== pvToDelete.volunteer_id)))
}

function handleAssignAnimal(e) {
    e.preventDefault();
    setAssignNew("Animal")
}

function handleAssignVolunteer(e) {
    e.preventDefault();
    setAssignNew("Volunteer")
    rescue.volunteers.map(vol => {
        if (!volIdArr.includes(vol.id)) {
            displayedPVsToAddArr.push(vol)
        }
    })
    setDisplayedAddVols(displayedPVsToAddArr) 
}
function handleSubmitUpdatedProj(e){
    e.preventDefault();
}
function handleAddVolToProject(e, displayedV) {
    e.preventDefault();
    let volunteer_id = displayedV.id
    let project_id = projCard.id
    // let volIdArr = [];

    // projVols.map(p => {
    //     volIdArr.push(p.id)
    // })
 
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
            newAdd = rescue.volunteers.find(v => v.id === volunteer_id)
            setProjVols([...projVols, newAdd])
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
                {/* <div>Created: {projCard.created_at}</div>
                <div>Updated: {projCard.updated_at}</div> */}
                <div>Project Animals: 
                </div>
                {assignNew === "Animal" ? <Animals rescue={rescue} assignNew={assignNew} setAssignNew={setAssignNew} project={projCard}/> : null}
                <div>Project Volunteers:
                {projVols ? projVols.map(pv => <div><li>{pv.name}</li>{clickedUpdate ? <button onClick={e => handleDeletePV(e, pv)}>-</button> : null} </div> ) : null}
                 </div>
                </div> {clickedUpdate ? <button onClick={handleAssignVolunteer}>Assign New</button> : null}
                {assignNew === "Volunteer" ?  displayedAddVols.map(displayedV => <div> <li>{displayedV.name}</li> <button onClick={e => handleAddVolToProject(e, displayedV)}>+</button></div> ) : null}
                {!clickedUpdate ? <button key="update" onClick={handleUpdateProject}>update</button> : null}
                {clickedUpdate ? <button onClick={handleSubmitUpdatedProj}>Submit Updates</button> : null}
                <button key="delete" onClick={handleDeleteProject}>Delete Project</button>
                 <button onClick={handleClose}>Close</button>
            </div>
)
}
export default ProjectCard; 


// function ProjectCard({ displayedProjects, projCard, setProjCard, setClosed, closed, rescue, onDeleteProject }) {
//     const [updatedProject, setUpdatedProject] = useState({})
//     const [clickedUpdate, setClickedUpdate] = useState(false)
//     // const [projVolunteers, setProjVolunteers] = useState(project.volunteers)
//     // const [projVolunteers, setProjVolunteers] = useState()

//     //pass state down as a prop and pass set method down so i can make updates
//     // const [projAnimals, setProjAnimals] = useState(project.project_animals);
//     // const [projAnimals, setProjAnimals] = useState([]);

//     const [assignNew, setAssignNew] = useState("")
//     const [deleteP, setDeleteP] = useState({})
//     const [displayedAddVols, setDisplayedAddVols] = useState([])
//     // const [pvs, setPvs] = useState(project.project_volunteers)
//     // const [pvs, setPvs] = useState([])
//     let volunteers = rescue.volunteers

//     const [newProjVol, setNewProjVol] = useState([])
//     let volArr; 
//     let animalArr;
//     let displayedPVsToAddArr = [];
//     let idArray = [];

// let project = displayedProjects.find(p => p.title === projCard)
// let projectUpdate = project;
// let projAnimals = project.project_animals
// let projVolunteers = project.project_volunteers
// let pvs = project.project_volunteers
// // projVolunteers.map(pv => idArray.push(pv.id))
// // rescue.volunteers.map(rv => {
// //     if (!idArray.includes(rv.id)) {
// //         displayedPVsToAddArr.push(rv)
// //     }
// // })
// function handleUpdateProject(e){
//    e.preventDefault();
//    setClickedUpdate(true)
// }
// // volArr = projVolunteers.map(pv => {
// //     rescue.volunteers.filter(v => v.id === pv.volunteer_id)
// // })
// // animalArr = projAnimals.map(pa => {
// //     rescue.animals.filter(a => a.id === pa.animal_id)
// // })
// function handleDeleteProject(e){
//  e.preventDefault();
//     fetch(`http://localhost:9292/projects/${project.id}`, {
//       method: "DELETE",
//     })
//         onDeleteProject(project.id);
// }
// function handleSubmitUpdateProject(e){
//   e.preventDefault();
//   setClickedUpdate(false)
//   fetch(`http://localhost:9292/projects/${project.id}`, {
//       method: "PATCH",
//       headers: {
//           "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//          updatedProject,
//       }),
//   })
//   .then((r) => r.json())
// //   .then((patchedProject) => setProject(patchedProject))
// }
// function handleEdit(e){
//    e.preventDefault();
//    if (e.target.name === "title") {
//     projectUpdate.title = e.target.value;
//    }
//    if (e.target.name === "type") {
//     projectUpdate.proj_type = e.target.value;
//    }
//     setUpdatedProject(projectUpdate);
// }
//  function handleClose(e) {
//      e.preventDefault(); 
//      setClosed(true)
//      setAssignNew("")
//  }
//  function handleDeletePV(e, pv) {
//      e.preventDefault();
//      let pvToDelete = pvs.find(p => p.id === pv.id) 
//         fetch(`http://localhost:9292/project_volunteers/${pvToDelete.id}`, {
//         method: "DELETE",
//      })
//      .then((r) => r.json())
//     // //  .then(() => projVolunteers.filter(p => p.id !== pvToDelete.volunteer_id))
//     //  .then(() => {setProjVolunteers(projVolunteers.filter(p => p.id !== pvToDelete.volunteer_id))
//     // setDeleteP({}) })
// }
// function handleAssignAnimal(e) {
//     e.preventDefault();
//     setAssignNew("Animal")
// }
// function handleAssignVolunteer(e) {
//     e.preventDefault();
//     setAssignNew("Volunteer")
//     //set displayed add vol options? set back to blank on close
//     setDisplayedAddVols(displayedPVsToAddArr) 
// }
// function handleSubmitUpdatedProj(e){
//     e.preventDefault();
// }

// function handleAddVolToProject(e, pv) {
//     e.preventDefault();
//     setNewProjVol(pv)
//     // fetch(`http://localhost:9292/project_volunteers`, {
//     //      method: "POST",
//     //      headers: {
//     //        "Content-Type": "application/json",
//     //      },
//     //      body: JSON.stringify ({
//     //          volunteer_id: daVs.id,
//     //          project_id: project.id    
//     //          }),
//     //      })
//     //      .then((r) => r.json())
//     //      .then(newAdd => {
//     //         let newVolunteerObj = rescue.volunteers.find(v => v.id === newAdd.volunteer_id)
//     //         setProjVolunteers([...projVolunteers, newVolunteerObj])
//     //         setDisplayedAddVols([])
//     //      })
//  }
//  return (
//         <div className="projectcard" style={{display: closed === true ? 'none' : 'visible' }}>
//             <div key={project.id}>Title:{project.title}
//             { clickedUpdate ? <input name="title" defaultValue={project.title} onChange={handleEdit}/> : null}
//                 <div>Type: {project.proj_type}</div>
//             { clickedUpdate ? <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/> : null }
//                 <div></div>
//                 <div>Created: {project.created_at}</div>
//                 <div>Updated: {project.updated_at}</div>
//                 <div>Project Animals: {projAnimals.map(pa => pa.project_id === project.id ? rescue.animals.map(ra => ra.id === pa.animal_id ? <div><li>{ra.name}</li> {clickedUpdate ? <button>-</button> : null} </div>: null) : null)}
//                 </div> {clickedUpdate ? <button onClick={handleAssignAnimal}>Assign New</button> : null}
//                 {assignNew === "Animal" ? <Animals rescue={rescue} assignNew={assignNew} setAssignNew={setAssignNew} project={project}/> : null}
//                 {/* <div>Project Volunteers: {projVolunteers.map(pv => <div><li>{pv.name}</li> {clickedUpdate ? <button onClick={e => handleDeletePV(e, pv)}>-</button> : null}   */}
//                 <div>Project Volunteers: {projVolunteers.map(pv => <div><li>{pv.name}</li> {clickedUpdate ? <button onClick={e => handleDeletePV(e, pv)}>-</button> : null}  
//                 {/* {assignNew === "Volunteer" ? <Volunteers rescue={rescue} assignNew={assignNew} setAssignNew={setAssignNew} project={project}/> : null} */}
//                 {/* {assignNew === "Volunteer" ? rescue.volunteers.map(rv => <li>{rv.name}</li>) : null}  */}
//                 </div>)} 
//                 </div> {clickedUpdate ? <button onClick={handleAssignVolunteer}>Assign New</button> : null}
//                 {assignNew === "Volunteer" ? rescue.volunteers.map(rv => <div> <li>{rv.name}</li> <button onClick={e => handleAddVolToProject(e, rv)}>+</button></div> ) : null}
//                 {/* {assignNew === "Volunteer" && displayedAddVols.length > 0 ? displayedAddVols.map(daVs => <div><li>{daVs.name}</li> <button onClick={e => handleAddVolToProject(e, daVs)}>+</button></div>) : null} */}
//                 {!clickedUpdate ? <button key="update" onClick={handleUpdateProject}>update</button> : null}
//             </div>
//             {newProjVol.id ? <ProjectAssigner newProjVol={newProjVol} project={project} projVolunteers={projVolunteers} /> : null}

//             {clickedUpdate ? <button onClick={handleSubmitUpdatedProj}>Submit Updates</button> : null}
//             <button key="delete" onClick={handleDeleteProject}>Delete Project</button>
//                 <button onClick={handleClose}>Close</button>
                
//             {/* { clickedUpdate ? <form onSubmit={handleSubmitUpdateProject}>
//                 Title: <input name="title" defaultValue={project.title} onChange={handleEdit}/>
//                 <br>
//                 </br>Type: <input name="type" defaultValue={project.proj_type} onChange={handleEdit}/>  
//                 <div>Project Volunteers:
//                     <div>{projVolunteers.map(pv => rescue.volunteers.map(rv => rv.id === pv.volunteer_id ? <li key={rv.name}>{rv.name} <button onClick={handleDeletePV}>-</button></li> : null)) }</div>
//                      <button>Assign New</button>
//                 </div>
//                 <div>Project Animals:
//                 <div>{projAnimals.map(pa => rescue.animals.map(ra => ra.id === pa.animal_id ? <li key={ra.name}>{ra.name} <button onClick={handleDeletePV}>-</button></li> : null)) }</div>
//                    <button>Assign New</button>
//                 </div>
//                 <button>Submit</button>
//             </form>
//             : null } */}
//         </div>
// )
// }
// export default ProjectCard; 
