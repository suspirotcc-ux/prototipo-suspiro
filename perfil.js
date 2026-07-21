// ======================================================
// SUSPIRO - PERFIL
// ======================================================

// =====================================
// DADOS DO PERFIL
// =====================================

const nomeUsuario = document.getElementById("nomeUsuario");
const arroba = document.getElementById("arroba");
const bio = document.getElementById("bio");
const inicial = document.getElementById("inicial");
const contadorPosts = document.getElementById("posts");

// =====================================
// BOTÕES
// =====================================

const editarPerfil = document.getElementById("editarPerfil");
const salvarPerfil = document.getElementById("salvar");

const novoPost = document.getElementById("novoPost");

const btnFoto = document.getElementById("btnFoto");
const btnPensamento = document.getElementById("btnPensamento");

const publicarFoto = document.getElementById("publicarFoto");
const publicarPensamento = document.getElementById("publicarPensamento");

// =====================================
// MODAIS
// =====================================

const modalEditar = document.getElementById("modalEditar");
const modalPost = document.getElementById("modalPost");
const modalFoto = document.getElementById("modalFoto");
const modalPensamento = document.getElementById("modalPensamento");
const modalTop = document.getElementById("modalTop");

// =====================================
// FECHAR MODAIS
// =====================================

document.getElementById("fecharEditar").onclick = () => {

    modalEditar.style.display = "none";

}

document.getElementById("fecharModal").onclick = () => {

    modalPost.style.display = "none";

}

document.getElementById("fecharFoto").onclick = () => {

    modalFoto.style.display = "none";

}

document.getElementById("fecharPensamento").onclick = () => {

    modalPensamento.style.display = "none";

}

document.getElementById("fecharTop").onclick = () => {

    modalTop.style.display = "none";

}

// =====================================
// ABRIR MODAIS
// =====================================

editarPerfil.onclick = () => {

    modalEditar.style.display = "flex";

}

novoPost.onclick = () => {

    modalPost.style.display = "flex";

}

btnFoto.onclick = () => {

    modalPost.style.display = "none";

    modalFoto.style.display = "flex";

}

btnPensamento.onclick = () => {

    modalPost.style.display = "none";

    modalPensamento.style.display = "flex";

}

// =====================================
// CARREGAR PERFIL
// =====================================

function carregarPerfil(){

    const nome = localStorage.getItem("nome");
    const usuario = localStorage.getItem("usuario");
    const textoBio = localStorage.getItem("bio");

    if(nome){

        nomeUsuario.textContent = nome;

        inicial.textContent = nome.charAt(0).toUpperCase();

    }

    if(usuario){

        arroba.textContent = usuario;

    }

    if(textoBio){

        bio.textContent = textoBio;

    }

}

carregarPerfil();

// =====================================
// SALVAR PERFIL
// =====================================

salvarPerfil.onclick = () => {

    const novoNome = document.getElementById("novoNome").value.trim();

    const novoUsuario = document.getElementById("novoUsuario").value.trim();

    const novaBio = document.getElementById("novaBio").value.trim();

    if(novoNome !== ""){

        localStorage.setItem("nome",novoNome);

    }

    if(novoUsuario !== ""){

        localStorage.setItem("usuario","@" + novoUsuario.replace("@",""));

    }

    if(novaBio !== ""){

        localStorage.setItem("bio",novaBio);

    }

    carregarPerfil();

    modalEditar.style.display="none";

}

// =====================================
// TOP FAVORITOS
// =====================================

let categoriaAtual = "";

const pesquisaTop = document.getElementById("pesquisaTop");

const listaResultados = document.getElementById("listaResultados");

function abrirModal(tipo){

    categoriaAtual = tipo;

    modalTop.style.display = "flex";

    pesquisaTop.value = "";

    mostrarResultados("");

}

pesquisaTop.onkeyup = () => {

    mostrarResultados(pesquisaTop.value);

};
// =====================================
// LISTA DA CATEGORIA
// =====================================

function listaCategoria(){

    if(categoriaAtual === "filme") return filmes;

    if(categoriaAtual === "livro") return livros;

    if(categoriaAtual === "jogo") return jogos;

    if(categoriaAtual === "musica") return musicas;

    return [];

}

// =====================================
// MOSTRAR RESULTADOS
// =====================================

function mostrarResultados(texto){

    listaResultados.innerHTML = "";

    const lista = listaCategoria();

    lista
    .filter(item =>
        item.nome.toLowerCase().includes(texto.toLowerCase())
    )
    .forEach(item=>{

        const div = document.createElement("div");

        div.className = "resultado";

        div.innerHTML = `

            <img src="${item.capa}">

            <div>

                <h4>${item.nome}</h4>

                <span>Clique para selecionar</span>

            </div>

        `;

        div.onclick = ()=>{

            selecionarFavorito(item);

        };

        listaResultados.appendChild(div);

    });

}

// =====================================
// PRIMEIRA MAIÚSCULA
// =====================================

