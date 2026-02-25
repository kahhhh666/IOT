// PEGANDO OBJETOS DO DOM
const form_tarefas = document.querySelector('#Tarefas')

const divAberto = document.querySelector('#colunaAberto')
const divEmAndamento = document.querySelector('#colunaEmAndamento')
const divFinalizado = document.querySelector('#colunaFinalizado')

const totalAlta = document.querySelector('#totalAlta')
const totalMedia = document.querySelector('#totalMedia')
const totalBaixa = document.querySelector('#totalBaixa')

// id automático
let contID = 0

// ARRAY DE TAREFAS
const tarefas = []

// EVENTO SUBMIT
form_tarefas.addEventListener('submit', evt => {

    evt.preventDefault()

    const objFormulario = new FormData(form_tarefas)

    const objLiteralTarefa = {
        idtarefa: contID++,
        tarefa: objFormulario.get('tarefa'),
        responsavel: objFormulario.get('responsavel'),
        descricao: objFormulario.get('descricao'),
        prioridade: objFormulario.get('prioridade'),
        dataTarefa: objFormulario.get('dataTarefa'),
        statusTarefa: 'Aberto'
    }

    tarefas.push(objLiteralTarefa)

    form_tarefas.reset()

    listarTarefa()
})


// LISTAR
const listarTarefa = () => {
    montarColunas()
}


// MONTAR COLUNAS
const montarColunas = () => {

    // LIMPAR COLUNAS
    divAberto.innerHTML = ''
    divEmAndamento.innerHTML = ''
    divFinalizado.innerHTML = ''

    let contBaixa = 0
    let contMedia = 0
    let contAlta = 0

    tarefas.forEach(elem => {

        const divTarefa = document.createElement('div')
        divTarefa.classList.add('tarefa', elem.prioridade)

        // CONTADORES
        if (elem.prioridade === 'alta') {
            contAlta++
        }
        else if (elem.prioridade === 'media') {
            contMedia++
        }
        else {
            contBaixa++
        }

        const objData = new Date(elem.dataTarefa + 'T00:00:00')
        const dataFormatada = objData.toLocaleDateString('pt-BR')

        divTarefa.innerHTML = `
            <h3>${elem.tarefa}</h3>
            <p><strong>ID:</strong> ${elem.idtarefa}</p>
            <p><strong>Responsável:</strong> ${elem.responsavel}</p>
            <p>${elem.descricao}</p>
            <p><strong>Prioridade:</strong> ${elem.prioridade}</p>
            <p><strong>Data:</strong> ${dataFormatada}</p>
        `

        
        if (elem.statusTarefa === 'Aberto') {
            divAberto.appendChild(divTarefa)
        }
        else if (elem.statusTarefa === 'Em Andamento') {
            divEmAndamento.appendChild(divTarefa)
        }
        else {
            divFinalizado.appendChild(divTarefa)
        }

    })

    
    totalAlta.textContent = `ALTA ${contAlta}`
    totalMedia.textContent = `MÉDIA ${contMedia}`
    totalBaixa.textContent = `BAIXA ${contBaixa}`

    
}