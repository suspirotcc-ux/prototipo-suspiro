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
