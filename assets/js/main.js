/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
        // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',

    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
        // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 50) header.classList.add('scroll-header');
    else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: 'true',
    spaceBetween: 16,
});

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 460) scrollUp.classList.add('show-scroll');
    else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`, { interval: 100 })
sr.reveal(`.about__data, .discount__img`, { origin: 'left' })
sr.reveal(`.about__img, .discount__data`, { origin: 'right' })


var players = {}; // Object to store all YouTube video players
var player;

function onYouTubeIframeAPIReady() {
    var videoContainers = document.querySelectorAll('.video-container');
    videoContainers.forEach(function(container, index) {
        var videoId = container.id; // Extract the video ID from the container ID (e.g., 'video1' becomes '1')
        players[index] = new YT.Player(container.id, {
            height: '360',
            width: '640',
            videoId: videoId, // Use the extracted video ID as the videoId
            playerVars: {
                'autoplay': 0, // Autoplay will be triggered later when in view
                'controls': 1, // Show video controls
                'loop': 1, // Loop the video
                'modestbranding': 1, // Remove YouTube logo
                'rel': 0, // Don't show related videos at the end
                'showinfo': 1, // Hide video title and uploader information
                'mute': 1 // Auto-mute the video
            },
            events: {
                'onReady': onPlayerReady
            }
        });
    });
    player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        videoId: 'GM7ZIPKmPlY', // Replace ABC123 with your video ID
        playerVars: {
            'autoplay': 1, // Autoplay the video
            'controls': 1, // Show video controls
            'loop': 1, // Loop the video
            'modestbranding': 1, // Remove YouTube logo
            'rel': 0, // Don't show related videos at the end
            'showinfo': 0, // Hide video title and uploader information
            'mute': 1 // Auto-mute the video
        },
        events: {
            'onReady': onPlayerReady2
        }
    });
}

function onPlayerReady(event) {
    // Autoplay the video when it comes into view
    var videoId = event.target.getVideoData().video_id;
    if (isElementInViewport(event.target.getIframe())) {
        event.target.playVideo();
    } else {
        var scrollListener = function() {
            if (isElementInViewport(event.target.getIframe())) {
                event.target.playVideo();
                window.removeEventListener('scroll', scrollListener);
            }
        };
        window.addEventListener('scroll', scrollListener);
    }
}

function isElementInViewport(element) {
    var rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};



function onPlayerReady2(event) {
    // Autoplay the video when the player is ready
    event.target.playVideo();
}