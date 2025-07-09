/// <reference types="cypress" />
import produtosPage from '../support/page_objects/nome-funcionliada.page';

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC 
      Para fazer um pedido de 4 produtos 
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      produtosPage.visitarUrl()
  });

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      
  cy.fixture('produtos').then(dados => {
    // Adicionar os 4 produtos
    for (let i = 0; i < 4; i++) {
      produtosPage.visitarProduto(dados[i].nomeProduto)
      produtosPage.adicionarProdutoAoCarrinho(
        dados[i].tamanho,
        dados[i].cor,
        dados[i].quantidade
      )
      cy.get('.woocommerce-message').should('contain', dados[i].nomeProduto)
    }

    // Ir para o carrinho
    cy.get('.woocommerce-message .button.wc-forward').click()

    // Confirmar página do carrinho
    cy.url().should('include', 'carrinho')

    // Ir para o checkout
    cy.get('.checkout-button').click()

    // Preencher formulário de checkout
    cy.get('#billing_first_name').type('Aline')
    cy.get('#billing_last_name').type('Santos')
    cy.get('#billing_address_1').type('Primeiro Endereço')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('74684-572')
    cy.get('#billing_phone').type('119999-9999')
    cy.get('#billing_email').type('teste@teste.com')

    

    
    
   
    //Finalizar pedido
        cy.get('#terms').click();
        cy.get('#place_order').should('be.visible').and('not.be.disabled').click();

        //Validação
        cy.get('.woocommerce-notice', { timeout: 10000 }).should('contain', 'Obrigado. Seu pedido foi recebido.');



    // Validar confirmação de pedido
    cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
    
})
  
    });

          
      })



        
       

       

  