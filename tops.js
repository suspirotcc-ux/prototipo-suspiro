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



document.getElementById("fecharTop").onclick=function(){

modalTop.style.display="none";

};



pesquisa.addEventListener("input",()=>{

mostrarLista(pesquisa.value);

});



function mostrarLista(texto){


resultados.innerHTML="";


let lista=[];


if(categoriaAtual=="filme") lista=filmes;
if(categoriaAtual=="livro") lista=livros;
if(categoriaAtual=="jogo") lista=jogos;
if(categoriaAtual=="musica") lista=musicas;



lista
.filter(item=>item.nome.toLowerCase().includes(texto.toLowerCase()))
.forEach(item=>{


let div=document.createElement("div");


div.className="resultado";


div.textContent=item.nome;


div.onclick=()=>{

selecionarTop(item);

};



resultados.appendChild(div);


});


}



function selecionarTop(item){


let categoria=categoriaAtual.charAt(0).toUpperCase()+categoriaAtual.slice(1);



document.getElementById("nome"+categoria).textContent=item.nome;


document.getElementById("capa"+categoria).src=item.capa;



localStorage.setItem(categoriaAtual,JSON.stringify(item));


modalTop.style.display="none";


}
