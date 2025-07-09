class ProdutosPage {

    visitarUrl(parametros){
     cy.visit('produtos')   
    }

    buscarProduto(nomeProduto) {
       cy.get('[name="s"]').eq(1).type(nomeProduto)
       cy.get('.button-search').eq(1).click()
    }

    buscarProdutoLista(nomeProduto) {
        cy.get('.products > .row')
        .contains(nomeProduto)
        .click()

    }

    visitarProduto(nomeProduto) {
       // cy.visit(`produtos/${nomeProduto}`)
       const urlFormatada = nomeProduto.replace(/ /g, '-')
       cy.visit(`produtos/${urlFormatada}`)

    }

    adicionarProdutoAoCarrinho(tamanho, cor, quantidade) {
       // Clica no tamanho
       cy.get(`.button-variable-item-${tamanho}`, { timeout: 5000 })
       .should('be.visible')
       .click()

       // Clica na cor (remove espaços se houver)
       const corFormatada = cor.replace(/\s/g, '-')
       cy.get(`.button-variable-item-${corFormatada}`, { timeout: 5000 })
       .should('be.visible')
       .click()

       // Define a quantidade
       cy.get('input.qty')
       .should('be.visible')
       .clear()
       .type(quantidade)

       // Clica no botão de adicionar ao carrinho
       cy.get('.single_add_to_cart_button')
       .should('be.visible')
       .click()
    }

    irParaOCarrinho() {
        cy.get('.woocommerce-message .button.wc-forward')
        .should('be.visible')
        .click()
    }

    validarProdutoNoCarrinho(nomeProduto) {
        cy.get('.woocommerce-cart-form_cart_item')
        .should('contain' , nomeProduto)
    }

    validarQuantidadeNoCarrinho(quantidade) {
        cy.get('.woocommerce-cart-form_cart_item')
        .find('.qty')
        .should('contain', quantidade)
    }

    validarTotalNoCarrinho(total) {
        cy.get('.order-total')
        .should('contain', total)

    }

    validarMensagemCarrinho(mensagem) {
        cy.get('.woocommerce-message')
        .should('contain' , mensagem)
    }

    validarCheckout() {
        cy.get('.woocommerce-notice')
        .should('contain', 'Obrigado. Seu pedido foi recebido.')

    }

    

    


}

   

export default new ProdutosPage()