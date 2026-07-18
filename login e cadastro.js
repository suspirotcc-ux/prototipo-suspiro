// ===============================
// ELEMENTOS
// ===============================

const loginTab = document.querySelectorAll(".tab-btn")[0];
const registerTab = document.querySelectorAll(".tab-btn")[1];

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const preview = document.getElementById("previewImg");
const foto = document.getElementById("foto");

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

foto.addEventListener("change",function(){

    const arquivo = this.files[0];

    if(!arquivo) return;

    const reader = new FileReader();

    reader.onload=function(e){

        preview.src=e.target.result;

        preview.style.display="block";

    }

    reader.readAsDataURL(arquivo);

});

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

    alert("Login realizado com sucesso! (Modo demonstração)");

});

// ===============================
// CADASTRO
// ===============================

registerForm.addEventListener("submit",function(e){

    e.preventDefault();

    const usuario=document.getElementById("username").value.trim();

    const email=document.getElementById("email").value.trim();

    const senha=document.getElementById("senha").value.trim();

    const bio=document.getElementById("bio").value.trim();

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

    registerForm.reset();

    preview.style.display="none";

});

// ===============================
// ANIMAÇÃO DOS INPUTS
// ===============================

const inputs=document.querySelectorAll("input, textarea");

inputs.forEach(input=>{

    input.addEventListener("focus",()=>{

        input.parentElement.style.transform="scale(1.02)";

    });

    input.addEventListener("blur",()=>{

        input.parentElement.style.transform="scale(1)";

    });

});

// ===============================
// ENTRAR COM ENTER
// ===============================

document.addEventListener("keypress",(e)=>{

    if(e.key==="Enter"){

        const ativo=document.querySelector(".form.active");

        if(ativo){

            ativo.requestSubmit();

        }

    }

});
