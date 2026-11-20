const container = document.getElementById("clothesContainer");

function displayClothes(items)
{
    container.innerHTML = "";

    items.forEach(function(item) {

        container.innerHTML += `
            <div class="clothes-card">
                <img src="${item.image}" alt="${item.name}">    
                <h3>${item.name}</h3>
                <p>${item.category}</p>

                <div class="buttons">
                    <button onclick="editClothes(${item.id})">Edit</button>
                    <button onclick="deleteClothes(${item.id})">Delete</button>
                </div>
            </div>
        `;
    });
}

displayClothes(clothes);

//delete functionality

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

//edit functionality

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

