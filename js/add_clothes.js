
const form = document.getElementById("clothesForm");

const imageFile = document.getElementById("imageFile");
const imageUrl = document.getElementById("imageUrl");

const imagePreview = document.getElementById("imagePreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");

const formMessage = document.getElementById("formMessage");

let selectedFile = null;


// SHOW IMAGE PREVIEW

function showPreview(source) {

    imagePreview.src = source;

    imagePreview.style.display = "block";

    uploadPlaceholder.style.display = "none";

}


// RESET IMAGE PREVIEW

function resetPreview() {

    imagePreview.src = "";

    imagePreview.style.display = "none";

    uploadPlaceholder.style.display = "block";

}


// IMAGE FILE SELECTION

imageFile.addEventListener("change", function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

        formMessage.textContent = "Please select a valid image.";

        selectedFile = null;

        this.value = "";

        return;

    }

    if (file.size > 10 * 1024 * 1024) {

        formMessage.textContent = "Image must be smaller than 10 MB.";

        selectedFile = null;

        this.value = "";

        return;

    }

    selectedFile = file;

    imageUrl.value = "";

    formMessage.textContent = "";

    const reader = new FileReader();

    reader.onload = function(event) {

        showPreview(event.target.result);

    };

    reader.readAsDataURL(file);

});


// IMAGE URL PREVIEW

imageUrl.addEventListener("input", function() {

    if (selectedFile) return;

    const url = this.value.trim();

    if (!url) {

        resetPreview();

        return;

    }

    showPreview(url);

});


// COMPRESS IMAGE BEFORE SAVING

function compressImage(file) {

    return new Promise(function(resolve, reject) {

        const image = new Image();

        const objectURL = URL.createObjectURL(file);

        image.onload = function() {

            const canvas = document.createElement("canvas");

            const maxSize = 900;

            let width = image.width;

            let height = image.height;

            if (width > height && width > maxSize) {

                height = height * (maxSize / width);

                width = maxSize;

            } else if (height > maxSize) {

                width = width * (maxSize / height);

                height = maxSize;

            }

            canvas.width = Math.round(width);

            canvas.height = Math.round(height);

            const context = canvas.getContext("2d");

            context.fillStyle = "#FFFFFF";

            context.fillRect(0, 0, canvas.width, canvas.height);

            context.drawImage(image, 0, 0, canvas.width, canvas.height);

            const compressedImage = canvas.toDataURL("image/jpeg", 0.78);

            URL.revokeObjectURL(objectURL);

            resolve(compressedImage);

        };

        image.onerror = function() {

            URL.revokeObjectURL(objectURL);

            reject(new Error("Unable to process this image."));

        };

        image.src = objectURL;

    });

}


// CHECK IMAGE URL

function validateImageURL(url) {

    return new Promise(function(resolve, reject) {

        const image = new Image();

        image.onload = function() {

            resolve(url);

        };

        image.onerror = function() {

            reject(new Error("Image URL is invalid or inaccessible."));

        };

        image.src = url;

    });

}


// SAVE CLOTHING

form.addEventListener("submit", async function(event) {

    event.preventDefault();

    formMessage.textContent = "";

    const name = document.getElementById("itemName").value.trim();

    const category = document.getElementById("itemCategory").value;

    const description = document.getElementById("itemDescription").value.trim();

    const url = imageUrl.value.trim();

    if (!name || !category) {

        formMessage.textContent = "Please fill in all required fields.";

        return;

    }

    if (!selectedFile && !url) {

        formMessage.textContent = "Please upload an image or enter an image URL.";

        return;

    }

    try {

        let image;

        if (selectedFile) {

            image = await compressImage(selectedFile);

        } else {

            image = await validateImageURL(url);

        }

        const newCloth = {

            id: Date.now(),

            name: name,

            category: category,

            image: image,

            description: description,

            favorite: false

        };

        clothes.push(newCloth);

        try {

            saveClothes();

        } catch (error) {

            clothes.pop();

            throw error;

        }

        formMessage.textContent = "Clothing added successfully! ♡";

        formMessage.style.color = "#52734D";

        form.reset();

        selectedFile = null;

        resetPreview();

    } catch (error) {

        console.error(error);

        formMessage.textContent =
            error.name === "QuotaExceededError"
                ? "Storage is full. Please use a smaller image or cloud storage."
                : error.message || "Something went wrong. Please try again.";

        formMessage.style.color = "#A33A3A";

    }

});


// CLEAR FORM

form.addEventListener("reset", function() {

    selectedFile = null;

    resetPreview();

    formMessage.textContent = "";

});
