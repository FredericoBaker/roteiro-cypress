describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  // ----- Novos testes implementados -----
  
  it('Edita uma tarefa e marca como completa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa para editar{enter}');

    // Edita a tarefa
    cy.get('.todo-list li')
      .dblclick()
      .find('.edit')
      .clear()
      .type('Tarefa editada{enter}');

    // Marca a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Tarefa editada')
      .and('have.class', 'completed');
  });

  it('Limpa todas as tarefas completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa a ser completada{enter}')
      .type('Outra tarefa{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.get('.clear-completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Outra tarefa');
  });

  it('Marca uma tarefa como completa e depois desmarca', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Tarefa para completar{enter}');

    // Marca a tarefa como completa
    cy.get('.todo-list li .toggle')
      .click();

    // Verifica se a tarefa está marcada como completa
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.class', 'completed');

    // Desmarca a tarefa
    cy.get('.todo-list li .toggle')
      .click();

    // Verifica se a tarefa está desmarcada
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('not.have.class', 'completed');
  });

});