const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let  imagesLoaded = 0;
let totalImages = 0;
let phtosArray = [];


let isInitialzied = true //New LIne

let initialCount = 5; //Updated 
const apiKey = 'kEoZ1liVClqScCGPBs_RMyzp502sit0jRyWklc1B3UE';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//New Block
function updateAPIURLWithNewCount (picCount) {
    apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${picCount}`;
}

function imgLoaded() {
    //counter for every image that is loaded
    imagesLoaded++

    if (imagesLoaded === totalImages) {
        ready = true;
        loader.hidden = true;
    }

}

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function displayPhotos() {
    imagesLoaded = 0;
    totalImages - photosArray.length;
    console.log('total images', totalImages)
    photosArray.forEach(photo => {
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        })
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular, 
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        img.addEventListener('load', imgLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

async function getPhotosUnSplash() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        //New Line
        if (isInitialzied) {
            updateAPIURLWithNewCount(30)
            isInitialzied = false;
        }
    }
    catch (error) {
        console.log(error.message);
    }
}

//Check to see if scrolling near bottom of page, Load More Photos
// window represents the entire browser window
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready)  {
        ready = false;
        getPhotosUnSplash();
    }
})

getPhotosUnSplash();