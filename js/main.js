
const body = document.body;
const container = document.createElement("DIV");
container.setAttribute("class","d-flex flex-wrap justify-content-center mt-5")
body.appendChild(container);
async function getPeople() {
    let url = 'https://randomuser.me/api/?results=5';
    const fetch1 = await fetch(url);
    const response = await fetch1.json();
    const personas = response.results;
    return personas;
}

function Avatar (props) {    
    return `
    <picture class="d-flex flex-column m-2 align-items-center">
        <img class="rounded-circle" src="${props.picture.large}"/>
        <b>${props.name.first}</b>
    </picture>
    `
}
/*getPeople()
    .then(persona => persona.forEach((el) => {container.innerHTML+= Avatar(el)}))*/
async function show() {
    const persona = await getPeople();
    persona.forEach((el) => {container.innerHTML+= Avatar(el)});
}
show().then(function a () {
    const pics = container.querySelectorAll("picture");
    pics.forEach(pic => pic.querySelector("img").addEventListener("click", (e) => pic.classList.toggle("disabled")));
})


