import students from '../fixtures/students.json'

import studentPage from '../support/pages/StudentPage'

describe('students', () => {

    it('deve poder cadastrar um novo aluno', () => {
        const student = students.create

        cy.task('deleteStudent', student.email)
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('Dados cadastrados com sucesso.')
    })

    it('não deve cadastrar com email duplicado', () => {
        const student = students.duplicate

        cy.task('resetStudent', student)
        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.popup.haveText('O email informado já foi cadastrado!')
    })

    it('deve remover um aluno sem matrícula', () => {
        const student = students.remove

        cy.task('resetStudent', student)
        cy.adminLogin()

        studentPage.search(student.name)
        studentPage.remove(student.email)

        studentPage.popup.confirm()
        studentPage.popup.haveText('Exclusão realizada com sucesso.')
    })

    it.only('todos os campos são obrigatórios', () => {
        const student = students.required

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)
        studentPage.requiredMessage('Nome completo', 'Nome é obrigatório')
        studentPage.requiredMessage('E-mail', 'O email é obrigatório')
        studentPage.requiredMessage('Idade', 'A idade é obrigatória')
        studentPage.requiredMessage('Peso (em kg)', 'O peso é obrigatório')
        studentPage.requiredMessage('Altura', 'A altura é obrigatória')
    })

    //automatizar o cenário onde o administrador tenta cadastrar um aluno com idade menor de 16 anos
    //automatizar o cenário onde o administrador informa o peso igual ou menor que zero
    //automatizar o cenário onde o administrador informa a altura igual ou menor que zero

    //quando o peso é menor ou igual que zero deve retornar a mensagem "peso não permitido"
    //quando a altura é igual ou menor que zero deve retornar a mensagem "altura não permitida"
})