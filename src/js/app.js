import '../css/style.css';
import './plugins';
import locations from './store/locations';
import favorites from './store/favorites';
import formUI from './views/form';
import ticketsUI from './views/tickets';
import currencyUI from './views/currency';


document.addEventListener('DOMContentLoaded', e => {
  const form = formUI.form;
  const containerTickets = document.querySelector(".tickets-sections .row");
  const containerFavorites = document.querySelector('.favorites .dropdown-content');

  // Events
  initApp();
  form.addEventListener('submit', e => {
    e.preventDefault();
    onFormSubmit();
  });

    containerTickets.addEventListener("click", onClickFavorite);
    containerFavorites.addEventListener("click", onClickFavoriteDelete);

  // handlers
  async function initApp() {
    favorites.init();
    await locations.init();
    formUI.setAutocompleteData(locations.shortCities);
  }

  async function onFormSubmit() {
    const origin = locations.getCityCodeByKey(formUI.originValue);
    const destination = locations.getCityCodeByKey(formUI.destinationValue);
    const depart_date = formUI.departDateValue;
    const return_date = formUI.returnDateValue;
    const currency = currencyUI.currecyValue;

    await locations.fetchTickets({
      origin,
      destination,
      depart_date,
      return_date,
      currency,
    });

    console.log(locations.lastSearch);
    ticketsUI.renderTickets(locations.lastSearch);

  }

    function onClickFavorite (e) {

        if(e.target.classList.contains("add-favorite")) {

            const ticketId = e.target.dataset.id;

            favorites.setFavoritesById(ticketId);

            console.log(ticketId);
        }

    }


    function onClickFavoriteDelete (e) {

        if(e.target.classList.contains("delete-favorite")) {

            const ticketId = e.target.dataset.id;

            favorites.deleteFavoritesById(ticketId);

        }

    }
});

// *1 - создать отдельный метод для получения airlines
// *2 - в init добавить получение airlines
// *3 - serializeAirlines
// *4 - serializeTickets и переделать serializeCities и createShortCities и getCityCodeByKey
// *5 - новые методы getAirlineNameByCode, getAirlineLogoByCode, getCityNameByCode
// *6 - TicketsUI
