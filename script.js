const yearInFooter = document.querySelector('.footer__year');
const menuBtn = document.getElementById("menubtn");
const sideNav = document.getElementById("sideNav");
const menu = document.getElementById("menu");


sideNav.style.right = "-250px";


menuBtn.onclick = function () {
    if (sideNav.style.right == "-250px") {
        sideNav.style.right = "0";
        menu.src = "img/icons/x.svg";
    } else {
        sideNav.style.right = "-250px";
        menu.src = "img/icons/menu.svg"
    }
}

const CurrentYear = () => {
    const year = (new Date).getFullYear();
    yearInFooter.innerText = year;
}

CurrentYear();
