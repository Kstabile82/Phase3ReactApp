import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

function Projects({ rescue }) {
const [displayedProjects, setDisplayedProjects] = useState([])
const [project, setProject] = useState({})
const [closed ,setClosed] = useState(false)
const [add, setAdd] = useState(false)
const [checked, setChecked] = useState(false)
const [projectSubmitted, setProjectSubmitted] = useState(false)
let filtertype;
const [filterType, setFilterType] = useState("")
let projMatchArray = []
let typeMatches = [];
const [projCard, setProjCard] = useState("")

useEffect(() => {
  fetch(`http://localhost:9292/rescues/${rescue.id}/projects`)
  .then((r) => r.json())
  .then((rescueProjects) => setDisplayedProjects(rescueProjects));
}, []);   

   function handleClick(e) {
            e.preventDefault();
            setProjCard(displayedProjects.find(dp => dp.title === e.target.innerText))
            setClosed(false)          
   }
   function handleAdd(e) {
        e.preventDefault();
        setAdd(true);
    }
    function handleSubmit(e) {
        e.preventDefault();
        let title = e.target.firstChild.value;
        let proj_type = e.target.firstChild.nextSibling.value;
        fetch(`http://localhost:9292/projects`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify ({
              title,
              proj_type, 
              rescue_id: rescue.id, 
              project_animals: [],
              project_volunteers: []
          }),
          })
          .then((r) => r.json())
          .then(newProj => setDisplayedProjects([...rescue.projects, newProj])); 

    }
    function onDeleteProject(id) {
      const updatedProjects = rescue.projects.filter((project) => project.id !== id);
      setDisplayedProjects(updatedProjects)
     }

     function handleFilterProjectChange(e) {
      e.preventDefault();
      setDisplayedProjects(rescue.projects)
      if (e.target.name === "type") {
          filtertype = e.target.value;
          setFilterType(filtertype)
      }
  } 
  projMatchArray = rescue.projects;

  function handleSubmitProjectFilter(e) {
      e.preventDefault(); 
      setProjectSubmitted(true);
     if (filterType === undefined || filterType === "All") { 
          typeMatches = projMatchArray; 
      }
      else {
          typeMatches = projMatchArray.filter(p => p.proj_type === filterType)  
      }
      setDisplayedProjects(typeMatches)
  }
function sortProjects(e) {
  setChecked(!checked)
  if (e.target.checked === true) {
      displayedProjects.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
  }
  else { 
      displayedProjects.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
  }
}
      return (
        <div>
          <h2>Projects</h2>
          <div className="filter"> 
            Filter by:
            <br></br>
            <label className="sortbydate"> Newest to Oldest
             <input id="sortdate" type="checkbox" onChange={sortProjects} />
            </label>
            <br></br>
            <form onSubmit={handleSubmitProjectFilter}>
            <select name="type" onChange={handleFilterProjectChange}>
                     <option value="" hidden>Type</option>
                     <option>Website</option>
                     <option>Fundraiser</option>
                     <option>Event</option>
                     <option>Rescue Effort</option>
                     <option>Social Media</option>
                     <option>Adoption Screening</option>
                     <option>Fostering</option>
                     <option>All</option>
                </select>
                <button>Submit</button>
            </form>
            </div>
                  {displayedProjects.map(p => 
                    <li key={p.id} onClick={handleClick}>{p.title}
                    </li>
                  )}
                 {projCard !== "" ? <ProjectCard project={project} projCard={projCard} setProjCard={setProjCard} displayedProjects={displayedProjects} setProject={setProject} setClosed={setClosed} closed={closed} rescue={rescue} onDeleteProject={onDeleteProject}/> : null }

                 <button onClick={handleAdd}>Add New Project</button>
                { add ? <form onSubmit={handleSubmit}>
                <input name="title" placeholder="Title"/>
                <input name="type" placeholder="Type"/>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Projects; 