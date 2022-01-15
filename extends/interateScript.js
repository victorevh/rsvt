// Menu
class MobileNavbar {
    
    constructor(mobileMenu, navList, navLinks) {
        this.mobileMenu = document.querySelector(mobileMenu);
        this.navList = document.querySelector(navList);
        this.navLinks = document.querySelectorAll(navLinks);
        this.activeClass = "active";
        this.handleClick = this.handleClick.bind(this);
    }

    animateLinks() {
        this.navLinks.forEach((link) => {
            link.style.animation
                ? (link.style.animation = "")
                : (link.style.animation = `navLinkFade 0.5s ease forwards 0.3s`);
        });
    }

    handleClick() {
        this.navList.classList.toggle(this.activeClass);
        this.mobileMenu.classList.toggle(this.activeClass);
        this.animateLinks();
    }

    addClickEvent() {
        this.mobileMenu.addEventListener("click", this.handleClick);
    }

    init() {
        if (this.mobileMenu) {
            this.addClickEvent();
        }
        return this;
    }
}

const mobileNavbar = new MobileNavbar(
    ".mobile-menu",
    ".nav-list",
    ".nav-list li",
);

mobileNavbar.init()

// Seções

function Mudarestado(el) {
    var display = document.getElementById(el).style.display;
    
    if(display == "block")
        document.getElementById(el).style.display = 'none';
    else
        document.getElementById(el).style.display = 'block';
        
}

function Mudaricon(icon) {
    var display = document.getElementById(icon).style.display;
    var img = document.getElementById('bttn');
    var img1 = document.getElementById('bttn1');
    if(display == "block"){
        img.style.transform = 'rotate(0deg)'
    }else{
        img.style.transform = 'rotate(180deg)'
    }
}
/*
function Mudaricon(){
    var pontos = document.getElementById("minhaDiv3")
    var img = document.getElementById("bttn");
    if(pontos.style.display === "block"){
        img.style.transform = "rotate(0deg)"
    }else{
        img.style.transform = "rotate(180deg)"
    }
}
*/

// Scroll

// identifica click no menu
const menuItems = document.querySelectorAll('.nav-list a[href^="#"]');

// Verifica o item que foi clicado
menuItems.forEach(item => {
    item.addEventListener('click', scrollToIdOnClick);
})

// faz referência entre o HREF e item
function gerScrollTopByHref(element){
    const id = element.getAttribute('href');
    return document.querySelector(id).offsetTop;
    
}

// Trata o clique prevenindo o evento padrão do HTML e define a distancia do alvo
function scrollToIdOnClick(event) {
    event.preventDefault();
    const to = gerScrollTopByHref(event.target) - 25;

    scrollToPosition(to);

}

// Scroll Suave
function scrollToPosition(to) {
    window.scroll({
        top: to,
        behavior: "smooth",
    })
}

