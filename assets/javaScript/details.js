const queryString = location.search;

const params = new URLSearchParams(queryString);

const id = params.get('id');

const detail_card = data_cards.events.find(events => events._id == id);

const div = document.getElementById('cards_details');
div.innerHTML = `
<div class="p-5 border border-danger-black bg-white w-50">
  <img src="${detail_card.image}" alt="${detail_card.name}" class="card_details_img p-5">
</div>
<div class="p-1 border border-danger-black bg-white w-50 p-4">
  <h3 class="card-title text-center p-2">${detail_card.name}</h3>
  <div class="p-2">
    <p class="card-text">Date: ${detail_card.date}</p>
    <p class="card-text">Description: ${detail_card.description}</p>
    <p class="card-text">Category: ${detail_card.category}</p>
    <p class="card-text">Place: ${detail_card.place}</p>
    <p class="card-text">Capacity: ${detail_card.capacity}</p>
    <p class="card-text">Assistance or Estimate: ${detail_card.assistance}</p>
    <p class="card-text"><small class="text-muted">Price: $ ${detail_card.price}</small></p>
    <a href="./index.html" class="text-decoration-none text-white text-center card_buttom p-2 aling-items-end>Volver</a>
  </div>
</div>`
