describe('Blog app', function() {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.request('POST',`${Cypress.env('BACKEND')}/users`, {
      name: 'Test User', username: 'user', password: 'abc123'
    })
    cy.request('POST',`${Cypress.env('BACKEND')}/users`, {
      name: 'User Test', username: 'user2', password: '123abc'
    })
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('abc123')
      cy.get('#login-button').click()

      cy.contains('blogs')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('user')
      cy.get('#password').type('abc123-no')
      cy.get('#login-button').click()

      cy.contains('invalid username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user', password: 'abc123' })
    })

    it('A Blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('input[placeholder="title"]').type('testblog')
      cy.get('input[placeholder="author"]').type('Tester')
      cy.get('input[placeholder="url"]').type('http://test.com')
      cy.get('#create-button').click()

      cy.contains('testblog Tester')
    })

    describe('and a blog exist', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'testblog',
          author: 'Tester',
          url: 'http://test.com'
        })
      })

      it('a blog can be liked', function() {
        cy.contains('button', 'view').click()
        cy.contains('button', 'like').click()

        cy.contains('likes: 1')
      })

      it('user who created a blog can remove it', function() {
        cy.contains('button', 'view').click()
        cy.contains('button', 'remove').click()

        cy.contains('testblog').should('not.exist')
      })

      it('blog remove button is only visible to its creator', function() {
        cy.login({ username: 'user2', password: '123abc' })

        cy.contains('button', 'view').click()
        cy.contains('button', 'remove').should('not.exist')
      })
    })

    describe('and several blogs exist', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'a blog with 0 likes', author: 'Tester1', url: 'http://test.com' })
        cy.createBlog({ title: 'a blog with 1 likes', author: 'Tester2', url: 'http://test2.com' })
        cy.createBlog({ title: 'a blog with 2 likes', author: 'Tester3', url: 'http://test3.com' })
      })

      it('blogs are sorted by likes', function() {
        cy.contains('a blog with 1 likes').parent().as('blog1')
        cy.get('@blog1').contains('button', 'view').click()
        cy.get('@blog1').contains('button', 'like').click()
        cy.get('@blog1').contains('likes: 1')

        cy.contains('a blog with 2 likes').parent().as('blog2')
        cy.get('@blog2').contains('button', 'view').click()
        for (let i=1; i <= 2; i++) {
          cy.get('@blog2').contains('button', 'like').click()
          cy.get('@blog2').contains(`likes: ${i}`)
        }

        cy.get('.blog').eq(0).contains('blog with 2 likes')
        cy.get('.blog').eq(1).contains('blog with 1 like')
        cy.get('.blog').eq(2).contains('blog with 0 likes')
      })

    })
  })
})