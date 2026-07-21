let categoriaAtual="";

const modalTop=document.getElementById("modalTop");

const pesquisa=document.getElementById("pesquisaTop");

const resultados=document.getElementById("listaResultados");

function abrirModal(tipo){

    categoriaAtual=tipo;

    modalTop.style.display="flex";

    pesquisa.value="";

    mostrarLista("");

}

document.getElementById("fecharTop").onclick=()=>{

    modalTop.style.display="none";

}

pesquisa.onkeyup=()=>{

    mostrarLista(pesquisa.value);

}

function mostrarLista(texto){

    resultados.innerHTML = "";

    let lista = [];

    if(categoriaAtual === "filme") lista = filmes;
    if(categoriaAtual === "livro") lista = livros;
    if(categoriaAtual === "jogo") lista = jogos;
    if(categoriaAtual === "musica") lista = musicas;

    lista
    .filter(item => item.nome.toLowerCase().includes(texto.toLowerCase()))
    .forEach(item => {

        const div = document.createElement("div");

        div.className = "resultado";

        div.innerHTML = item.nome;

        div.onclick = function(){

            selecionarTop(item);

        };

        function selecionarTop(item){

    const nome = document.getElementById("nome" + primeiraMaiuscula(categoriaAtual));
    const capa = document.getElementById("capa" + primeiraMaiuscula(categoriaAtual));

    nome.textContent = item.nome;

    capa.src = item.capa;

    localStorage.setItem(categoriaAtual, JSON.stringify(item));

    modalTop.style.display = "none";

}

        resultados.appendChild(div);

    });

    function primeiraMaiuscula(texto){

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}

    ["filme","livro","jogo","musica"].forEach(tipo=>{

    const salvo = localStorage.getItem(tipo);

    if(salvo){

        const item = JSON.parse(salvo);

        document.getElementById("nome" + primeiraMaiuscula(tipo)).textContent = item.nome;

        document.getElementById("capa" + primeiraMaiuscula(tipo)).src = item.capa;

    }

});

}
