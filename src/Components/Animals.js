import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";

function Animals({ rescue, assignNew, project, displayedAnimals, setDisplayedAnimals }) {
    const [animal, setAnimal] = useState({})
    const [add, setAdd] = useState(false)
    const [closedAnimal, setClosedAnimal] = useState(false)
    const [checked, setChecked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [newAnimalSubmitted, setNewAnimalSubmitted] = useState()
    let filtertype;
    let filtersex; 
    let filterage;
    let filteradopt;
    const [filterType, setFilterType] = useState("All")
    const [filterSex, setFilterSex] = useState("All")
    const [filterAge, setFilterAge] = useState("")
    const [filterAdopt, setFilterAdopt] = useState(false)
    const [newProjAnimal, setNewProjAnimal] = useState([])
    let animalMatchArray = []
    let sexMatches = [];
    let ageMatches;
    let typeMatches;
    let adoptMatches;
    let breedMatches;
    let name; 
    let age;
    let sex;
    let kind;
    let color;

   function handleClick(a, e){
       setAnimal(a)
       setClosedAnimal(false)
   }
   function handleAdd(e) {
       e.preventDefault();
       setAdd(true);
   }
   function onDeleteAnimal(id) {
    const updatedAnimals = displayedAnimals.filter((animal) => animal.id !== id);
    setDisplayedAnimals(updatedAnimals)
   }
   function handleChange(e) {
       e.preventDefault();
       if (e.target.name === "name") {
        name = e.target.value
       } 
       if (e.target.name === "color") {
        color = e.target.value
       }
       if (e.target.name === "age") {
         age = e.target.value  
       }
       if (e.target.name === "type") {
        kind = e.target.value
       }
       if (e.target.name === "sex") {
        sex = e.target.value
       }
   }
   function handleSubmit(e) {
       e.preventDefault();
          fetch(`http://localhost:9292/animals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify ({
            name,
            sex, 
            color,
            age,
            kind,
            rescue_id: rescue.id, 
            project_animals: [],
            adoption_status: false,
        }),
        })
        .then((r) => r.json())
        .then(newAdd => {
            setDisplayedAnimals([...displayedAnimals, newAdd])
        });  
        //problem - animal adds on backend, but doesn't appear on the front end until I refresh the whole App
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
        if (filterAdopt === undefined) {
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
    e.preventDefault();
    setChecked(!checked)
    if (e.target.checked === true) {
        displayedAnimals.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
    }
    else { 
        displayedAnimals.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
    }
}
function handleAddAnimalToProject(e, a) {
    e.preventDefault();
    setNewProjAnimal([project, a]);
}
return (
        <div>
            <h2>Animals</h2>
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
                </select>
                <button>Submit</button>
            </form>
            </div>
            {displayedAnimals.map(a => 
            <li key={a.id} onClick={e => handleClick(a, e)}>{a.name} {assignNew === "Animal" ? <button onClick={e => handleAddAnimalToProject(e, a)}>+</button> : null}
            </li> ) }
            {animal.id === undefined || closedAnimal ? null : <AnimalCard animal={animal} onDeleteAnimal={onDeleteAnimal} setAnimal={setAnimal} closedAnimal={closedAnimal} setClosedAnimal={setClosedAnimal} displayedAnimals={displayedAnimals} /> }
            <button style={{display: assignNew === "Animal" ? 'none' : 'visible' }} onClick={handleAdd}>Add New Animal</button>
            { add ? <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Name" onChange={handleChange}/>
                <input name="color" placeholder="Color" onChange={handleChange}/>
                <select name="type" onChange={handleChange}>Type
                    <option value="" hidden>Type</option>
                    <option>Dog</option>
                    <option>Cat</option>
                    <option>Rabbit</option>
                    <option>Other</option>
                    <option>All</option>
                </select>
                <select name="sex" onChange={handleChange}>Sex
                    <option value="" hidden>Sex</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>All</option>
                </select>
                <select name="age" onChange={handleChange}>
                    <option value="" hidden>Age</option>
                    <option>Baby</option>
                    <option>Young</option>
                    <option>Adult</option>
                    <option>Senior</option>
                    <option>All</option>
                </select>
                <button>Submit</button>
            </form> : null }
        </div>
)
}
export default Animals; 
