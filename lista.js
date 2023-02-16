const frm = document.querySelector("form")      // obtém elementos da página
const dvQuadro = document.querySelector("#divQuadro")

frm.addEventListener("submit", (e) => {
  e.preventDefault()                            // evita envio do form

  const tarefa = frm.inTarefa.value             // obtém o conteúdo digitado

  const h5 = document.createElement("h5")       // cria o elemento HTML h5
  const texto = document.createTextNode(tarefa) // cria um texto
  h5.appendChild(texto)                         // define que texto será filho de h5
  dvQuadro.appendChild(h5)                      // e que h5 será filho de divQuadro

  frm.inTarefa.value = ""                       // limpa o campo de edição
  frm.inTarefa.focus()                          // joga o cursor neste campo
})

frm.btSelecionar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")  

  if (tarefas.length == 0) {
    alert("Não há tarefas para selecionar")       //indica que em caso de digitacao de campo vazio, exibe alerta de que nao existem tarefas-
    return                                        
  }

  let aux = -1                   

 
  for (let i = 0; i < tarefas.length; i++) { //selecao de tarefa
    
    if (tarefas[i].className == "tarefa-selecionada") { //tarefa selecionada
      tarefas[i].className = "tarefa-normal"      //tarefa listada, nao selecionada
      aux = i                                     
      break                        //fim da busca na lista re tarefas inseridas              
    }
  }

  
  if (aux == tarefas.length - 1) {
    aux = -1
  }

  tarefas[aux + 1].className = "tarefa-selecionada" //botao de selecionar tarefa
})

frm.btRetirar.addEventListener("click", () => {   //botao de gravar
  const tarefas = document.querySelectorAll("h5") 

  let aux = -1               

  
  tarefas.forEach((tarefa, i) => {
    if (tarefa.className == "tarefa-selecionada") {  //botao selecionar tarefa, muda a cor para verde quando selecionada
      aux = i
      console.log(i)                                   
    }
  })

  if (aux == -1) {             
    alert("Selecione uma tarefa para removê-la...")  //botao  retirar selecionada, exclui uma tarefa da lista
    return
  }

  if (confirm(`Confirma Exclusão de "${tarefas[aux].innerText}"?`)) {
    dvQuadro.removeChild(tarefas[aux])        
  }
})

frm.btGravar.addEventListener("click", () => { 
  const tarefas = document.querySelectorAll("h5")  

  if (tarefas.length == 0) {
    alert("Não há tarefas para serem salvas")      
    return                                         
  }

  let dados = ""                            
  tarefas.forEach(tarefa => { 
    dados += tarefa.innerText + ";"         
  })

  
  localStorage.setItem("tarefasDia", dados.slice(0, -1)) //local que aloca a informacao gravada

  
  if (localStorage.getItem("tarefasDia")) {
    alert("Ok! Tarefas Salvas")
  }
})

window.addEventListener("load", () => {  //carrega a tarefa guardada
  
  if (localStorage.getItem("tarefasDia")) { //local que aloca a informacao da tarefa gravada
    
    const dados = localStorage.getItem("tarefasDia").split(";")

    // percorre os dados armazenados em localStorage
    dados.forEach(dado => {
      const h5 = document.createElement("h5")      
      const texto = document.createTextNode(dado)  
      h5.appendChild(texto)                      
      dvQuadro.appendChild(h5)                   
    })
  }
})