function novaSenha()
{
    let senha = new Set();
    while (senha.size<5) { senha.add(Math.floor(Math.random() * 10)); }
    console.log('Senha gerada:', senha);
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
                    ${'<img src="../E4-Portfolio/vaca.png" class="vaca-icone">'.repeat(entry.vaca)}
                    ${'<img src="../E4-Portfolio/vacatransparente.gif" class="vaca-icone">'.repeat(entry.hits)}
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
    
    entrada=entrada.split('').map(Number);

    let resultado = calcularAcertos(entrada);

    let keke = 16-tentativas;
    atualizarHistorico(entrada.join(''), resultado.hits, resultado.vaca);
    
    if ( tentativas < 3) { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>(ᵔ◡ᵔ✿)"; }
    else if ( tentativas < 6) { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>(ᵔ◡ᵔ*)"; }
    else if ( tentativas < 9) { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>(＾＾＃)"; }
    else if ( tentativas < 12) { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>(・_・;)"; }
    else if ( tentativas < 15) { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>(°△°|||)"; }
    else { document.getElementById("estado").innerHTML="<br/><br/>Você tem " + keke + " tentativas sobrando<br/><br/><br/>＼(° □ ° l|l)/"; }

    if (resultado.hits === 5)
    {
        document.getElementById("botaoTentativa").disabled=true;
        document.getElementById("estado").innerHTML="<br/><br/>Voce ganhou!!!<br/><br/><br/>⸜(￣▽￣)👍 - orgulhoso de vc";
        return;
    }
    if (tentativas === 16)
    {
        document.getElementById("botaoTentativa").disabled=true;
        document.getElementById("estado").innerHTML="<br/><br/>Voce perdeu!!!<br/>A senha era: " + senha.join('') + "<br/><br/> 	(￣ヘ￣) - vc me desaponta";
        return;
    }
}

function reiniciarJogo()
{
    document.getElementById("estado").innerHTML="<br/>Jogo reiniciado!<br/>Senha anterior: " + senha.join('') +"<br/><br/>Você tem 16 tentativas sobrando<br/><br/><br/>(^ᴗ^✿)";

    document.getElementById("botaoTentativa").disabled=false;
    senha = novaSenha();
    let newhistorico = [];
    historico = newhistorico;
    tentativas = 0;
} 

function trapaca() { alert("Senha : " + senha.join('')); return; }

let senha = novaSenha();
let tentativas = 0;
let historico = [];
document.getElementById("estado").innerHTML="<br/><br/>Você tem 16 tentativas sobrando<br/><br/><br/>ヾ(￣▽￣). - ola!! digita la embaixo ";


botaoTentativa.addEventListener("click", lerEntrada);
botaoReiniciar.addEventListener("click", reiniciarJogo);
botaoTrapaca.addEventListener("click", trapaca);