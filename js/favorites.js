
const container = document.getElementById("clothesContainer");

let selectedCloth = null;


// DISPLAY FAVORITE ITEMS

function displayFavorites() {

    const favoriteClothes = clothes.filter(function(item) {

        return item.favorite === true;

    });

    container.innerHTML = "";

    updateFavoriteCount(favoriteClothes.length);

    if (favoriteClothes.length === 0) {

        container.innerHTML = `
            <div class="empty-favorites">

                <h2>♡</h2>

                <h3>No Favorites Yet!</h3>

                <p>Explore your wardrobe and add your favorite pieces.</p>

            </div>
        `;

        return;

    }

    favoriteClothes.forEach(function(item) {

        container.innerHTML += `

            <div class="clothes-card" onclick="openModal(${item.id})">

                <div class="clothes-image">

                    <img src="${item.image}" alt="${item.name}">

                    <span class="category-tag">
                        ${item.category}
                    </span>

                </div>

                <div class="clothes-details">

                    <h3>${item.name}</h3>

                    <div class="buttons">

                        <button class="delete-btn"
                            onclick="event.stopPropagation(); removeFavorite(${item.id})">

                            ♥ Remove

                        </button>

                    </div>

                </div>

            </div>

        `;

    });

}


// FAVORITE COUNT

function updateFavoriteCount(count) {

    document.getElementById("favoriteCount").textContent =
        count + (count === 1 ? " Favorite" : " Favorites");

}


// REMOVE FAVORITE

function removeFavorite(id) {

    const item = clothes.find(function(item) {

        return item.id === id;

    });

    if (item) {

        item.favorite = false;

        saveClothes();

        displayFavorites();

    }

}


// OPEN MODAL

function openModal(id) {

    selectedCloth = clothes.find(function(item) {

        return item.id === id;

    });

    if (!selectedCloth) return;

    document.getElementById("modalImage").src = selectedCloth.image;

    document.getElementById("modalName").textContent = selectedCloth.name;

    document.getElementById("modalCategory").textContent = selectedCloth.category;

    updateFavoriteButton();

    document.getElementById("clothModal").style.display = "flex";

}


// CLOSE MODAL

function closeModal() {

    document.getElementById("clothModal").style.display = "none";

    selectedCloth = null;

}


// UPDATE MODAL BUTTON

function updateFavoriteButton() {

    const button = document.getElementById("favorites-Button");

    if (!button || !selectedCloth) return;

    button.textContent = selectedCloth.favorite
        ? "♥ Remove from Favorites"
        : "♡ Add to Favorites";

}


// TOGGLE FAVORITE

function toggleFavorite() {

    if (!selectedCloth) return;

    selectedCloth.favorite = !selectedCloth.favorite;

    saveClothes();

    closeModal();

    displayFavorites();

}


// CLOSE MODAL OUTSIDE CLICK

document.getElementById("clothModal").addEventListener("click", function(event) {

    if (event.target === this) {

        closeModal();

    }

});


// ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});


// INITIAL DISPLAY

displayFavorites();
