let categoriaAtual = "";

const modalTop = document.getElementById("modalTop");
const pesquisa = document.getElementById("pesquisaTop");
const resultados = document.getElementById("listaResultados");
const fecharTop = document.getElementById("fecharTop");


// ABRIR MODAL
function abrirModal(tipo) {

    categoriaAtual = tipo;

    modalTop.style.display = "flex";

    pesquisa.value = "";

    mostrarLista("");

}


// FECHAR MODAL
fecharTop.onclick = function(){

    modalTop.style.display = "none";

};


// PESQUISA
pesquisa.addEventListener("input", function(){

    mostrarLista(pesquisa.value);

});



// MOSTRAR OPÇÕES
function mostrarLista(texto){

    resultados.innerHTML = "";


    let lista = [];


    if(categoriaAtual === "filme"){
        lista = filmes;
    }

    if(categoriaAtual === "livro"){
        lista = livros;
    }

    if(categoriaAtual === "jogo"){
        lista = jogos;
    }

    if(categoriaAtual === "musica"){
        lista = musicas;
    }



    lista
    .filter(item =>
        item.nome
        .toLowerCase()
        .includes(texto.toLowerCase())
    )
    .forEach(item => {


        const opcao = document.createElement("div");


        opcao.classList.add("resultado");


        opcao.innerHTML = item.nome;



        opcao.onclick = function(){

            selecionarTop(item);

        };



        resultados.appendChild(opcao);


    });


}



// SELECIONAR FAVORITO
function selecionarTop(item){


    const categoria = primeiraMaiuscula(categoriaAtual);


    const nome = document.getElementById(
        "nome" + categoria
    );


    const capa = document.getElementById(
        "capa" + categoria
    );



    if(nome && capa){


        nome.innerHTML = item.nome;


        capa.src = item.capa;


        capa.onerror = function(){

            capa.src = "assets/capas/placeholder.png";

        };


    }



    localStorage.setItem(
        categoriaAtual,
        JSON.stringify(item)
    );



    modalTop.style.display = "none";


}



// PRIMEIRA LETRA MAIÚSCULA
function primeiraMaiuscula(texto){

    return texto.charAt(0).toUpperCase() + texto.slice(1);

}



// CARREGAR FAVORITOS SALVOS
window.addEventListener("load", function(){


    const categorias = [
        "filme",
        "livro",
        "jogo",
        "musica"
    ];



    categorias.forEach(tipo=>{


        const salvo = localStorage.getItem(tipo);



        if(salvo){


            const item = JSON.parse(salvo);


            const categoria = primeiraMaiuscula(tipo);



            const nome = document.getElementById(
                "nome" + categoria
            );


            const capa = document.getElementById(
                "capa" + categoria
            );



            if(nome && capa){


                nome.innerHTML = item.nome;


                capa.src = item.capa;


            }


        }


    });


});
