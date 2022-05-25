import React, { useEffect, useState } from "react";
import AnimalCard from "./AnimalCard";

function Animals({ rescue }) {
    const [animal, setAnimal] = useState({})
    const [add, setAdd] = useState(false)
    const [animals, setAnimals] = useState([])
    const [displayedAnimals, setDisplayedAnimals] = useState(rescue.animals)
    const [checked, setChecked] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [sortAdopt, setSortAdopt] = useState(false)
    let filtertype;
    let filtersex; 
    let filterage;
    useEffect(() => {
        fetch(`http://localhost:9292/rescues/${rescue.id}/animals`)
        .then((r) => r.json())
        .then((rescueAnimals) => setAnimals(rescueAnimals));
    }, []);
   function handleClick(e){
       e.preventDefault(); 
       animals.map(a => {
           if (a.name === e.target.innerText) {
               setAnimal(a);
           }
       })
   }
   function handleAdd(e) {
       e.preventDefault();
       setAdd(true);
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
            project_animals: []
        }),
        })
        .then((r) => r.json())
        .then(newAdd => setAnimals([...animals, newAdd]));    
    }    
    function handleChangeFilter(e) {
        e.preventDefault();
          if (e.target.name === "type") {
            filtertype = e.target.value;
        }
        if (e.target.name === "age") {
            filterage = e.target.value;
        }
        if (e.target.name === "sex") {
            filtersex = e.target.value;
        }
    } 
    function handleSubmitFilter(e) {
        e.preventDefault(); 
        setSubmitted(true);
        // if (filtertype === "") {
        //     filtertype = animal.kind
        // }
        // if (filtersex === "") {
        //     filtersex = animal.sex
        // }
        // if (filterage === "") {
        //     filterage = animal.age
        // }
        setAnimals(animals.filter(animal => animal.kind === filtertype && animal.sex === filtersex && animal.age === filterage))
    }
  function sortAnimals(e) {
    setChecked(!checked)
    if (e.target.checked === true) {
        animals.sort((a,b) => (a.created_at > b.created_at) ? -1 : 1)
    }
    else { 
        animals.sort((a,b) => (a.created_at > b.created_at) ? 1 : -1)
    }
  }
  function sortAdoptables(e) {
      setSortAdopt(!sortAdopt)
      if (e.target.checked === true && sortAdopt === false) {
        setDisplayedAnimals(animals.filter(a => a.adoption_status === "Adoptable"))

      }
      else {
          setDisplayedAnimals(animals)
      }
  }
return (
        <div>
            <p>Current Animals</p>
            <div className="filter"> 
            Filter by:
            <br></br>
            <label className="sortbycreated"> Time with {rescue.name} (longest to least) 
             <input id="sortLongest" type="checkbox" onChange={sortAnimals} />
            </label>
            <br></br>
            <label className="sortbyadoptables"> Adoptable
             <input id="sortadoptable" type="checkbox" onChange={sortAdoptables} />
            </label>
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
                <button>Submit</button>
            </form>
            </div>
            {displayedAnimals.map(a => <li key={a.id} onClick={handleClick}>{a.name} </li>)}
            {animal.id === undefined ? null : <AnimalCard animal={animal} setAnimal={setAnimal} animals={animals} /> }
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
