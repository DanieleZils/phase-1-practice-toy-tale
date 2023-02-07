let addToy = false;
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
  
    div.appendChild(h2)
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(button)
  
    toyDisplay.appendChild(div)

}

fetchRequest()