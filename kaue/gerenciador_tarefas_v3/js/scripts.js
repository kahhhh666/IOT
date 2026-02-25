//PEGANDO OBJETOS DO DOM
const formTarefas = document.querySelector('#formTarefas')
//const formTarefas2 = document.getElementById('formTarefas')
const divListaTarefas = document.querySelector('#divListaTarefas')
const divCaixaTotalAlta = document.querySelector('#totalAlta')
const divCaixaTotalMedia = document.querySelector('#totalMedia')
const divCaixaTotalBaixa = document.querySelector('#totalBaixa')

const colunaAberto = document.querySelector('#colunaAberto')
const colunaEmAndamento = document.querySelector('#colunaEmAndamento')
const colunaFinalizada = document.querySelector('#colunaFinalizada')



//CRIANDO O ARRAY DE TAREFAS 
const tarefas = []

//GERADOR DE ID
//ATENÇÃO: O IDEAL É O IDE SER GERADO POR UM BANCO DE DADOS OU POR UM SISTEMA 
//BACK-END.
contId = 0

//CAPTURANDO O EVENTO SUBMIT DO FORMULÁRIO
formTarefas.addEventListener(('submit'), evt => {
    //INTERROMPE O ENVIO PADRÃO DO FORMULÁRIO
    evt.preventDefault()

    //CRIA UM OBJETO DO FORMULÁRIO 
    const objFormulario = new FormData(formTarefas)

    /*
        CRIA UM OBJETO LITERAL CARREGANDO OS COM
        DADOS DOS INPUTS E TEXTAREA DO FORMULÁRIO
    */
    const objLiteralTarefa = {
        idtarefa: contId++,
        tarefa: objFormulario.get('tarefa'),
        responsavel: objFormulario.get('reponsavel'),
        descricao: objFormulario.get('descricao'),
        prioridade: objFormulario.get('prioridade'),
        data_tarefa: objFormulario.get('data_tarefa'),
        statusTarefa: 'Aberto'

    }

    //CHAMA A FUNÇÃO addTarefas PASSANDO COMO PARÂMETRO O OBJETO LITERAL
    addTarefas(objLiteralTarefa)

    //LIMPA O FORMULÁRIO
    formTarefas.reset()

})

const addTarefas = (objTarefa) => {
    //ADICIONA O OBJETO LITERAL NO ARRAY
    tarefas.push(objTarefa)

    //CHAMA A FUNÇÃO listarTarefas 
    listarTarefas()
}

//LISTAR TAREFAS
const listarTarefas = () => {
    //MONTA AS COLUNAS DE ACORDO COM A PRIORIDADE
    montaColuna(tarefas)
}

