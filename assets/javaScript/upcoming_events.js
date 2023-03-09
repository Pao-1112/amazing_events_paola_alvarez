//visualización de las 7 card
const container_cards = document.getElementById('card_container');
let date_current = new Date(data_cards.currentDate);

function see_cards(cards_list, container){
  container.innerHTML = '';
  if (cards_list.length > 0){
    let fragment = document.createDocumentFragment();
    for (let card of cards_list){
      let date_events = new Date(card.date);
      if(date_current > date_events){
        let div = document.createElement('div');
        div.innerHTML = `<div class="grid d-flex gap-4 p-2"><div class="p-2 g-col-6">
        <div class="card p-3" style="width: 20rem; height: 28rem;"><figure class="p-2"><img src=${card.image} class="card-img-top card1_img alt="card"></img>
        </figure><div class="card-body"><h5 class="card-title text-center">${card.name}</h5>
        <p class="card-text text-center p-2">${card.description}</p><div class="d-flex justify-content-between">
        <p>$ ${card.price}</p><a href="./details.html?id=${card._id}" class="text-decoration-none text-white text-center card_buttom p-2">Ver mas</a></div></div></div></div>`;
        fragment.appendChild(div);
      }
      container.appendChild(fragment);
    }
  }
  else {
    let div = document.createElement('div');
    div.innerHTML = `<h3>El evento no existe. Realice la búsqueda nuevamente</h3>`
    container.appendChild(div);
  }
}
see_cards(data_cards.events, container_cards);

//Filtrar categorias para que no se repitan y las guardo en un array
const category_checkbox_container = document.getElementById('category_checkbox');
category_checkbox_container.appendChild(checkboxs(data_cards.events));

function checkboxs(array){
  let array_categories = [];
  for (let elements of array){
    let card_categories = elements.category;
    array_categories.push(card_categories);
  }
  let categori = array_categories.filter((item, index) => {
    return array_categories.indexOf(item) === index;
  })

//Genero un div por cada category ya filtrado, con su 
//respectivo checkbox y lo muesto con sus estilos
  let fragment_checkbox = document.createDocumentFragment();
  for(let catego of categori){
    let div = document.createElement('div');
    div.innerHTML = `
      <div class="form-check form-check-inline">
        <input class="form-check-input" type="checkbox" id="${catego.split(" ").join("_")}" value="${catego}" name= "categories">
        <label class="form-check-label" for="${catego.split(" ").join("")}">${catego}</label>
      </div>`
    fragment_checkbox.appendChild(div);
  }
return fragment_checkbox;
}

//Escucho los checkbox
let checkboxes = document.querySelectorAll('input[type="checkbox"]')
console.log(checkboxes);

checkboxes.forEach(checkbox => { 
  checkbox.addEventListener('change', verifyCheckbox )
});

//capturo cada uno de los checkbox escuchados y los muestro
let inputSelected = [];

function verifyCheckbox(){
  inputSelected = Array.from(checkboxes).filter(checkbox => checkbox.checked).map(input => input.value);
  console.log(inputSelected);
  filter_all(data_cards.events)
}

function array_filter(array_string, cards_list){
  if(array_string.length === 0) return cards_list;
  return cards_list.filter(elements => array_string.includes(elements.category));
}

//serchs        
const search_input = document.getElementById('searchs');
console.log(search_input);
let text_search = '';
search_input.addEventListener('keyup', (e) => {
  text_search = e.target.value
  //console.log(text_search)
  //console.log(text(text_search, data_cards.events))
  filter_all(data_cards.events)// paso como parametro "data.events"
});

function text(search, list_card){
  if(search == "") return list_card;
  let new_arrays = list_card.filter(elements => elements.name.toLowerCase().includes(search.toLowerCase().trim()));
  return new_arrays;
}

//Filtros Cruzados
let select_checked = [];
let input_text = '';
function filter_all(array) {
  
  let cardsCheckesFiltered = array_filter (inputSelected, array); 
  let cardsInputFiltered = text (text_search, cardsCheckesFiltered);
  see_cards(cardsInputFiltered, container_cards)
}