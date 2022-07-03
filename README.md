How to use
Fork and cline
bundle install
run npm start

Animal Rescue

This is the front end for an animal rescues app that allows them to keep track of their volunteers, animals and projects, with ability to filter and sort each by certain characteristics and update records. The Project component further enables users to assign volunteers and animals to various projects and easily view who is working on what. This is a React front end and Sinatra back end, with data converted to JSON.

Usage

A user should see a log in screen with the option to enter a rescue ID or create a new rescue. If the create a new rescue button is clicked, it should populate an input form asking for information, and submission will fire an event listener and make a request to add this rescue on the back end. If a rescue ID is correctly submitted, or a new rescue is created, users are taken to a welcome screen with buttons for Volunteers, Animals and Projects, as well as a Log Out button that would take them back to the initial screen if clicked. 

The Animal, Volunteer and Project buttons should each pull up a list of the respective instances when clicked. Clicking on an individual Animal or Volunteer's name, or Project title, will render a "card" that displays that instance's basic information, with the option to update it, delete it or close the card.

Additionally, each of those components/lists will have the option to sort and filter by various characteristics -- location, duration of time with the rescue, newest to oldest, etc. 

The Projects cards go a little more in-depth by showing which volunteers are working on the project, and which animals are assigned to it. Clicking update on the project card will allow animals and volunteers to be easily deleted by rendering a delete button right next to the name. It will also render buttons to assign new animals or assign new volunteers, each of which, when clicked, will pull up the respective list of names that are not already assigned to that project, with an add button next to them. The add and delete buttons will trigger event listeners that send delete and post requests to the back end, while updating the input and select forms (i.e. the project title, animal age, etc.) send a patch request that updates that project. 

Support For support, please email karina.stabile@gmail.com

Roadmap

Add options to view volunteer and animal projects from the volunteer and animal components/cards.
Add "Volunteer Talents" join table so volunteers can have multiple talents, and then upgrade update project card option to filter the listed volunteers based on that specific project's needs. 

Update "create new" forms to have stricter requirements on location and talent formatting, or show the already existing options in the data set as a first option to choose from, to avoid duplicates with different wording (i.e. volunteers that are from "Long Island" vs. "Long Island, NY")

Add Animal or Volunteer photo to their card (link to a Petfinder or Facebook profile)

Contributing I am open to contributions, please email me to inquire. Any editors must have React and JSON enabled.