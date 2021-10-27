const { ca } = require("date-fns/locale")

let url = "http://localhost:3000"

describe('App does exist', () => {
    it('Visits the Parkplatz App', () => {
        cy.visit(url)
    })
})

describe('Create Parklerlaubnis', () => {
    it('Creates, searches and checks a Parkerlaubnis"', () => {

        cy.contains("Test is incomplete").should('exist')

        cy.visit(url)
        cy.wait(5000)

        cy.contains('Neue Parkerlaubnis').click()
        cy.contains('Personen Details')
    })
})

describe('Delete Parklerlaubnis', () => {
    it('Searches, deletes, searches and checks a Parkerlaubnis"', () => {

        cy.visit(url)
        cy.wait(5000)
        
        cy.contains('Löscht diesen Eintrag').click()
        
        cy.wait(1000)
        cy.contains('Löschen').click()

        cy.contains("Test is incomplete").should('exist')
    })
})