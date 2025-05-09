const URL_API = "https://x8ki-letl-twmt.n7.xano.io/api:tbL8W82e/project"

function alteraClasse(classe) {
    document.getElementById("cards").setAttribute("class", classe)
}

function selecionaNaTelaPequena(){
    selecionado = document.getElementById("menu-cabecalho-tela-pequena").value;

    switch (selecionado) {
        case "l": alteraClasse("lista"); break;
        case "gg": alteraClasse("grade-grande"); break;
        case "gp": alteraClasse("grade-pequena");break;
    }
}

function loading(status){
    var gif = document.getElementById("loading")
    var overlay = document.getElementById("overlay")
    if(status){
        gif.classList.add("on")
        overlay.classList.add("on")
    }else{
        gif.classList.remove("on")
        overlay.classList.remove("on") 
    }
}

async function cadastrarNota(){
    try{
        loading(true) //Exibe o loading
        
        //Realiza a requisição para criar uma nota vazia
        const request = await fetch(URL_API, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: "", description: ""}) //Dados da requisição
        })
        
        const dados = await request.json() //Obtém o json da resposta da requisição

        loading(false) //Oculta o loading
        
        if(request.status == 200){ //Se a requisição retornou com sucesso, adiciona a nota na inteface
            addItemLista(dados.id, "", "")
        }else{  //Se não, dispara um erro
            throw dados
        }
    }catch(error){  //Captura os erros disparados
        console.error(error)
        alert(error.message)
    }
}

function addItemLista(id, titulo, descricao){
    var li = document.createElement("li")
    
    var input = document.createElement("input")
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", "Informe o título...")
    input.value = titulo
    li.appendChild(input)

    var textArea = document.createElement("textarea")
    textArea.setAttribute("placeholder", "Informe o texto...")
    textArea.value = descricao
    li.appendChild(textArea)

    var div = document.createElement("div")
    div.classList.add("btn-container")
    li.appendChild(div)
    
    var buttonAtualizar = document.createElement("button")
    buttonAtualizar.innerText = "Atualizar"
    div.appendChild(buttonAtualizar)

    buttonAtualizar.addEventListener("click", function(){
        atualizarNota(id, input.value, textArea.value)
    })

    var buttonExcluir = document.createElement("button")
    buttonExcluir.innerText = "Excluir"
    div.appendChild(buttonExcluir)

    buttonExcluir.addEventListener("click", function(){
        excluirNota(id, li)
    })

    document.getElementById("cards").appendChild(li)
}


async function atualizarNota(id, titulo, descricao){   
    try{
        loading(true) //Exibe o loading
        
        //Realiza a requisição para atualizar a nota com o id especificado
        const request = await fetch(URL_API+"/"+id, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: titulo, description: descricao}) //Dados da requisição
        })
        
        const dados = await request.json() //Obtém o json da resposta da requisição

        loading(false) //Oculta o loading
        
        if(request.status == 200){ //Se a requisição retornou com sucesso, adiciona a nota na inteface
            alert("Nota "+ id + " atualizada com Sucesso!")
        }else{  //Se não, dispara um erro
            throw dados
        }
    }catch(error){  //Captura os erros disparados
        console.error(error)
        alert(error.message)
    }
}

async function excluirNota(id, li){   
    try{
        loading(true) //Exibe o loading
        
        //Realiza a requisição para excluir a nota com o id especificado
        const request = await fetch(URL_API+"/"+id, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json',
            }
        })
        
        const dados = await request.json() //Obtém o json da resposta da requisição

        loading(false) //Oculta o loading
        
        if(request.status == 200){ //Se a requisição retornou com sucesso, adiciona a nota na inteface
            alert("Nota "+ id + " Excluída com Sucesso!")
            li.remove();
        }else{  //Se não, dispara um erro
            throw dados
        }
    }catch(error){  //Captura os erros disparados
        console.error(error)
        alert(error.message)
    }
}


async function buscarNotas(){
    try{       
        //Realiza a requisição para buscar notas
        const request = await fetch(URL_API, {
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        
        const dados = await request.json() //Obtém o json da resposta da requisição

        loading(false) //Oculta o loading
        
        if(request.status == 200){ //Se a requisição retornou com sucesso, adiciona a nota na inteface
            dados.forEach(function(item){
                addItemLista(item.id, item.name, item.description)
            })
        }else{  //Se não, dispara um erro
            throw dados
        }
    }catch(error){  //Captura os erros disparados
        console.error(error)
        alert(error.message)
    }
}

buscarNotas();