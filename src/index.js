let addToy = false;
const toyForm = document.querySelector('.add-toy-form');

// const toyDisplay = document.getElementById("toy-collection");

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
 fetchRequest();
 
});

//fetch request

const fetchRequest = () => {
  fetch('http://localhost:3000/toys')
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => renderToy(toy))
  })

}


function renderToy(toy) {
  const toyDisplay = document.getElementById("toy-collection")
  let div = document.createElement("div")
  let h2 = document.createElement("h2")
  let img = document.createElement("img")
  let p = document.createElement("p")
  let button = document.createElement("button")

    div.classList.add("card")
    h2.innerText = toy.name
    img.src = toy.image
    img.classList.add("toy-avatar")
    p.innerText = `${toy.likes} likes`
    button.innerText = "Like ❤️"
    button.classList.add("like-btn")
    button.id = `${toy.id}`
    button.addEventListener( 'click', increaseLikes )

  
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
  
    toyDisplay.appendChild(div)

}

 toyForm.addEventListener("submit", (e) => {
  e.preventDefault()

    // what we send needs to look like what's in the database
    const newToyObj = {
      name: e.target.name.value,
      image: e.target.image.value,
      likes: 0
    }

   fetch ('http://localhost:3000/toys', {
    method: 'POST',
    headers: {"Content-Type": "application/json" },
    body: JSON.stringify( newToyObj )  
    })
      .then(r => r.json())
      .then( freshToy => {
			   renderToy( freshToy )
       })
      })
       // end of toyForm event listener

//need to look over how to increase likes:

function increaseLikes( e ) {

	const id = e.target.id

	const likesElement = e.target.parentElement.querySelector( 'p' )
	splitStringArray = likesElement.innerText.split( ' ' )
	const newNumber = parseInt( splitStringArray[0] ) + 1

	fetch( `http://localhost:3000/toys/${id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify( {
			likes: newNumber
		} )
	} )
		.then( r => r.json() )
		.then( someFreshToyObj => {
			likesElement.innerText = `${someFreshToyObj.likes} likes`
		} )
}