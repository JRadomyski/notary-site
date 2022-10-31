const photo = document.querySelectorAll(".photo img")
const popUp = document.querySelector(".popup")
const popUpClose = document.querySelector(".popup__close")
const popupImg = document.querySelector(".popup__img")
const arrowLeft = document.querySelector(".popup__arrow--left")
const arrowRight = document.querySelector(".popup__arrow--right")

let currentImgIndex;


const showNextImg = () => {
    if (currentImgIndex === photo.length - 1) {
        currentImgIndex = 0;
    } else {
        currentImgIndex++;
    }
    popupImg.src = photo[currentImgIndex].src;
};

const showPreviousImg = () => {
    if (currentImgIndex === 0) {
        currentImgIndex = photo.length - 1;
    } else {
        currentImgIndex--;
    }
    popupImg.src = photo[currentImgIndex].src;
};

const closePopup = () => {
    popUp.classList.add("fade-out");
    setTimeout(() => {
        popUp.classList.add("hidden");
        popUp.classList.remove("fade-out");
        photo.forEach((element) => {
            element.setAttribute("tabindex", 1);
        });
    }, 300);
};

photo.forEach((thumbnail, index) => {
    const showPopup = (e) => {
        popUp.classList.remove("hidden");
        popupImg.src = e.target.src;
        currentImgIndex = index;
        photo.forEach((element) => {
            element.setAttribute("tabindex", -1);
        });
    };

    thumbnail.addEventListener("click", showPopup);

    thumbnail.addEventListener("keydown", (e) => {
        if (e.code === "Enter" || e.keyCode === 13) {
            showPopup(e);
        }
    });
});

popUpClose.addEventListener("click", closePopup);

arrowRight.addEventListener("click", showNextImg);

arrowLeft.addEventListener("click", showPreviousImg);

document.addEventListener("keydown", (e) => {
    if (!popUp.classList.contains("hidden")) {
        if (e.code === "ArrowRight" || e.keyCode === 39) {
            showNextImg();
        }

        if (e.code === "ArrowLeft" || e.keyCode === 37) {
            showPreviousImg();
        }
        // if (e.code === "ArrowUp" || e.keyCode === 39) {
        //     showNextImg();
        // }

        // if (e.code === "ArrowDown" || e.keyCode === 37) {
        //     showPreviousImg();
        // }

        if (e.code === "Escape" || e.keyCode === 27) {
            closePopup();
        }
    }
});

popUp.addEventListener("click", (e) => {
    if (e.target === popUp) {
        closePopup();
    }
});


let w, h, loopId, id, canvas, ctx, particles;

let options = {
    particleColor: "rgb(218, 37, 28)",
    lineColor: "rgb(218, 37, 28)",
    particleAmount: 40,
    defaultRadius: 2,
    variantRadius: 2,
    defaultSpeed: 1,
    variantSpeed: 0.1,
    linkRadius: 200
};

let rgb = options.lineColor.match(/\d+/g);

document.addEventListener("DOMContentLoaded", init);

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    resizeReset();
    initialiseElements();
    startAnimation();
}

function resizeReset() {
    w = canvas.width = window.innerHeight;
    h = canvas.height = window.innerHeight;
}

function initialiseElements() {
    particles = [];
    for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle());
    }
}

function startAnimation() {
    loopId = requestAnimationFrame(animationLoop);
}

function animationLoop() {
    ctx.clearRect(0,0,w,h);
    drawScene();

    id = requestAnimationFrame(animationLoop);
}

function drawScene() {
    drawLine();
    drawParticle();
}

function drawParticle() {
    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
}

function drawLine() {
    for (let i = 0; i < particles.length; i++) {
        linkPoints(particles[i], particles);
    }
}

function linkPoints(point, hubs) {
    for (let i = 0; i < hubs.length; i++) {
        let distance = checkDistance(point.x, point.y, hubs[i].x, hubs[i].y);
        let opacity = 1 - distance / options.linkRadius;
        if (opacity > 0) {
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = 'rgba('+rgb[0]+','+rgb[1]+','+rgb[2]+','+opacity+')';
            ctx.beginPath();
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(hubs[i].x, hubs[i].y);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

function checkDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

Particle = function() {
    let _this = this;

    _this.x = Math.random() * w;
    _this.y = Math.random() * h;
    _this.color = options.particleColor;
    _this.radius = options.defaultRadius + Math.random() * options.variantRadius;
    _this.speed = options.defaultSpeed + Math.random() * options.variantSpeed;
    _this.directionAngle = Math.floor(Math.random() * 360);
    _this.vector = {
        x: Math.cos(_this.directionAngle) * _this.speed,
        y: Math.sin(_this.directionAngle) * _this.speed
    }

    _this.update = function() {
        _this.border();
        _this.x += _this.vector.x;
        _this.y += _this.vector.y;
    }

    _this.border = function() {
        if (_this.x >= w || _this.x <= 0) {
            _this.vector.x *= -1;
        }
        if (_this.y >= h || _this.y <= 0) {
            _this.vector.y *= -1;
        }
        if (_this.x > w) _this.x = w;
        if (_this.y > h) _this.y = h;
        if (_this.x < 0) _this.x = 0;
        if (_this.y < 0) _this.y = 0;
    }

    _this.draw = function() {
        ctx.beginPath();
        ctx.arc(_this.x, _this.y, _this.radius, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fillStyle = _this.color;
        ctx.fill();
    }
}


const yearInFooter = document.querySelector('.footer__year');
const menuBtn = document.getElementById("menubtn");
const sideNav = document.getElementById("sideNav");
const menu = document.getElementById("menu");


sideNav.style.right = "-250px";


menuBtn.onclick = function(){
    if(sideNav.style.right == "-250px"){
        sideNav.style.right = "0";
        menu.src="img/icons/x.svg";
    }
    else{
        sideNav.style.right="-250px";
        menu.src="img/icons/menu.svg"
    }
}

const CurrentYear = () => {
    const year = (new Date).getFullYear();
    yearInFooter.innerText = year;
}

CurrentYear();
