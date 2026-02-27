const produtosEnvio = document.querySelector('#geral')

const produtos =[]

produtosEnvio.addEventListener(('sub'), evt =>{
    evt.defaultPrevented()
    const OBJprodutos = new FormData(produtosEnvio)

    const Produtoliteral = {
        titulo : OBJprodutos.get('titulo'),
        srcimg : OBJprodutos.get('src'),
        preco : OBJprodutos.get('preco')
    }
    produtos.push(Produtoliteral)
    console.log(produtos)
})