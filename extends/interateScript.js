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
    
    if(display == "block"){
        document.getElementById(el).style.display = 'none'
    }else{
        document.getElementById(el).style.display = 'block'
    }    
}


// ROTAÇÃO DO BOTÃO


document.addEventListener("DOMContentLoaded",function(){
    
    document.getElementById("bttn3").addEventListener("click",function(){

        var img = document.getElementById("img3");
        
        if(img.style.transform == "scale(-1)") {
            
            img.style.transform = 'scale(1)'
       
        }else{
            
            img.style.transform = 'scale(-1)'
       
        }
    })

    document.getElementById("bttn2").addEventListener("click",function(){

        var img = document.getElementById("img2");
        
        if(img.style.transform == "scale(-1)") {
            
            img.style.transform = 'scale(1)'
       
        }else{
            
            img.style.transform = 'scale(-1)'
       
        }
    })

    document.getElementById("bttn1").addEventListener("click",function(){

        var img = document.getElementById("img1");
        
        if(img.style.transform == "scale(-1)") {
            
            img.style.transform = 'scale(1)'
       
        }else{
            
            img.style.transform = 'scale(-1)'
       
        }
    })

    document.getElementById("bttn").addEventListener("click",function(){

        var img = document.getElementById("img");
        
        if(img.style.transform == "scale(-1)") {
            
            img.style.transform = 'scale(1)'
       
        }else{
            
            img.style.transform = 'scale(-1)'
       
        }
    })
    
})

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
    const to = gerScrollTopByHref(event.target) - 120;

    scrollToPosition(to);

}

// Scroll Suave
function scrollToPosition(to) {
    window.scroll({
        top: to,
        behavior: "smooth",
    })
}


// Dark Mode

const html  = document.querySelector("html")
const checkbox = document.querySelector("input[name=theme]")

const getStyle = (element, style) => 
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    bg: getStyle(html, "--bg"),
    bgSecondary: getStyle(html, "--bg-secondary"),
    borderPrimary: getStyle(html, "--border-primary"),
    borderMenu: getStyle(html, "--border-menu"),
    bgPanel: getStyle(html, "--bg-panel"),
    colorHeadings: getStyle(html, "--color-headings"),
    colorText: getStyle(html, "--color-text"),
    colorTable: getStyle(html, "--color-table"),
    colorTablechild: getStyle(html, "--color-tablechild"),
    colorHtable: getStyle(html, "--color-htable"),
}

const darkMode = {
    bg: "#333333",
    bgSecondary: "#333333",
    borderPrimary: "#B5B5B5",
    borderMenu: "#52525e",
    bgPanel: "#434343",
    colorHeadings: "#B5B5B5",
    colorText: "#B5B5B5",
    colorTable: "#434343",
    colorTablechild: "#434343",
    colorHtable: "#121C1B",
}

const transformKey = key => 
    "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key=>
        html.style.setProperty(transformKey(key), colors[key])    
    )
}

checkbox.addEventListener("change", ({target}) => {
    target.checked ? changeColors(darkMode) : changeColors (initialColors)
}) 

