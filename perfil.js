// ===============================
// ELEMENTOS
// ===============================

const modal = document.getElementById("modal");

const editarPerfil = document.getElementById("editarPerfil");

const cancelar = document.getElementById("cancelar");

const salvar = document.getElementById("salvar");

const novoPost = document.getElementById("novoPost");

const nome = document.getElementById("nomeUsuario");

const usuario = document.getElementById("arroba");

const bio = document.getElementById("bio");

const inicial = document.getElementById("inicial");

const posts = document.getElementById("posts");

const publicacoes = document.querySelector(".publicacoes");

// ===============================
// MODAL EDITAR PERFIL
// ===============================

editarPerfil.onclick = () => {

    modal.style.display = "flex";

}

cancelar.onclick = () => {

    modal.style.display = "none";

}

salvar.onclick = () => {

    const novoNome = document.getElementById("novoNome").value.trim();

    const novoUsuario = document.getElementById("novoUsuario").value.trim();

    const novaBio = document.getElementById("novaBio").value.trim();

    if(novoNome !== ""){

        nome.innerHTML = novoNome;

        inicial.innerHTML = novoNome.charAt(0).toUpperCase();

        localStorage.setItem("nome", novoNome);

    }

    if(novoUsuario !== ""){

        usuario.innerHTML = "@" + novoUsuario.replace("@","");

        localStorage.setItem("usuario", "@" + novoUsuario.replace("@",""));

    }

    if(novaBio !== ""){

        bio.innerHTML = novaBio;

        localStorage.setItem("bio", novaBio);

    }

    modal.style.display = "none";

}

// ===============================
// NOVA PUBLICAÇÃO
// ===============================

novoPost.onclick = () => {

    let texto = prompt("O que você gostaria de compartilhar?");

    if(texto == null || texto.trim() == "") return;

    criarPost(texto);

}

// ===============================
// CRIAR POST
// ===============================

function criarPost(texto){

    const card = document.createElement("div");

    card.className = "post";

    card.innerHTML = `

        <div class="post-topo">

            <div class="mini-foto">${inicial.innerHTML}</div>

            <div>

                <strong>${nome.innerHTML}</strong>

                <p>${usuario.innerHTML}</p>

            </div>

        </div>

        <div class="texto-post">

            ${texto}

        </div>

        <div class="post-acoes">

            <button>❤️ Curtir</button>

            <button>💬 Comentar</button>

            <button>🔖 Salvar</button>

        </div>

    `;

    const vazio = document.querySelector(".sem-post");

    if(vazio){

        vazio.remove();

    }

    publicacoes.appendChild(card);

    salvarPost(texto);

    atualizarContador();

}

// ===============================
// CARREGAR POSTS
// ===============================

function criarPostSemSalvar(texto){

    const card = document.createElement("div");

    card.className = "post";

    card.innerHTML = `

        <div class="post-topo">

            <div class="mini-foto">${inicial.innerHTML}</div>

            <div>

                <strong>${nome.innerHTML}</strong>

                <p>${usuario.innerHTML}</p>

            </div>

        </div>

        <div class="texto-post">

            ${texto}

        </div>

        <div class="post-acoes">

            <button>❤️ Curtir</button>

            <button>💬 Comentar</button>

            <button>🔖 Salvar</button>

        </div>

    `;

    const vazio = document.querySelector(".sem-post");

    if(vazio){

        vazio.remove();

    }

    publicacoes.appendChild(card);

    atualizarContador();

}

// ===============================
// CONTADOR
// ===============================

function atualizarContador(){

    const quantidade = document.querySelectorAll(".post").length;

    posts.innerHTML = quantidade;

}

// ===============================
// LOCAL STORAGE
// ===============================

function salvarPost(texto){

    let lista = JSON.parse(localStorage.getItem("posts")) || [];

    lista.push(texto);

    localStorage.setItem("posts", JSON.stringify(lista));

}

function carregarPosts(){

    let lista = JSON.parse(localStorage.getItem("posts")) || [];

    lista.forEach(texto => {

        criarPostSemSalvar(texto);

    });

}

// ===============================
// CARREGAR PERFIL
// ===============================

window.onload = () => {

    if(localStorage.getItem("nome")){

        nome.innerHTML = localStorage.getItem("nome");

        inicial.innerHTML = localStorage.getItem("nome").charAt(0).toUpperCase();

    }

    if(localStorage.getItem("usuario")){

        usuario.innerHTML = localStorage.getItem("usuario");

    }

    if(localStorage.getItem("bio")){

        bio.innerHTML = localStorage.getItem("bio");

    }

    carregarPosts();

}
