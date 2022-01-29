class FavoritesUI {
    constructor () {
        this.container = document.querySelector('.favorites .dropdown-content');
    }

    clearContainer () {
        this.container.innerHTML = "";
    }

    renderFavoritesItems (favorites) {
        // тут остановился
        this.clearContainer();

        if(!favorites)
            return;

        let fragment = "";

        Object.values(favorites).forEach((favorite)=>{
            fragment += this.favoritesTemplate(favorite);
        });

        console.log(favorites);

        this.container.insertAdjacentHTML("afterbegin", fragment);
    }

    favoritesTemplate(favorite) {
        return `
            <div class="favorite-item  d-flex align-items-start">
                <img
                  src="http://pics.avs.io/200/200/PS.png"
                  class="favorite-item-airline-img"
                />
                <div class="favorite-item-info d-flex flex-column">
                  <div
                    class="favorite-item-destination d-flex align-items-center"
                  >
                    <div class="d-flex align-items-center mr-auto">
                      <span class="favorite-item-city">${favorite.origin_name} </span>
                    </div>
                    <div class="d-flex align-items-center">
                      <span class="favorite-item-city">${favorite.destination_name}</span>
                    </div>
                  </div>
                  <div class="ticket-time-price d-flex align-items-center">
                    <span class="ticket-time-departure">${favorite.return_at}</span>
                    <span class="ticket-price ml-auto">${favorite.cur}${favorite.price}</span>
                  </div>
                  <div class="ticket-additional-info">
                    <span class="ticket-transfers">Пересадок: ${favorite.transfers}</span>
                    <span class="ticket-flight-number">Номер рейса: ${favorite.flight_number}</span>
                  </div>
                  <a
                    class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto" data-id="${favorite.id}"
                    >Delete</a
                  >
                </div>
              </div>
        `;
    }
}

const favoritesUI = new FavoritesUI();

export default favoritesUI;