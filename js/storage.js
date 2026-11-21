
const defaultClothes = [
    {
        id: 1,
        name: "jersey",
        category: "Top",
        image: "../images/jersey.jpg",
        favorite: false
    },
    {
        id: 2,
        name: "Blue Jeans",
        category: "Bottom",
        image: "../images/blueJeans.jpg",
        favorite: false
    },
    {
        id: 3,
        name: "black skirt",
        category: "bottom",
        image: "../images/skirt.jpg",
        favorite: false
    },
    {
        id: 4,
        name: "Dress",
        category: "Dress",
        image: "../images/dress.jpg",
        favorite: false
    },
    {
        id: 5,
        name: "Kurthi",
        category: "Traditional Wear",
        image: "../images/kurthi.jpg",
        favorite: false
    }
];

let clothes = JSON.parse(localStorage.getItem("clothes")) || defaultClothes;

function saveClothes() {
    localStorage.setItem("clothes", JSON.stringify(clothes));
}
