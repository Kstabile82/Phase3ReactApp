import React, { useEffect, useState } from "react";

function Rescue({ rescue }) {
    const [animals, setAnimals] = useState(null)
    const [rescueinfo, setRescueinfo] = useState(null)
    const [projects, setProjects] = useState(null)
    const [clicked, setClicked] = useState(false)
    const [button, setButton] = useState("")
    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}`)
        .then((r) => r.json())
        .then((rescueinfo) => setRescueinfo(rescueinfo));
    }, []);
    //fetch rescue/id/animals, volunteers
    //delete volunteer, delete animal
    //add animal, add volunteer
    //patch animal, patch volunteer
    function handleClick(e){
        e.preventDefault();
        console.log(e.target.innerText)
        setClicked(true)
    //    rescue.volunteers.map(rv => console.log(rv.name))
    }
    return (
        <div>
            Hello, {rescue.name}!
            <btn onClick={handleClick}>See Volunteers
            {clicked === true ? rescue.volunteers.map(rv => <li>{rv.name}</li>) : null }
            </btn>
            <btn onClick={handleClick}>See Animals
            {clicked === true ? rescue.animals.map(ra => <li>{ra.name}</li>) : null }
            </btn>
            <btn onClick>Project Organizer</btn>
        </div>
        //Button to view projects 
            //Projects component
            //filter by...
            //Add/Update/Delete a project
            //Assign a volunteer or an animal to an existing project
            //Delete a volunteer or animal from an existing project
            //Suggest volunteer matches (based on business & talents)
        //Button to view animals 
            //Animals component
            //filter by...
            //Add/Update/Delete an animal
        //Button to view volunteers 
            //Volunteers component 
            //filter by...
            //Add/Update/Delete a volunteer
    )
}
export default Rescue;
// import Projects from './Projects';
// import Animals from './Animals';

//brings you to your rescue's landing page after successful login
//gets projects & animals
//also gets project volunteers and project animals through the above
//also gets volunteers through project volunteers

//option to view projects 
    //Projects component
//option to view animals 
    //Animals component
//option to view volunteers 
    //Volunteers component 


// export default Rescue;