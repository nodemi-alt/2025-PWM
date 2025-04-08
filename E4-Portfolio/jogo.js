function novaSenha()
{
    let senha = new Set();
    while (senha.size<5) { senha.add(Math.floor(Math.random() * 10)); }
    console.log('Teste senha:', senha);
    return Array.from(senha);
}

function atualizarHistorico(entrada, ehits, evaca)
{
    historico.unshift({tentativa:entrada, hits: ehits, vaca: evaca });
    let keke = document.getElementById("historico").getElementsByTagName("tbody")[0];
    keke.innerHTML = historico.map((entry, index) => `
            <tr>
                <td>${historico.length - index}</td> 
                <td>${entry.tentativa}</td>
                <td>
                    ${'<img src="../E4-Portfolio/teste.jpg" class="cow-icon">'.repeat(entry.vaca)}
                    ${'<img src="../E4-Portfolio/vacad.gif" class="cow-icon">'.repeat(entry.hits)}
                </td>
            </tr>
        `).join('');
}


function calcularAcertos(entrada)
{
    let hits = 0; let vaca = 0; // 
    entrada.forEach((num, i)=>
    { 
        if(num === senha[i]) hits++; 
        else if (senha.includes(num)) vaca++; //num certo pos errada
    });
    return {hits, vaca};
}

function lerEntrada()
{
    let entrada = document.getElementById("campoTentativa").value; 
    if(!/^[0-9]{5}$/.test(entrada)) { alert("A entrada deve ser 5 digitos numericos!"); return; }
    tentativas++;


    document.getElementById("campoTentativa").value = "";
    console.log('Teste tentativa:', entrada); //
    
    entrada=entrada.split('').map(Number);

    let resultado = calcularAcertos(entrada);
    console.log('Teste resultado:', resultado); //
    console.log('Teste vaca:', resultado.vaca); //

    let keke = 16-tentativas;
    atualizarHistorico(entrada, resultado.hits, resultado.vaca);
    document.getElementById("estado").innerHTML="<br/>Você tem " + keke + "tentativas sobrando";

    if (resultado.hits === 5)
    {
        document.getElementById("botaoTentativa").disabled=true;
        document.getElementById("estado").innerHTML="acertou!!";
        return;
    }
    if (tentativas === 16)
    {
        document.getElementById("botaoTentativa").disabled=true;
        document.getElementById("estado").innerHTML="passou do limite!!";
        return;
    }
}

function reiniciarJogo()
{
    document.getElementById("botaoTentativa").disabled=false;
    senha = novaSenha();
    let newhistorico = [];
    historico = newhistorico;

    //let keke = document.getElementById("historico");
    //let caption = keke.createCaption();
    //caption.textContent = "16 tentativas sobrando";
    //historico.unshift({tentativa:"", hits: 0, vaca: 0});
    //historico.shift(); idr why these are here

    document.getElementById("estado").innerHTML="Jogo reiniciado!<br/>Você tem 16 tentativas sobrando";
    tentativas = 0;
} 

let senha = novaSenha();
let tentativas = 0;
let historico = [];
document.getElementById("estado").innerHTML="<br/> Você tem 16 tentativas sobrando";


botaoTentativa.addEventListener("click", lerEntrada);
botaoReiniciar.addEventListener("click", reiniciarJogo);