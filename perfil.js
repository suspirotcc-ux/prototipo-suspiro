// ========================================
// CARREGAR DADOS DO USUÁRIO
// ========================================

const nome = localStorage.getItem("nome") || "Usuário";
const usuario = localStorage.getItem("usuario") || "@usuario";

document.getElementById("nomeUsuario").textContent = nome;
document.getElementById("arroba").textContent = usuario;
document.getElementById("inicial").textContent = nome.charAt(0).toUpperCase();


// ========================================
// ELEMENTOS
// ========================================

const btnNovoPost = document.getElementById("novoPost");

const modalPost = document.getElementById("modalPost");
const modalFoto = document.getElementById("modalFoto");
const modalPensamento = document.getElementById("modalPensamento");

const btnFoto = document.getElementById("btnFoto");
const btnPensamento = document.getElementById("btnPensamento");
const fecharModal = document.getElementById("fecharModal");

const publicarFoto = document.getElementById("publicarFoto");
const publicarPensamento = document.getElementById("publicarPensamento");

const listaPosts = document.getElementById("listaPosts");
const semPost = document.getElementById("semPost");

const contadorPosts = document.getElementById("posts");


// ========================================
// ABRIR MODAIS
// ========================================

btnNovoPost.onclick = () => {

    modalPost.classList.add("ativo");

}

fecharModal.onclick = () => {

    modalPost.classList.remove("ativo");

}

btnFoto.onclick = () => {

    modalPost.classList.remove("ativo");

    modalFoto.classList.add("ativo");

}

btnPensamento.onclick = () => {

    modalPost.classList.remove("ativo");

    modalPensamento.classList.add("ativo");

}


// ========================================
// FECHAR AO CLICAR FORA
// ========================================

window.onclick = function(e){

    if(e.target == modalPost){

        modalPost.classList.remove("ativo");

    }

    if(e.target == modalFoto){

        modalFoto.classList.remove("ativo");

    }

    if(e.target == modalPensamento){

        modalPensamento.classList.remove("ativo");

    }

}


// ========================================
// CONTADOR
// ========================================

function atualizarQuantidade(){

    contadorPosts.innerHTML = listaPosts.children.length;

    if(listaPosts.children.length > 0){

        semPost.style.display = "none";

    }else{

        semPost.style.display = "block";

    }

}


// ========================================
// CRIAR POST
// ========================================

function criarPost(texto, imagem = ""){

    const div = document.createElement("div");

    div.className = "post";

    div.innerHTML = `

    <div class="post-topo">

        <div class="post-usuario">

            <div class="post-avatar">

                ${nome.charAt(0).toUpperCase()}

            </div>

            <div>

                <div class="post-nome">${nome}</div>

                <div class="post-arroba">${usuario}</div>

            </div>

        </div>

        <div class="menu-post">⋮</div>

    </div>

    ${imagem}

    <div class="post-texto">

        ${texto}

    </div>

    <div class="acoes-post">

        ❤️ 0 Curtidas

        💬 0 Comentários

    </div>

    <button class="excluir-post">

        Excluir publicação

    </button>

    `;

    div.querySelector(".excluir-post").onclick = function(){

        if(confirm("Deseja realmente apagar esta publicação?")){

            div.remove();

            atualizarQuantidade();

        }

    }

    listaPosts.prepend(div);

    atualizarQuantidade();

}


// ========================================
// PUBLICAR FOTO
// ========================================

publicarFoto.onclick = function(){

    const arquivo = document.getElementById("imagemPost").files[0];

    const legenda = document.getElementById("legendaPost").value;

    if(!arquivo){

        alert("Escolha uma imagem.");

        return;

    }

    const leitor = new FileReader();

    leitor.onload = function(e){

        criarPost(

            legenda,

            `<img src="${e.target.result}">`

        );

    }

    leitor.readAsDataURL(arquivo);

    modalFoto.classList.remove("ativo");

    document.getElementById("imagemPost").value = "";

    document.getElementById("legendaPost").value = "";

}


// ========================================
// PUBLICAR PENSAMENTO
// ========================================

publicarPensamento.onclick = function(){

    const texto = document.getElementById("textoPensamento").value;

    if(texto == ""){

        alert("Escreva alguma coisa.");

        return;

    }

    criarPost(texto);

    modalPensamento.classList.remove("ativo");

    document.getElementById("textoPensamento").value = "";

}


// ========================================
// EDITAR PERFIL
// ========================================

const modalEditar = document.getElementById("modal");

const editarPerfil = document.getElementById("editarPerfil");

const cancelar = document.getElementById("cancelar");

const salvar = document.getElementById("salvar");

editarPerfil.onclick = () => {

    modalEditar.style.display = "flex";

}

cancelar.onclick = () => {

    modalEditar.style.display = "none";

}

salvar.onclick = () => {

    const novoNome = document.getElementById("novoNome").value;
    const novoUsuario = document.getElementById("novoUsuario").value;
    const novaBio = document.getElementById("novaBio").value;

    if(novoNome != ""){

        document.getElementById("nomeUsuario").innerHTML = novoNome;

        localStorage.setItem("nome", novoNome);

    }

    if(novoUsuario != ""){

        document.getElementById("arroba").innerHTML = novoUsuario;

        localStorage.setItem("usuario", novoUsuario);

    }

    if(novaBio != ""){

        document.getElementById("bio").innerHTML = novaBio;

    }

    modalEditar.style.display = "none";

}
