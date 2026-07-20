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
// =====================================
// NOVA PUBLICAÇÃO
// =====================================

const btnNovoPost = document.getElementById("novoPost");

const modalPost = document.getElementById("modalPost");

const modalPensamento = document.getElementById("modalPensamento");

const btnFoto = document.getElementById("btnFoto");

const btnPensamento = document.getElementById("btnPensamento");

const fecharModal = document.getElementById("fecharModal");

const imagemPost = document.getElementById("imagemPost");

const legendaPost = document.getElementById("legendaPost");

const publicarFoto = document.getElementById("publicarFoto");

const publicarPensamento = document.getElementById("publicarPensamento");

const textoPensamento = document.getElementById("textoPensamento");

const listaPosts = document.getElementById("listaPosts");

const contadorPosts = document.getElementById("posts");

// =====================================
// LISTA DE POSTS
// =====================================

let posts = JSON.parse(localStorage.getItem("posts")) || [];

// =====================================
// ABRIR MENU
// =====================================

btnNovoPost.addEventListener("click",()=>{

    modalPost.classList.add("ativo");

});

// =====================================
// FECHAR MENU
// =====================================

fecharModal.addEventListener("click",()=>{

    modalPost.classList.remove("ativo");

});

// =====================================
// ESCOLHER FOTO
// =====================================

btnFoto.addEventListener("click",()=>{

    modalPost.classList.remove("ativo");

    document.querySelector(".sem-post").style.display="none";

    imagemPost.parentElement.parentElement.style.display="flex";

});

// =====================================
// ESCOLHER PENSAMENTO
// =====================================

btnPensamento.addEventListener("click",()=>{

    modalPost.classList.remove("ativo");

    modalPensamento.classList.add("ativo");

});

// =====================================
// FUNÇÃO DESENHAR POSTS
// =====================================

function renderizarPosts(){

    listaPosts.innerHTML="";

    contadorPosts.textContent=posts.length;

    posts.forEach((post,index)=>{

        const card=document.createElement("div");

        card.className="post";

        let conteudo="";

        if(post.tipo==="foto"){

            conteudo=`

                <img src="${post.imagem}">

                <p class="legenda">${post.legenda}</p>

            `;

        }else{

            conteudo=`

                <div class="pensamento">

                    ${post.texto}

                </div>

            `;

        }

        card.innerHTML=`

            <div class="post-topo">

                <div class="usuario-post">

                    <div class="foto-mini">

                        ${inicial.textContent}

                    </div>

                    <div>

                        <h4>${nomeUsuario.textContent}</h4>

                        <span>${arroba.textContent}</span>

                    </div>

                </div>

                <button class="btn-apagar" onclick="apagarPost(${index})">

                    Excluir

                </button>

            </div>

            ${conteudo}

        `;

        listaPosts.appendChild(card);

    });

}

renderizarPosts();

// =====================================
// PUBLICAR FOTO
// =====================================

publicarFoto.addEventListener("click",()=>{

    const arquivo=imagemPost.files[0];

    if(!arquivo){

        alert("Escolha uma imagem.");

        return;

    }

    const leitor=new FileReader();

    leitor.onload=function(e){

        posts.unshift({

            tipo:"foto",

            imagem:e.target.result,

            legenda:legendaPost.value

        });

        localStorage.setItem("posts",JSON.stringify(posts));

        renderizarPosts();

        imagemPost.value="";

        legendaPost.value="";

        imagemPost.parentElement.parentElement.style.display="none";

    }

    leitor.readAsDataURL(arquivo);

});

// =====================================
// PUBLICAR PENSAMENTO
// =====================================

publicarPensamento.addEventListener("click",()=>{

    if(textoPensamento.value.trim()==""){

        alert("Escreva alguma coisa.");

        return;

    }

    posts.unshift({

        tipo:"texto",

        texto:textoPensamento.value

    });

    localStorage.setItem("posts",JSON.stringify(posts));

    renderizarPosts();

    textoPensamento.value="";

    modalPensamento.classList.remove("ativo");

});
