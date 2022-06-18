import React, { useEffect, useState } from "react";

function ProjectAssigner({ onDeletePv, rescue, setDeleteP, pv, deleteP, newProjVol, e, newProjAnimal, project, setProject, projVolunteers, setProjVolunteers }) {
    const [projVols, setProjVols] = useState(project.project_volunteers)
    // if (deleteP !== {}) {
    //     fetch(`http://localhost:9292/project_volunteers/${deleteP.id}`, {
    //     method: "DELETE",
    //  })
    //  onDeletePv(deleteP.id) 
    // }

    function postNewProjVol() {
        e.preventDefault();
        if (deleteP === {}) {
                let volunteer_id = newProjVol.id
                let project_id = project.id
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
                    .then(newAdd => setProjVolunteers([...projVolunteers, newAdd]))
                    //need to go back to where the list on screen originates from and reset that state too
                    //need to figure out where the whole project list originates from and update that state 
     }
    }
   

    return (
        <div>
        </div>
    )
    }
export default ProjectAssigner;


