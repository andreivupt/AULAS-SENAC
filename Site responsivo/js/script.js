let menu = document.querySelector('nav ul');
let menuBar = document.querySelector('nav .menu-icon');
let iconMenu = document.querySelector('nav .menu-icon img');

menuBar.addEventListener('click',function(){

    if (iconMenu.getAttribute("src") == './imagens/menu.png') {
        iconMenu.setAttribute("src","./imagens/close.png");
    }else{
        iconMenu.setAttribute("src","./imagens/menu.png");
    }

   menu.classList.toggle('active');
});