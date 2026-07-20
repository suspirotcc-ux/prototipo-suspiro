// =====================================
// CARREGAR DADOS DO USUÁRIO
// =====================================

const nomeUsuario = document.getElementById("nomeUsuario");
const arroba = document.getElementById("arroba");
const bio = document.getElementById("bio");
const inicial = document.getElementById("inicial");

// Dados vindos do login/cadastro

const nomeSalvo = localStorage.getItem("nome");
const usuarioSalvo = localStorage.getItem("usuario");
const bioSalva = localStorage.getItem("bio");

// Nome

if(nomeSalvo){

    nomeUsuario.textContent = nomeSalvo;
    inicial.textContent = nomeSalvo.charAt(0).toUpperCase();

}

// Arroba

if(usuarioSalvo){

    arroba.textContent = usuarioSalvo;

}

// Bio

if(bioSalva){

    bio.textContent = bioSalva;

}

// =====================================
// ELEMENTOS DO MODAL
// =====================================

const modal = document.getElementById("modal");

const editarPerfil = document.getElementById("editarPerfil");

const cancelar = document.getElementById("cancelar");

const salvar = document.getElementById("salvar");

const novoNome = document.getElementById("novoNome");

const novoUsuario = document.getElementById("novoUsuario");

const novaBio = document.getElementById("novaBio");

// =====================================
// ABRIR MODAL
// =====================================

editarPerfil.addEventListener("click",()=>{

    modal.classList.add("ativo");

    novoNome.value = nomeUsuario.textContent;

    novoUsuario.value = arroba.textContent.replace("@","");

    novaBio.value = bio.textContent;

});

// =====================================
// FECHAR MODAL
// =====================================

cancelar.addEventListener("click",()=>{

    modal.classList.remove("ativo");

});

// Fecha clicando fora

modal.addEventListener("click",(e)=>{

    if(e.target===modal){

        modal.classList.remove("ativo");

    }

});

// =====================================
// SALVAR ALTERAÇÕES
// =====================================

salvar.addEventListener("click",()=>{

    const nome = novoNome.value.trim();

    const usuario = novoUsuario.value.trim();

    const biografia = novaBio.value.trim();

    if(nome===""){

        alert("Digite seu nome.");

        return;

    }

    nomeUsuario.textContent = nome;

    arroba.textContent = "@" + usuario;

    bio.textContent = biografia;

    inicial.textContent = nome.charAt(0).toUpperCase();

    // salva

    localStorage.setItem("nome",nome);

    localStorage.setItem("usuario","@" + usuario);

    localStorage.setItem("bio",biografia);

    modal.classList.remove("ativo");

});
