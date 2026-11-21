
const container = document.getElementById("clothesContainer");

function displayClothes(items) {

    container.innerHTML = "";

    items.forEach(function(item) {

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

                        <button class="edit-btn"
                            onclick="event.stopPropagation(); editClothes(${item.id})">
                            Edit
                        </button>

                        <button class="delete-btn"
                            onclick="event.stopPropagation(); deleteClothes(${item.id})">
                            Delete
                        </button>

                    </div>

                </div>

            </div>
        `;

    });

}

displayClothes(clothes);


// DELETE FUNCTIONALITY

function deleteClothes(id) {

    const confirmDelete = confirm("Are you sure you want to delete this item?");

    if (confirmDelete) {

        const index = clothes.findIndex(item => item.id === id);

        if (index !== -1) {

            clothes.splice(index, 1);

            saveClothes();

            displayClothes(clothes);

        }

    }

}


// EDIT FUNCTIONALITY

function editClothes(id) {

    const item = clothes.find(item => item.id === id);

    if (item) {

        const newName = prompt("Enter new name:", item.name);

        const newCategory = prompt("Enter new category:", item.category);

        const newImage = prompt("Enter new image URL:", item.image);

        if (newName && newCategory && newImage) {

            item.name = newName;
            item.category = newCategory;
            item.image = newImage;

            saveClothes();

            displayClothes(clothes);

        }

    }

}


// FILTER FUNCTIONALITY

function filterClothes() {

    const category = document.getElementById("categoryFilter").value;

    if (category === "") {

        displayClothes(clothes);

    } else {

        const filteredClothes = clothes.filter(function(item) {

            return item.category.toLowerCase() === category.toLowerCase();

        });

        displayClothes(filteredClothes);

    }

}


// CLOTHING DETAILS MODAL

let selectedCloth = null;

function openModal(id) {

    selectedCloth = clothes.find(cloth => cloth.id === id);

    if (!selectedCloth) return;

    document.getElementById("modalImage").src = selectedCloth.image;

    document.getElementById("modalName").textContent = selectedCloth.name;

    document.getElementById("modalCategory").textContent = selectedCloth.category;

    updateFavoriteButton();

    document.getElementById("clothModal").style.display = "flex";

}


function closeModal() {

    document.getElementById("clothModal").style.display = "none";

    selectedCloth = null;

}

// FAVOURITE COUNT
function updateFavoriteCount() {

    const count = clothes.filter(function(item) {
        return item.favorite === true;
    }).length;

    const counter = document.getElementById("favoriteCount");

    if (counter) {
        counter.textContent = count;
    }

}


// FAVORITE FUNCTIONALITY

function toggleFavorite() {

    if (!selectedCloth) return;

    selectedCloth.favorite = !selectedCloth.favorite;

    saveClothes();

    updateFavoriteButton();

}


function updateFavoriteButton() {

    const button = document.getElementById("favoriteBtn");

    button.textContent = selectedCloth.favorite
        ? "♥ Remove from Favorites"
        : "♡ Add to Favorites";

}


// CLOSE MODAL WHEN CLICKING OUTSIDE

document.getElementById("clothModal").addEventListener("click", function(event) {

    if (event.target === this) {

        closeModal();

    }

});


// CLOSE MODAL WITH ESCAPE KEY

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeModal();

    }

});

saveClothes();
updateFavoriteButton();
updateFavoriteCount();
