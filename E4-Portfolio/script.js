var coll = document.getElementsByClassName("tab");
var i;

for (i = 0; i < coll.length; i++) 
    {
    coll[i].addEventListener("click", function() 
    {
    this.classList.toggle("active");
    var conteudo = this.nextElementSibling;
    if (conteudo.style.maxHeight){
      conteudo.style.maxHeight = null;
    } else {
      conteudo.style.maxHeight = conteudo.scrollHeight + "px";
    } 
    });
}