let container = document.getElementById('card_container');
let fragment = document.createDocumentFragment();
let date_current = new Date(data_cards.currentDate);

for (let card of data_cards.events){
    let date_events = new Date (card.date);
    if(date_current > date_events){
        let div = document.createElement('div');
        div.innerHTML = `<div class="grid d-flex gap-4 p-2"><div class="p-2 g-col-6">
        <div class="card p-3" style="width: 20rem; height: 28rem;"><figure class="p-2"><img src=${card.image} class="card-img-top card1_img alt="cinema"></img>
        </figure><div class="card-body"><h5 class="card-title text-center">${card.name}</h5>
        <p class="card-text text-center p-2">${card.description}</p><div class="d-flex justify-content-between">
        <p>$ ${card.price}</p><a href="./details.html" class="text-decoration-none text-white text-center card_buttom p-2">Ver mas</a></div></div></div></div>`;
        fragment.appendChild(div);
    }
}
container.appendChild(fragment);