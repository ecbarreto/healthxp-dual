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

    it('todos os campos são obrigatórios', () => {
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

    it('não deve cadastrar aluno com menos de 16 anos', () => {
        const student = students.underage

        cy.adminLogin()

        studentPage.goToRegister()
        studentPage.submitForm(student)

        studentPage.requiredMessage('Idade', 'A idade mínima para treinar é 16 anos!')
    })

    it('não deve cadastrar aluno com peso igual ou menor que zero', () => {
        const studentsData = students.underweight

        cy.adminLogin()

        studentPage.goToRegister()

        studentsData.forEach((s) => {
            studentPage.submitForm(s)

            studentPage.requiredMessage('Peso (em kg)', 'Peso não permitido')
        })
    })

    it('não deve cadastrar aluno com altura igual ou menor que zero', () => {
        const studentsData = students.underheight

        cy.adminLogin()

        studentPage.goToRegister()

        studentsData.forEach((s) => {
            studentPage.submitForm(s)

            studentPage.requiredMessage('Altura', 'Altura não permitida')
        })
    })
})