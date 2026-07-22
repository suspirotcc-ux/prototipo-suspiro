/* ===================================================
   SUSPIRO - LÓGICA DO PERFIL (perfil.js)
   =================================================== */

document.addEventListener("DOMContentLoaded", () => {
    // ---- INICIALIZAÇÃO DE DADOS ----
    carregarPerfil();
    carregarFavoritos();
    carregarPosts();

    // ---- ELEMENTOS DOS MODAIS ----
    const modalEditar = document.getElementById("modalEditar");
    const modalPost = document.getElementById("modalPost");
    const modalFoto = document.getElementById("modalFoto");
    const modalPensamento = document.getElementById("modalPensamento");
    const modalTop = document.getElementById("modalTop");

    // ---- 1. EDITAR PERFIL ----
    const btnEditarPerfil = document.getElementById("editarPerfil");
    const btnFecharEditar = document.getElementById("fecharEditar");
    const btnSalvarPerfil = document.getElementById("salvar");

    btnEditarPerfil.addEventListener("click", () => {
        document.getElementById("novoNome").value = document.getElementById("nomeUsuario").innerText;
        document.getElementById("novoUsuario").value = document.getElementById("arroba").innerText;
        document.getElementById("novaBio").value = document.getElementById("bio").innerText;
        modalEditar.style.display = "flex";
    });

    btnFecharEditar.addEventListener("click", () => {
        modalEditar.style.display = "none";
    });

    btnSalvarPerfil.addEventListener("click", () => {
        const nome = document.getElementById("novoNome").value;
        const usuario = document.getElementById("novoUsuario").value;
        const bio = document.getElementById("novaBio").value;

        if (nome) document.getElementById("nomeUsuario").innerText = nome;
        if (usuario) document.getElementById("arroba").innerText = usuario.startsWith("@") ? usuario : `@${usuario}`;
        if (bio) document.getElementById("bio").innerText = bio;
        if (nome) document.getElementById("inicial").innerText = nome.charAt(0).toUpperCase();

        // Salvar no localStorage
        localStorage.setItem("suspiro_perfil", JSON.stringify({ nome, usuario, bio }));

        modalEditar.style.display = "none";
    });

    function carregarPerfil() {
        const dados = JSON.parse(localStorage.getItem("suspiro_perfil"));
        if (dados) {
            if (dados.nome) {
                document.getElementById("nomeUsuario").innerText = dados.nome;
                document.getElementById("inicial").innerText = dados.nome.charAt(0).toUpperCase();
            }
            if (dados.usuario) document.getElementById("arroba").innerText = dados.usuario;
            if (dados.bio) document.getElementById("bio").innerText = dados.bio;
        }
    }

    // ---- 2. NOVA PUBLICAÇÃO (POSTS) ----
    const btnNovoPost = document.getElementById("novoPost");
    const btnFecharModalPost = document.getElementById("fecharModal");
    const btnAbrirFoto = document.getElementById("btnFoto");
    const btnAbrirPensamento = document.getElementById("btnPensamento");

    const btnFecharFoto = document.getElementById("fecharFoto");
    const btnFecharPensamento = document.getElementById("fecharPensamento");

    const btnPublicarFoto = document.getElementById("publicarFoto");
    const btnPublicarPensamento = document.getElementById("publicarPensamento");

    // Preview de imagem
    const inputImagemPost = document.getElementById("imagemPost");
    const previewImagem = document.getElementById("previewImagem");
    let imagemBase64 = "";

    btnNovoPost.addEventListener("click", () => modalPost.style.display = "flex");
    btnFecharModalPost.addEventListener("click", () => modalPost.style.display = "none");

    btnAbrirFoto.addEventListener("click", () => {
        modalPost.style.display = "none";
        modalFoto.style.display = "flex";
    });

    btnAbrirPensamento.addEventListener("click", () => {
        modalPost.style.display = "none";
        modalPensamento.style.display = "flex";
    });

    btnFecharFoto.addEventListener("click", () => modalFoto.style.display = "none");
    btnFecharPensamento.addEventListener("click", () => modalPensamento.style.display = "none");

    // Converter imagem selecionada para Base64
    inputImagemPost.addEventListener("change", (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                imagemBase64 = event.target.result;
                previewImagem.src = imagemBase64;
                previewImagem.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Publicar Pensamento
    btnPublicarPensamento.addEventListener("click", () => {
        const texto = document.getElementById("textoPensamento").value;
        if (!texto.trim()) return alert("Escreva algo para publicar!");

        salvarPost({ tipo: "pensamento", conteudo: texto, data: new Date().toLocaleDateString() });
        document.getElementById("textoPensamento").value = "";
        modalPensamento.style.display = "none";
    });

    // Publicar Foto
    btnPublicarFoto.addEventListener("click", () => {
        const legenda = document.getElementById("legendaPost").value;
        if (!imagemBase64) return alert("Selecione uma imagem!");

        salvarPost({ tipo: "foto", imagem: imagemBase64, conteudo: legenda, data: new Date().toLocaleDateString() });
        document.getElementById("legendaPost").value = "";
        previewImagem.src = "";
        imagemBase64 = "";
        modalFoto.style.display = "none";
    });

    function salvarPost(post) {
        let posts = JSON.parse(localStorage.getItem("suspiro_posts")) || [];
        posts.unshift(post);
        localStorage.setItem("suspiro_posts", JSON.stringify(posts));
        carregarPosts();
    }

    function carregarPosts() {
        const posts = JSON.parse(localStorage.getItem("suspiro_posts")) || [];
        const listaPosts = document.getElementById("listaPosts");
        const semPost = document.getElementById("semPost");
        const contadorPosts = document.getElementById("posts");

        contadorPosts.innerText = posts.length;

        if (posts.length === 0) {
            semPost.style.display = "flex";
            listaPosts.innerHTML = "";
            return;
        }

        semPost.style.display = "none";
        listaPosts.innerHTML = posts.map((post, index) => `
            <div class="card-post" style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 12px; margin-bottom: 15px; position: relative;">
                <button onclick="deletarPost(${index})" style="position: absolute; right: 15px; top: 15px; background: none; border: none; color: #ff5555; cursor: pointer;">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <small style="opacity: 0.6;">${post.data}</small>
                ${post.imagem ? `<img src="${post.imagem}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px; margin: 10px 0;">` : ''}
                <p style="margin-top: 8px;">${post.conteudo}</p>
            </div>
        `).join('');
    }

    window.deletarPost = function(index) {
        let posts = JSON.parse(localStorage.getItem("suspiro_posts")) || [];
        posts.splice(index, 1);
        localStorage.setItem("suspiro_posts", JSON.stringify(posts));
        carregarPosts();
    };

    // ---- 3. FAVORITOS / TOPS ----
    let categoriaAtual = "";
    const btnFecharTop = document.getElementById("fecharTop");
    btnFecharTop.addEventListener("click", () => modalTop.style.display = "none");

    window.abrirModal = function(categoria) {
        categoriaAtual = categoria;
        document.getElementById("tituloModal").innerText = `Escolher ${categoria.toUpperCase()}`;
        document.getElementById("pesquisaTop").value = "";
        
        // Exemplo simples de input de imagem / nome para teste direto
        const lista = document.getElementById("listaResultados");
        lista.innerHTML = `
            <div style="display:flex; flex-direction:column; gap:10px; margin-top:15px;">
                <input type="text" id="nomeItem" placeholder="Nome do(a) ${categoria}">
                <input type="text" id="urlCapa" placeholder="URL da imagem da capa">
                <button id="btnSalvarFav" class="btn-publicar">Salvar Favorito</button>
            </div>
        `;

        document.getElementById("btnSalvarFav").addEventListener("click", () => {
            const nome = document.getElementById("nomeItem").value;
            const capa = document.getElementById("urlCapa").value;

            if (nome) {
                salvarFavorito(categoriaAtual, nome, capa);
                modalTop.style.display = "none";
            }
        });

        modalTop.style.display = "flex";
    };

    function salvarFavorito(cat, nome, capa) {
        let favs = JSON.parse(localStorage.getItem("suspiro_favoritos")) || {};
        favs[cat] = { nome, capa: capa || 'https://via.placeholder.com/150' };
        localStorage.setItem("suspiro_favoritos", JSON.stringify(favs));
        carregarFavoritos();
    }

    function carregarFavoritos() {
        const favs = JSON.parse(localStorage.getItem("suspiro_favoritos")) || {};
        const placeholders = {
            filme: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=300',
            livro: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300',
            jogo: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=300',
            musica: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'
        };

        ['filme', 'livro', 'jogo', 'musica'].forEach(cat => {
            const capEl = document.getElementById(`capa${cat.charAt(0).toUpperCase() + cat.slice(1)}`);
            const nomEl = document.getElementById(`nome${cat.charAt(0).toUpperCase() + cat.slice(1)}`);

            if (favs[cat]) {
                if (capEl) capEl.src = favs[cat].capa || placeholders[cat];
                if (nomEl) nomEl.innerText = favs[cat].nome;
            } else {
                if (capEl) capEl.src = placeholders[cat];
            }
        });
    }

    // Fechar modais ao clicar fora da caixa
    window.addEventListener("click", (e) => {
        if (e.target.classList.contains("modal-post")) {
            e.target.style.display = "none";
        }
    });
});
