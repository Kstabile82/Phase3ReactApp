import React, { useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects({ rescue }) {
let projArr = [];
const [projects, setProjects] = useState([projArr])
const [project, setProject] = useState({})
        rescue.animals.map(an => {
                an.project_animals.map(projAn => projAn.projects.map(p => {
                        if (!projArr.includes(p)) {
                                projArr.push({title: p.title, id: p.id, proj_type: p.proj_type, created: p.created_at, updated: p.updated_at, proj_animal_id: p.project_animal_id, proj_volunteer_id: p.project_volunteer_id})
                        }
                }))
      })     
   function handleClick(e) {
            e.preventDefault();
            projects[0].map(proj => {
                if (proj.title === e.target.innerText) {
                    setProject(proj);
                }
            })
   }
      return (
        <div>
                <p>Current Projects</p>
                  {projects[0].map(p => 
                    <li key={p.id} onClick={handleClick}>{p.title}
                    </li>
                  )}
                 {project.id === undefined ? null : <ProjectCard project={project} setProject={setProject} rescue={rescue} /> }
        </div>
)

}
   //option to add new, view & update/delete
   //list all from projectanimals and projectvolunteers, remove duplicates
        //new projectupdate component here - option to match & assign volunteer, list volunteers, sort by busiest
        //option to add or remove a project animal or project volunteer from project 
        //option to view closed projects
export default Projects; 