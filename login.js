// ===============================
// ELEMENTOS
// ===============================

const loginTab = document.querySelectorAll(".tab-btn")[0];
const registerTab = document.querySelectorAll(".tab-btn")[1];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const mensagem = document.getElementById("mensagemCadastro");

// ===============================
// TROCAR ENTRE LOGIN E CADASTRO
// ===============================

function switchTab(tab){

    if(tab === "login"){

        loginTab.classList.add("active");
        registerTab.classList.remove("active");

        loginForm.classList.add("active");
        registerForm.classList.remove("active");

    }

    else{

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        registerForm.classList.add("active");
        loginForm.classList.remove("active");

    }

}

// ===============================
// FOTO DE PERFIL
// ===============================


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit",function(e){

    e.preventDefault();

    const email=document.getElementById("loginEmail").value;
    const senha=document.getElementById("loginSenha").value;

    if(email==="" || senha===""){

        alert("Preencha todos os campos.");

        return;

    }

   setTimeout(()=>{

    window.location.href="perfil.html";

},500);
    
});

// ===============================
// CADASTRO
// ===============================

registerForm.addEventListener("submit",function(e){

    e.preventDefault();

    const usuario=document.getElementById("username").value.trim();

    const email=document.getElementById("email").value.trim();

    const senha=document.getElementById("senha").value.trim();

    if(usuario==="" || email==="" || senha===""){

        mensagem.style.color="#ff7373";

        mensagem.innerHTML="Preencha todos os campos obrigatórios.";

        return;

    }

    if(senha.length<6){

        mensagem.style.color="#ff7373";

        mensagem.innerHTML="A senha deve possuir pelo menos 6 caracteres.";

        return;

    }

   mensagem.style.color="#7dff9d";

mensagem.innerHTML="Conta criada com sucesso! 💜";

// salva os dados

localStorage.setItem("nome", usuario);

localStorage.setItem("usuario","@" + usuario);

localStorage.setItem("email", email);

// espera 1 segundo

setTimeout(()=>{

    window.location.href="perfil.html";

},1000);
