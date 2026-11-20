
const defaultClothes = [
    {
        id: 1,
        name: "White Shirt",
        category: "Top",
        image: "images/shirt.jpg"
    },
    {
        id: 2,
        name: "Blue Jeans",
        category: "Bottom",
        image: "images/jeans.jpg"
    },
    {
        id: 3,
        name: "Pink Top",
        category: "Top",
        image: "images/top.jpg"
    },
    {
        id: 4,
        name: "Black Dress",
        category: "Dress",
        image: "images/dress.jpg"
    },
    {
        id: 5,
        name: "Kurthi",
        category: "Traditional Wear",
        image: "images/kurthi.jpg"
    }
];

let clothes = JSON.parse(localStorage.getItem("clothes")) || defaultClothes;

function saveClothes() {
    localStorage.setItem("clothes", JSON.stringify(clothes));
}
