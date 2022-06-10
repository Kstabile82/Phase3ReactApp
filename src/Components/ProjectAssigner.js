import React, { useEffect, useState } from "react";

function ProjectAssigner({ newProjVol, e, newProjAnimal, project, rescue, setProject, projVolunteers, setProjVolunteers }) {
    function postNewProjVol() {
        e.preventDefault();
        projVolunteers.map(pv => {
            if (pv.volunteer_id !== newProjVol.id && pv.project_id !== project.id ) {
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
                  
            }
        })
    }
    return (
        <div></div>
    )
}
export default ProjectAssigner;


