import locations from '../store/locations';
import favoritesUI from "../views/favorites";
import currencyUI from "../views/currency";

class Favorites {
    constructor (locations, favoritesUI, currency) {
        this.favorites = {};
        this.locations = locations;
        this.favoritesUI = favoritesUI;
        this.currencySymbol = currency.currencySymbol;
    }

    init () {
        this.favorites = this.getFavorites() || {};
        console.log(this);
        this.favoritesUI.renderFavoritesItems(this.favorites);
    }

    setFavoritesById (key) {
        const ticket = Object.values(this.locations.lastSearch).find(
            item => item.id === key,
        );
        this.setFavorites(ticket)
    }

    setFavorites (item) {
        if(!this.favorites[item.id]) {
            item["cur"] = this.currencySymbol;
            this.favorites[item.id] = item;
            localStorage.setItem("favorites", JSON.stringify(this.favorites));
        }

        this.favoritesUI.renderFavoritesItems(this.favorites);
    }

    getFavorites () {
        return JSON.parse(localStorage.getItem("favorites"));
    }

    deleteFavoritesById (key) {
        delete this.favorites[key];

        localStorage.setItem("favorites", JSON.stringify(this.favorites));

        this.favoritesUI.renderFavoritesItems(this.favorites);
    }

}

const favorites = new Favorites(locations, favoritesUI, currencyUI);

export default favorites;