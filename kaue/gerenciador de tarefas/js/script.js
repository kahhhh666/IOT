//PEGANDO OBJETOS DO DOM
const form_tarefas = document.querySelector('#Tarefas')
const divListar = document.querySelector('#divListarTarefa')

//CRIANDO ARRAY DE TAREFAS

const tarefas = []

//CAPTURANDO O EVENTO SUBMIT DO FORM
form_tarefas.addEventListener(('sub'), evt => {
    evt.preventDefault()//evitar carregar página toda
       
    const objFormulario = new FormData(form_tarefas)

//pega as informações e coloca em um objeto literal
    const objLiteraltarefa = {
        tarefa : objFormulario.get('tarefa'),
        responsavel : objFormulario.get('responsavel'),
        descricao : objFormulario.get('descricao'),
        prioridade: objFormulario.get('Prioridade')
    }
    tarefas.push(objLiteraltarefa)//coloca as informações no array

    form_tarefas.reset()//limpa o form
})

const listarTarefa = () =>{
    tarefas.forEach((elem,i) => {
    const divTarefa = document.createElement("div")
    divTarefa.setAttribute('class','tarefa')
    divTarefa.setAttribute('class',elem , prioridade)

    divTarefa.innerHTML = `<h2 class='titulo'> ${elem.tarefa}</h2> <h3 class='tituloResponsavel'> ${elem.responsavel}</h3>
    <p class='descTarefa'> ${elem.descricao}</p> <h3 class="tipoPrioridade" > ${elem.prioridade}</h3>`
    divListarTarefas.appendChild(divTarefa)
    })
}