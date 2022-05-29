import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import Volunteers from "./Volunteers";

function Projects({ rescue }) {
const [projects, setProjects] = useState([])
const [project, setProject] = useState({})
const [closed, setClosed] = useState(false)
const [add, setAdd] = useState(false)
const [newProject, setNewProject] = useState({})
useEffect(() => {
  fetch(`http://localhost:9292/rescues/${rescue.id}/projects`)
  .then((r) => r.json())
  .then((rescueProjects) => setProjects(rescueProjects));
}, []);   
   function handleClick(e) {
            e.preventDefault();
            projects.map(proj => {
                if (proj.title === e.target.innerText) {
                    setProject(proj);
                    setClosed(false);

                }
            })
   }
    function handleAdd(e) {
        e.preventDefault();
        setAdd(true);
    }
    function handleSubmit(e) {
        e.preventDefault();
        let newTitle = e.target.firstChild.value;
        let newType = e.target.firstChild.nextSibling.value;
       setNewProject({title: newTitle, type: newType}) 
       setProjects([...projects, newProject])

    }
      return (
        <div>
          <br></br>
                <button onClick={handleAdd}>Add New Project</button>
                { add ? <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title"/>
                <input name="type" placeholder="Type"/>
                <button>Submit</button>
            </form> : null }
            <p>All Projects</p>
                  {projects.map(p => 
                    <li key={p.id} onClick={handleClick}>{p.title}
                    </li>
                  )}
                 {project.id === undefined || closed ? null : <ProjectCard project={project} setProject={setProject} setClosed={setClosed} closed={closed} rescue={rescue} /> }
            <Volunteers rescue={rescue} />
        </div>
)
}
export default Projects; 