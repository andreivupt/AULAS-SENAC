let sliderElement = document.querySelector("#slider");
let password      = document.querySelector("#password");

let containerPassword = document.querySelector("#container-password");
let sizePassword      = document.querySelector("#valor");

//fonte da senha randomica
let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#';
let novaSenha = '';

sizePassword.innerHTML = sliderElement.value;

slider.oninput = function() {
    sizePassword.innerHTML = this.value;
}

function generatePassword() {
    let pass = '';
    for(let i = 0, n = charset.length; i < sliderElement.value; i++) {
        pass += charset.charAt(Math.floor(Math.random() * n));
    }

    containerPassword.classList.remove("hide");
    password.innerHTML  = pass;
    novaSenha           = pass;
    console.log(pass);
}

function copyPassword() {
    alert("Senha copiada com sucesso!");
    navigator.clipboard.writeText(novaSenha);
}