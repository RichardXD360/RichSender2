const btnEnviar = document.querySelector(".btnEnviar"); //Botão para enviar a mensagem
const contactName = document.querySelector(".status-contact"); //Status do User (Status da conexão com a API)
const contactStatus = document.querySelector(".status-circle") //Circulo demonstrativo com o status da API
const chatControl = document.querySelector(".chat"); //Main do bate papo
let chatAtivo = true; //Validação se a API está conectada com o Front

function VerificarStatus(){
    const input = document.querySelector('.input-text');
    fetch("http://127.0.0.1:3000/api", {
        method: "GET",
    })
    .then(res => {
        if(res.ok){
            contactName.innerHTML = `Status: Online`;
            contactStatus.style.backgroundColor = "#00ffff";
            input.placeholder = "Digite sua mensagem aqui..";
            input.readOnly = false;
        }else{
            contactName.innerHTML = `Status: Offline`
            contactStatus.style.backgroundColor = "red";  
            input.readOnly = false;         
        }
    }).catch(error => {
        contactName.innerHTML = "Status: Offline";
        contactStatus.style.backgroundColor = "red";  
        input.readOnly = false;
        console.log(error);
    });
}
//Validação se o Front está conectado com a API
setInterval(VerificarStatus, 1500);
//Validação se a API não estiver conectada com o Front não será possível enviar mensagens
if(chatAtivo === false){
    var input = document.querySelector('.input-text');
    input.readOnly = true;
}
btnEnviar.addEventListener('click', ()=> {
    const inputText = document.querySelector(".input-text");
    const inputTextValue = inputText.value;
        if (inputTextValue !== "" && inputTextValue !== null){
            CriarMensagemIA(inputTextValue);
        }
});
const inputText = document.querySelector(".input-text");
inputText.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        console.log('foi');
        const inputTextValue = inputText.value;
        if (inputTextValue !== "" && inputTextValue !== null){
            CriarMensagemIA(inputTextValue);
        }
    }
});

const leftResponder = '10';
const leftUser = '190';
const colorUser = '#00b3e4';
const colorResponder = "#00ffff";
const colorText = "#001c2c";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
    }
    
function CriarMensagem(text, who) {
    const showMessage = document.createElement('div');
    if(who === 0){
        showMessage.innerHTML = `<div style="text-align: start; animation-name: in-message; animation-duration: 0.2s; position: relative;color: ${colorText};border: 1px solid black; border-radius: 15% 15px 15% 15px;top: -0;padding: 6px; left: ${leftUser}px;background-color: ${colorUser}; max-width: 180px;">${text}</div>`;
    }
    else{
        showMessage.innerHTML = `<div style="text-align: start; animation-name: in-message; animation-duration: 0.2s; position: relative;color: ${colorText};border: 1px solid black; border-radius: 15% 15px 15% 15px;top: -0;padding: 6px; left: ${leftResponder}px;background-color: ${colorResponder}; max-width: 180px;">${text}</div>`;
    }
    showMessage.classList = "message-content";
    chatControl.appendChild(showMessage);
    document.querySelector(".input-text").value = "";
};
function CriarMensagemIA(text){
    const showMessage = document.createElement('div');
    showMessage.innerHTML = `<div style="text-align: start; animation-name: in-message; animation-duration: 0.2s; position: relative;color: ${colorText};border: 1px solid black; border-radius: 15% 15px 15% 15px;top: -0;padding: 6px; left: ${leftUser}px;background-color: ${colorUser}; max-width: 180px;">${text}</div>`;
    showMessage.classList = "message-content";
    chatControl.appendChild(showMessage);
    document.querySelector(".input-text").value = "";
    axios.post('https://e757-170-81-201-169.ngrok-free.app/ia', {
        text: text
    }).then(res => {
        CriarMensagem(res.data, 1);
    }).catch(error => {
        CriarMensagem("Infelizmente o Backend da aplicação está fora, tente novamente mais tarde. Agradecemos a compreensão");
        console.error("ocorreu algum erro durante a integração: "+error);
    })
}
setTimeout(() => {
    CriarMensagem("Olá, eu sou o ChatBot criado pelo Richard! Fui criado com a AI da META LLhamaAI 3.1!");
}, 1000);