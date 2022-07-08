import React, { useEffect, useState } from "react";
import Volunteers from "./Volunteers";
import Animals from "./Animals";
import Projects from "./Projects";
import App from "../App";

function Rescue({ rescue, setRescue, setLoggedOut, onDeleteRescue }) {
    const [rescueinfo, setRescueinfo] = useState(null)
    const [clicked, setClicked] = useState("")
    const [displayedVolunteers, setDisplayedVolunteers] = useState([])
    const [displayedAnimals, setDisplayedAnimals] = useState([])
    const [displayedProjects, setDisplayedProjects] = useState([])

    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}`)
        .then((r) => r.json())
        .then((rescueinfo) => setRescueinfo(rescueinfo));
    }, []);
    function handleClick(e){
        e.preventDefault();
        setClicked(e.target.innerText)
    }

    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/volunteers`)
        .then((r) => r.json())
        .then((volunteers) => setDisplayedVolunteers(volunteers));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/animals`)
        .then((r) => r.json())
        .then((animals) => setDisplayedAnimals(animals));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/projects`)
        .then((r) => r.json())
        .then((rescueProjects) => setDisplayedProjects(rescueProjects));
      }, []);   

function handleLogOut(e) {
    e.preventDefault();
    setRescue("")
    setLoggedOut(true)
}
function handleDelete(e){
    e.preventDefault();
    fetch(`http://localhost:9292/rescues/${rescue.id}`, {
        method: "DELETE",
      })
          onDeleteRescue(rescue.id);
          setLoggedOut(true)
          setRescue("")

}
    return (
        <div className="welcome">
            <h1>Hello, {rescue.name}! (Your Rescue ID is {rescue.id})</h1>
            <button onClick={handleClick}>Volunteers
            </button>
            <button onClick={handleClick}>Animals
            </button>
            <button onClick={handleClick}>Project Organizer</button>
            <button onClick={handleDelete}>Delete This Rescue</button>
            <button onClick={handleLogOut}>Log Out</button>
            {clicked === "Volunteers" ? <Volunteers rescue={rescueinfo} displayedVolunteers={displayedVolunteers} setDisplayedVolunteers={setDisplayedVolunteers} /> : null }
            {clicked === "Animals" ? <Animals rescue={rescueinfo} displayedAnimals={displayedAnimals} setDisplayedAnimals={setDisplayedAnimals}/> : null }
            {clicked === "Project Organizer" ? <Projects rescue={rescueinfo} displayedVolunteers={displayedVolunteers} displayedAnimals={displayedAnimals} displayedProjects={displayedProjects} setDisplayedProjects={setDisplayedProjects}/> : null }
            <br>
            </br>
        </div>
       
    )
}
export default Rescue;
