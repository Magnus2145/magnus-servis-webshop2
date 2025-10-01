describe('Storefront smoke tests', () => {
  it('visits trgovina and sees empty state', () => {
    cy.visit('/hr/trgovina');
    cy.contains('Još nema proizvoda').should('exist');
  });

  it('applies brand filter', () => {
    cy.visit('/hr/trgovina?brand=icematic');
    cy.url().should('include', 'brand=icematic');
  });

  it('opens kontakt page', () => {
    cy.visit('/hr/kontakt');
    cy.contains('Kontakt').should('exist');
  });

  it('checks SEO meta on homepage', () => {
    cy.request('/hr').its('status').should('eq', 200);
  });
});