const montaColuna = (tarefas) => {
    //LIMPAR A DIV LISTA    elem.dataTarefaelem.dataTarefa
    divListaTarefas.innerHTML = ''
    colunaAberto.innerHTML = ''
    colunaEmAndamento.innerHTML = ''
    colunaFinalizada.innerHTML = ''

    //DECLARAÇÃO DAS VARIÁVEIS DE CONTAGEM DE PRIORIDADE
    let contBaixa = 0
    let contMedia = 0
    let contAlta = 0


    tarefas.forEach((elem, i) => {
        //CRIA O ELEMENTO DIV TAREFA
        const divTarefa = document.createElement('div')

        //ATRIBUI AS CLASSES NA DIV
        divTarefa.setAttribute('class', `tarefa ${elem.prioridade}`)

        let txtInfoPrioridade = ''

        //CONTADOR DE PRIORIDADES
        if (elem.prioridade === 'alta') {
            contAlta++
            txtInfoPrioridade = 'infoAlta'
        } else if (elem.prioridade === 'media') {
            contMedia++
            txtInfoPrioridade = 'infoMedia'
        } else {
            contBaixa++
            txtInfoPrioridade = 'infoBaixa'
        }

        //DEIXANDO A DATA NO PADRÃO DO BR dd/MM/aaaa
        const objData = new Date(elem.data_tarefa + 'T00:00:00')
        const padraoDataddMMAAAA = objData.toLocaleDateString('pt-BR')

        //ATRIBUINDO OS DADOS NA DIV CRIADA UTILIZANDO A CONCATENAÇÃO TEMPLATE
        divTarefa.innerHTML = `<h2 class='titulo'> ${elem.tarefa} </h2> <h3 class='Responsavel'> ${elem.responsavel}</h3> <p class='descTarefa'> ${elem.descricao} </p> <h3 class='dataTarefa ${txtInfoPrioridade}'> Data Entrega Tarefa  ${padraoDataddMMAAAA} </h3> <h3 class='tipoPrioridade ${txtInfoPrioridade}'> ${elem.prioridade} </h3>`

        //CRIA A DIV QUE VAI RECEBER OS BOTÕES QUE MOVIMENTAM AS PRIORIDADES
        const divBtns = document.createElement('div')
        divBtns.setAttribute('class', 'btns')

        //SELECIONA O STATUS DA TAREFA
        if (elem.statusTarefa == 'Aberto') {
            let btnAndamento = criarBotao('Em Andamento', 'EmAndamento')

            let btnFinalizar = criarBotao('Finalizar', 'Finalizar')

            //CAPTURA O EVENTO DE QUE CLIQUE NOS BOTÕES
            btnAndamento.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Em Andamento')
            })

            btnFinalizar.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Finalizar')
            })

            //ADICIONA OS BOTÕES NA DIV BTNS
            divBtns.appendChild(btnAndamento)
            divBtns.appendChild(btnFinalizar)

            //ADICIONA A DIV BTNS NA DIV TAREFA
            divTarefa.append(divBtns)

            //ADICIONA A DIV TAREVA NA DIV COLUNA ABERTO
            colunaAberto.append(divTarefa)

        } else if (elem.statusTarefa == 'Em Andamento') {
            let btnAbrir = criarBotao('Reabrir', 'Abrir')

            let btnFinalizar = criarBotao('Finalizar', 'Finalizar')

            btnAbrir.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Aberto')
            })

            btnFinalizar.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Finalizar')
            })

            //ADICIONA OS BOTÕES NA DIV BTNS
            divBtns.appendChild(btnAbrir)
            divBtns.appendChild(btnFinalizar)

            //ADICIONA A DIV BTNS NA DIV TAREFA
            divTarefa.appendChild(divBtns)

            //ADICIONA A DIV TAREVA NA DIV COLUNA EM ANDAMENTO
            colunaEmAndamento.appendChild(divTarefa)
        } else {
            let btnAbrir = criarBotao('Reabrir', 'Abrir')
            let btnAndamento = criarBotao('Em Andamento', 'EmAndamento')
            btnAbrir.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Aberto')
            })

            btnAndamento.addEventListener('click', () => {
                alteraStatus(elem.idtarefa, 'Em Andamento')
            })

            //ADICIONA OS BOTÕES NA DIV BTNS
            divBtns.appendChild(btnAbrir)
            divBtns.appendChild(btnAndamento)

            //ADICIONA A DIV BTNS NA DIV TAREFA
            divTarefa.appendChild(divBtns)
            //ADICIONA A DIV TAREVA NA DIV COLUNA finalizado
            colunaFinalizada.appendChild(divTarefa)
        }

        divListaTarefas.appendChild(colunaAberto)
        divListaTarefas.appendChild(colunaEmAndamento)
        divListaTarefas.appendChild(colunaFinalizada)
    })

    divCaixaTotalAlta.innerHTML = `ALTA ${contAlta}`
    divCaixaTotalMedia.innerHTML = `MÉDIA ${contMedia}`
    divCaixaTotalMedia.innerHTML = `MÉDIA ${contMedia}`

    contarMovimentacaoes()

}

//FUNÇÃO PARA CRIAR UMA BOTÃO PASSANDO 2(DOIS) PARÂMETROS A ETIQUETA E O CLASS
// PARA O BOTÃO
const criarBotao = (etiqueta, classBtn) => {
    const botao = document.createElement('button')
    botao.setAttribute('class', `btnMovimentacao btn${classBtn}`)
    botao.innerHTML = etiqueta

    return botao
}

//CRIAR A FUNÇÃO PARA ALTERAR O STATUS DA TAREFA
const alteraStatus = (id_tarefa, status_tarefa) => {
    //PEGA O ELEMENTO NO ARRAY TAREFAS, POR MEIO DO ID DA TAREFAS, E ATRIBUI A VARIÁVEL
    const tarefaSel = tarefas.find(elem => elem.idtarefa == id_tarefa)
    //ALTERA O STATUS DA TAREFA
    tarefaSel.statusTarefa = status_tarefa

    //CHAMA A FUNÇÃO listarTarefas()
    listarTarefas()

}

const contarMovimentacaoes = () => {

    const divTotalAberto = document.querySelector('#totalAberto')
    const divTotalEmAndamento = document.querySelector('#totalEmAndamento')
    const divTotalFinalizado = document.querySelector('#totalFinalizado')

    //DECLARAÇÃO DAS VARIÁVEIS DE CONTAGEM DE MOVIMENTAÇÃO
    let contAberto = 0
    let contEmAndamento = 0
    let contFinalizada = 0

    tarefas.forEach(elem => {
        if (elem.statusTarefa == 'Aberto') {
            contAberto++
        } else if (elem.statusTarefa == 'Em Andamento') {
            contEmAndamento++
        } else {
            contFinalizada++
        }
    })

    divTotalAberto.innerHTML = `Aberto ${contAberto}`
    divTotalEmAndamento.innerHTML = `Em Andamento ${contEmAndamento}`
    divTotalFinalizado.innerHTML = `Finalizada ${contFinalizada}`

}