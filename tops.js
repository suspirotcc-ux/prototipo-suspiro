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

    resultados.innerHTML="";

    let lista=[];

    if(categoriaAtual==="filme") lista=filmes;

    if(categoriaAtual==="livro") lista=livros;

    if(categoriaAtual==="jogo") lista=jogos;

    if(categoriaAtual==="musica") lista=musicas;

    lista

    .filter(item=>item.nome.toLowerCase().includes(texto.toLowerCase()))

    .forEach(item=>{

        resultados.innerHTML+=`

        <div class="resultado">

            ${item.nome}

        </div>

        `;

    });

}