function primeiraMaiuscula(texto){

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

// =====================================
// ESCOLHER FAVORITO
// =====================================

function selecionarFavorito(item){

    const nome = document.getElementById(
        "nome" + primeiraMaiuscula(categoriaAtual)
    );

    const capa = document.getElementById(
        "capa" + primeiraMaiuscula(categoriaAtual)
    );

    nome.textContent = item.nome;

    capa.src = item.capa;

    localStorage.setItem(

        "top_" + categoriaAtual,

        JSON.stringify(item)

    );

    modalTop.style.display = "none";

}

// =====================================
// CARREGAR FAVORITOS
// =====================================

function carregarFavoritos(){

    ["filme","livro","jogo","musica"].forEach(tipo=>{

        const salvo = localStorage.getItem("top_" + tipo);

        if(!salvo) return;

        const item = JSON.parse(salvo);

        document.getElementById(
            "nome" + primeiraMaiuscula(tipo)
        ).textContent = item.nome;

        document.getElementById(
            "capa" + primeiraMaiuscula(tipo)
        ).src = item.capa;

    });

}

carregarFavoritos();
// =====================================
// LISTA DA CATEGORIA
// =====================================

function listaCategoria(){

    if(categoriaAtual === "filme") return filmes;

    if(categoriaAtual === "livro") return livros;

    if(categoriaAtual === "jogo") return jogos;

    if(categoriaAtual === "musica") return musicas;

    return [];

}

// =====================================
// MOSTRAR RESULTADOS
// =====================================

function mostrarResultados(texto){

    listaResultados.innerHTML = "";

    const lista = listaCategoria();

    lista
    .filter(item =>
        item.nome.toLowerCase().includes(texto.toLowerCase())
    )
    .forEach(item=>{

        const div = document.createElement("div");

        div.className = "resultado";

        div.innerHTML = `

            <img src="${item.capa}">

            <div>

                <h4>${item.nome}</h4>

                <span>Clique para selecionar</span>

            </div>

        `;

        div.onclick = ()=>{

            selecionarFavorito(item);

        };

        listaResultados.appendChild(div);

    });

}

// =====================================
// PRIMEIRA MAIÚSCULA
// =====================================

function primeiraMaiuscula(texto){

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

// =====================================
// ESCOLHER FAVORITO
// =====================================

function selecionarFavorito(item){

    const nome = document.getElementById(
        "nome" + primeiraMaiuscula(categoriaAtual)
    );

    const capa = document.getElementById(
        "capa" + primeiraMaiuscula(categoriaAtual)
    );

    nome.textContent = item.nome;

    capa.src = item.capa;

    localStorage.setItem(

        "top_" + categoriaAtual,

        JSON.stringify(item)

    );

    modalTop.style.display = "none";

}

// =====================================
// CARREGAR FAVORITOS
// =====================================

function carregarFavoritos(){

    ["filme","livro","jogo","musica"].forEach(tipo=>{

        const salvo = localStorage.getItem("top_" + tipo);

        if(!salvo) return;

        const item = JSON.parse(salvo);

        document.getElementById(
            "nome" + primeiraMaiuscula(tipo)
        ).textContent = item.nome;

        document.getElementById(
            "capa" + primeiraMaiuscula(tipo)
        ).src = item.capa;

    });

}

carregarFavoritos();
// =====================================
// PUBLICAÇÕES
// =====================================

const listaPosts = document.getElementById("listaPosts");
const semPost = document.getElementById("semPost");

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// =====================================
// ATUALIZAR CONTADOR
// =====================================

function atualizarContador(){

    contadorPosts.textContent = posts.length;

}

// =====================================
// SALVAR POSTS
// =====================================

function salvarPosts(){

    localStorage.setItem(

        "posts",

        JSON.stringify(posts)

    );

}

// =====================================
// MOSTRAR POSTS
// =====================================

function carregarPosts(){

    listaPosts.innerHTML = "";

    if(posts.length === 0){

        semPost.style.display = "block";

        atualizarContador();

        return;

    }

    semPost.style.display = "none";

    posts.forEach((post,index)=>{

        const card = document.createElement("div");

        card.className = "post";

        if(post.tipo === "foto"){

            card.innerHTML = `

                <div class="post-topo">

                    <div class="usuario-post">

                        <div class="avatar">

                            ${nomeUsuario.textContent.charAt(0)}

                        </div>

                        <div>

                            <h4>${nomeUsuario.textContent}</h4>

                            <span>${arroba.textContent}</span>

                        </div>

                    </div>

                    <div class="menu">

                        <i
                        class="fa-solid fa-trash"
                        onclick="excluirPost(${index})"></i>

                    </div>

                </div>

                <img src="${post.imagem}">

                <div class="post-legenda">

                    <p>${post.legenda}</p>

                </div>

            `;

        }

        else{

            card.innerHTML = `

                <div class="post-topo">

                    <div class="usuario-post">

                        <div class="avatar">

                            ${nomeUsuario.textContent.charAt(0)}

                        </div>

                        <div>

                            <h4>${nomeUsuario.textContent}</h4>

                            <span>${arroba.textContent}</span>

                        </div>

                    </div>

                    <div class="menu">

                        <i
                        class="fa-solid fa-trash"
                        onclick="excluirPost(${index})"></i>

                    </div>

                </div>

                <div class="post-pensamento">

                    💭 ${post.texto}

                </div>

            `;

        }

        listaPosts.appendChild(card);

    });

    atualizarContador();

}

carregarPosts();

// =====================================
// EXCLUIR PUBLICAÇÃO
// =====================================

function excluirPost(indice){

    if(confirm("Deseja excluir esta publicação?")){

        posts.splice(indice,1);

        salvarPosts();

        carregarPosts();

    }

}
