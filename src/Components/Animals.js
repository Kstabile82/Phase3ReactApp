import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";

function Animals({ rescue }) {
    const [animal, setAnimal] = useState({})
    const [add, setAdd] = useState(false)
    const [closedAnimal, setClosedAnimal] = useState(false)
    const [displayedAnimals, setDisplayedAnimals] = useState(rescue.animals)
    const [checked, setChecked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    let filtertype;
    let filtersex; 
    let filterage;
    let filteradopt;
    const [filterType, setFilterType] = useState("")
    const [filterSex, setFilterSex] = useState("")
    const [filterAge, setFilterAge] = useState("")
    const [filterAdopt, setFilterAdopt] = useState(false)
    let animalMatchArray = []
    let sexMatches = [];
    let ageMatches;
    let typeMatches;
    let adoptMatches;
    let breedMatches;

    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/animals`)
        .then((r) => r.json())
        .then((rescueAnimals) => setDisplayedAnimals(rescueAnimals));
    }, []);
   function handleClick(e){
       e.preventDefault(); 
       rescue.animals.map(a => {
           if (a.name === e.target.innerText) {
               setAnimal(a);
               setClosedAnimal(false);
           }
       })
   }
   function handleAdd(e) {
       e.preventDefault();
       setAdd(true);
   }
   function onDeleteAnimal(id) {
    const updatedAnimals = rescue.animals.filter((animal) => animal.id !== id);
    setDisplayedAnimals(updatedAnimals)
   }
   function handleSubmit(e) {
       e.preventDefault();
       let name = e.target.firstChild.value;
       let sex = e.target.firstChild.nextSibling.value;
       let color = e.target.firstChild.nextSibling.nextSibling.value;
       fetch(`http://localhost:9292/animals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            name,
            sex, 
            color,
            rescue_id: rescue.id, 
            project_animals: [],
            adoption_status: false,
            kind: "Rabbit"
        }),
        })
        .then((r) => r.json())
        .then(newAdd => setDisplayedAnimals([...displayedAnimals, newAdd]));  
    }    
    function handleChangeFilter(e) {
        e.preventDefault();
        setDisplayedAnimals(rescue.animals)
        if (e.target.name === "type") {
            filtertype = e.target.value;
            setFilterType(filtertype)
        }
        if (e.target.name === "age") {
            filterage = e.target.value;
            setFilterAge(filterage)
        }
        if (e.target.name === "adopted") {
            if (e.target.value === "True") {
                filteradopt = true
            }
            else if (e.target.value === "False") {
                filteradopt = false
            }
            setFilterAdopt(filteradopt)
        }
        if (e.target.name === "sex") {
            if (e.target.value === "F") {
                filtersex = "Female"
            }
            else if (e.target.value === "M") {
                filtersex = "Male"
            }
            setFilterSex(filtersex)
        }
    } 
    animalMatchArray = rescue.animals;
    function handleSubmitFilter(e) {
        e.preventDefault(); 
        setSubmitted(true);
       if (filterSex === undefined || filterSex === "All") { 
            sexMatches = animalMatchArray; 
        }
        else {
            sexMatches = animalMatchArray.filter(animal => animal.sex === filterSex)  
        }
        if (filterAdopt === undefined || filterAdopt == "All") {
            adoptMatches = sexMatches;
        }
        else {
            adoptMatches = sexMatches.filter(an => an.adoption_status === filterAdopt)
        }
        if (filterAge === undefined || filterAge === "All") {
            ageMatches = adoptMatches; 
        }
        else {
            ageMatches = adoptMatches.filter(animal => animal.age === filterAge)
        }
        if (filterType === undefined || filterType === "All") {
            typeMatches = ageMatches; 
        }
        else {
            typeMatches = ageMatches.filter(animal => animal.kind === filterType)
        }
        // if (filterType === undefined) {
        //     breedMatches = typeMatches; 
        // }
        // else {
        //     breedMatches = typeMatches.filter(animal => animal.breed === filterBreed)
        // }
        //add adoption status here instead of checkbox
        setDisplayedAnimals(adoptMatches)
    }
  function sortAnimals(e) {
    setChecked(!checked)
    if (e.target.checked === true) {
        displayedAnimals.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
    }
    else { 
        displayedAnimals.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
    }
}
return (
        <div>
            <div className="filter"> 
            Filter by:
            <br></br>
            <label className="sortbycreated"> Time with {rescue.name} (longest to least) 
             <input id="sortLongest" type="checkbox" onChange={sortAnimals} />
            </label>
            <br></br>
            <form onSubmit={handleSubmitFilter}>
            <select name="type" onChange={handleChangeFilter}>
                     <option value="" hidden>Type</option>
                     <option>Cat</option>
                     <option>Dog</option>
                     <option>Rabbit</option>
                     <option>Other</option>
                     <option>All</option>
                </select>
                <select name="sex" onChange={handleChangeFilter}>
                    <option value="" hidden>Sex</option>
                     <option>F</option>
                     <option>M</option>
                     <option>All</option>
                </select>
                <select name="age" onChange={handleChangeFilter}>
                     <option value="" hidden>Age</option>
                     <option>Baby</option>
                     <option>Young Adult</option>
                     <option>Adult</option>
                     <option>Senior</option>
                     <option>All</option>
                </select>
                <select name="adopted" onChange={handleChangeFilter}>
                    <option value="" hidden>Adopted</option>
                     <option>True</option>
                     <option>False</option>
                     <option>All</option>
                </select>
                <button>Submit</button>
            </form>
            </div>
            <p>All Animals</p>
            {displayedAnimals.map(a => <li key={a.id} onClick={handleClick}>{a.name} </li>)}
            {animal.id === undefined || closedAnimal ? null : <AnimalCard animal={animal} onDeleteAnimal={onDeleteAnimal} setAnimal={setAnimal} closedAnimal={closedAnimal} setClosedAnimal={setClosedAnimal} /> }
            <button onClick={handleAdd}>Add New Animal</button>
            { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name"/>
                <input name="sex" placeholder="Sex"/>
                <input name="color" placeholder="Color"/>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Animals; 
