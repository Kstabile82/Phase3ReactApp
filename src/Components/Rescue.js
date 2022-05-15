import React, { useEffect, useState } from "react";
import Volunteers from "./Volunteers";
import Animals from "./Animals";
import Projects from "./Projects";

function Rescue({ rescue }) {
    const [rescueinfo, setRescueinfo] = useState(null)
    const [projects, setProjects] = useState(null)
    const [clicked, setClicked] = useState("")
    const [button, setButton] = useState("")
    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}`)
        .then((r) => r.json())
        .then((rescueinfo) => setRescueinfo(rescueinfo));
    }, []);
    function handleClick(e){
        e.preventDefault();
        setClicked(e.target.innerText)
    }
// function handleDeleteRescue(id) {
//   const updatedRescue = rescues.filter((rescue) => rescue.id !== id);
//   setRescues(updatedRescue);
// }

// function handleUpdateRescue(updatedRescue) {
//   const updatedRescue = rescues.map((rescue) => {
//     if (rescue.id === updatedRescue.id) {
//       return updatedRescue;
//     } else {
//       return rescue;
//     }
//   });
//   setRescues(updatedRescues);
// }
    return (
        <div>
            Hello, {rescue.name}!
            <button onClick={handleClick}>Volunteers
            </button>
            <button onClick={handleClick}>Animals
            </button>
            <button onClick={handleClick}>Project Organizer</button>
            {clicked === "Volunteers" ? <Volunteers rescue={rescue}/> : null }
            {clicked === "Animals" ? <Animals rescue={rescueinfo}/> : null }
            {clicked === "Project Organizer" ? <Projects rescue={rescueinfo}/> : null }
        </div>
       
    )
}
export default Rescue;
