
const clothes = [
    {
        name: "White Shirt",
        category: "Top",
        image: "images/shirt.jpg"
    },
    {
        name: "Blue Jeans",
        category: "Bottom",
        image: "images/jeans.jpg"
    },
    {
        name: "Pink Top",
        category: "Top",
        image: "images/top.jpg"
    },
    {
        name: "Black Dress",
        category: "Dress",
        image: "images/dress.jpg"
    }
];

const container = document.getElementById("clothesContainer");

clothes.forEach(function(item) {

    container.innerHTML += `
        <div class="clothes-card">

            <img src="${item.image}" alt="${item.name}">

            <div class="clothes-details">
                <h3>${item.name}</h3>
                <p>${item.category}</p>

                <div class="buttons">
                    <button>Edit</button>
                    <button>Delete</button>
                </div>
            </div>

        </div>
    `;

});
