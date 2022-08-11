const { render } = require('ejs');
const { request } = require('express');
var express = require('express');
var router = express.Router();
var dao = require('../database/dao');

router.get('/', function(resquest, response) {
    dao.list().then(([rows]) => {
        response.render('funcionarios/list', {funcionarios: rows})
    }).catch(err => {
        console.log(err)
        response.render('funcionarios/list', {funcionarios: []})
    }) 
});

router.post('/delete', function(request, response) {
    dao.remove(request.body.id)
    .then(([result]) => {
        console.log(result)
        if(result.affectedRows > 0)
            request.flash('success', 'Funcionário excluído com sucesso.')
        else
            request.flash('success', `Não foi encontrando no banco o funcionário com o id = ${request.body.id}`)
        response.redirect('/funcionarios')
    }).catch(err => {
        console.log(err)
        request.flash('error', 'Ocorreu um erro na exclusão do funcionário.')
        response.redirect('/funcionarios')
    })


})

router.get('/form', async function(request, response) {

    let row = {
        id:'',
        nome: '',
        email: '',
        data_nascimento: '',
        cpf: '',
        cidade: '',
        tipo_contrato: ''
    }

    if(request.query.id) {
        [result] = await dao.findById(request.query.id)
        console.log(result)
        row = result[0]
        console.log(row)
    }

    response.render('funcionarios/form', {funcionario: row})
})

router.post('/save', function(request, response) {
    let operacao; 
    if(request.body.id) {
        operacao = dao.update
        success = `Dados do funcionários atualizados com sucesso.`
    } else {
        operacao = dao.save
        success = `Funcionário cadastrado com sucesso.`
    }

    operacao(request.body)
    .then(([result]) => {
        request.flash('success', success)
        response.redirect('/funcionarios')
    }).catch(err => {
        console.log(err)
        request.flash('error', `Não foi possivel cadastrar o funcionário.`)
        response.redirect('/funcionarios')
    })

})

router.get('/search', function(request, response) {
    if(request.query.nome) {
        dao.search(request.query.nome)
        .then(([rows]) => {
            response.render('funcionarios/list', {funcionarios: rows})
        }).catch(err => {
            console.log(err)
            request.flash('error', 'Não foi possível efetuar a busca por nome')
            response.redirect('/funcionarios')
        })
    } else {
        response.redirect('/funcionarios')
    }

    
    
})

module.exports = router;