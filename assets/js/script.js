//Var de controle de interfaces.
let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let descricao = document.querySelector('.d1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d1-right');
let numeros = document.querySelector('.d1-3');

//Var de controle de votos.
let etapaAtual = 0;
let numeroPreenchido = '';
let votoBranco = false;
let pegaVotos = [];

//Limpa a tela, pega as informações da etapa atual e preenche o que for necessário.
function comecarEtapa(){
    let etapa = etapas[etapaAtual];
    let numerosHtml = '';
    numeroPreenchido = '';
    votoBranco = false;

    for(let i = 0; i < etapa.numeros; i++){
        if(i === 0 ){
            numerosHtml += '<div class="numero pisca"></div>'
        } else {
            numerosHtml += '<div class="numero"></div>';
        }
    }
    
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numerosHtml;
}

//Atualizar Interface
function atualizaInterface(){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numeroPreenchido){
            return true;
        } else {
            return false;
        }
    });

    if(candidato.length > 0){
       candidato = candidato[0]; 
       seuVotoPara.style.display = 'block';
       aviso.style.display = 'block';
       descricao.innerHTML = `Nome: ${candidato.nome} </br> Partido: ${candidato.partido}`;
        
       let fotosHtml = '';
       for(let i in candidato.fotos){
           fotosHtml += `<div class="d1-img"><img src="assets/img/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`;
       }

       lateral.innerHTML = fotosHtml;
    } else {
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="grande-aviso pisca">Voto Nulo</div>';

    }
}

//Executar as funcionalidades do clique para que os números apareçam na tela.
function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numeroPreenchido = `${numeroPreenchido}${n}`; 

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca') 
        } else {
            atualizaInterface();
        }
    }
}

//Voto em branco
function branco(){
    if(numeroPreenchido == ''){
        lateral.innerHTML = '';
        votoBranco = true;
        seuVotoPara.style.display = 'block';
        aviso.style.display = 'block';
        descricao.innerHTML = '<div class="grande-aviso pisca">Voto em branco</div>';
        numeros.innerHTML = '';
    } else {
        alert('Para votar em branco não pode ter digitado nenhum número. Clique no botão CORRIGE, e refaça o processo.')
    }
}

//Corrigir, recomeça o voto.
function corrige(){
    comecarEtapa();
}

//Confirmar, verifica se todas etapas feitas pelo usuário foram concluídas corretamente.
function confirma(){
    let etapa = etapas[etapaAtual];
    let votoConfirmado = false;
    
    if(votoBranco === true){
        votoConfirmado = true
        pegaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'Branco'
        });
    } else if (numeroPreenchido.length === etapa.numeros){
        votoConfirmado = true;
        pegaVotos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numeroPreenchido
        });
    }

    if(votoConfirmado){
        etapaAtual++;

        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else {
            document.querySelector('.tela').innerHTML = '<div class="grande-aviso pisca fim">FIM</div>';
            console.log(pegaVotos);
        }
    }    
}
comecarEtapa();
