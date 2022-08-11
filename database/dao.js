const pool = require('./config')

let operations = {
    list: function() {
        return pool.promise().query('select * from funcionarios')
    },
    findById(id) {
        return pool.promise().query('select * from funcionarios where id=?', [id])

    },
    save: function(funcionario) {
        return pool.promise().execute('INSERT INTO funcionarios (nome, email, data_nascimento, cpf, cidade, tipo_contrato) VALUES (?, ?, ?, ?, ?, ?)', [funcionario.nome, funcionario.email, funcionario.data_nascimento, funcionario.cpf, funcionario.cidade, funcionario.tipo_contrato])
    },
    update: function(funcionario) {
        return pool.promise().execute('UPDATE funcionarios set nome=?, email=?, data_nascimento=?, cpf=?, cidade=?, tipo_contrato=? where id=?', [funcionario.nome, funcionario.email, funcionario.data_nascimento, funcionario.cpf, funcionario.cidade, funcionario.tipo_contrato, funcionario.id])
    },
    remove: function(id) {
        return pool.promise().execute('delete from funcionarios where id=?', [id])
    },
    search: function(nome) {
        return pool.promise().query('select * from funcionarios where nome like ?', ['%' + nome + '%'])
    }
}

module.exports = operations


