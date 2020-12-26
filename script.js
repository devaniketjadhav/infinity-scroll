const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

//Unsplash API
const count = 30;
const apiKey = 'WWrW7GTUEAPuTOeRfY0NJNbZwHU29zIh63Hc-Hcn8pc';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//Check if all images were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
    }
}

//Helper function to set attributes
function setAttribute(element, attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

//Create elements for links and photos, add that to DOM
function displayPhotos(){
    totalImages = photosArray.length;
    imagesLoaded = 0;
    //run function for each items in photosArray
    photosArray.forEach(photos => {
        //Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttribute(item,{
            href : photos.links.html,
            target:'_blank',
        });
        //Create <img> for photo
        const image = document.createElement('img');
        setAttribute(image,{
            src : photos.urls.regular,
            alt : photos.alt_description,
            title : photos.alt_description,
        })
        //Event Listener, check when each is finished loading
        image.addEventListener('load', imageLoaded);
        //Put the <img> inside anchor element and put both in Image container element
        item.appendChild(image);
        imageContainer.appendChild(item);
    });
}

//Get photos from unsplash APIs
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch(error){
        //Catch error here
    }
}

//Check to see if scrolling near bottom of the page, Load more photos
window.addEventListener('scroll',()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
})

getPhotos();