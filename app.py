from flask import Flask, jsonify, request
from config import create_app

app, mysql = create_app()

# Rota para retornar os voluntários em formato JSON
@app.route('/voluntarios')
def listar_voluntarios():
    with app.app_context():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM voluntarios_colaboradores")
        voluntarios = cur.fetchall()
        cur.close()

        # Converter os resultados em uma lista de dicionários
        voluntarios_json = []
        for voluntario in voluntarios:
            voluntario_dict = {
                'id': voluntario[0],
                'cpf': voluntario[1],
                'nome': voluntario[2],
                'email': voluntario[3],
                'data_nascimento': voluntario[4].strftime('%Y-%m-%d'),
                'tipo': voluntario[5],
                'sexo': voluntario[6],
                'funcao': voluntario[7]
            }
            voluntarios_json.append(voluntario_dict)

        # Retornar os voluntários em formato JSON
        return jsonify(voluntarios_json)

# Rota para criar um novo usuário
@app.route('/createVoluntarioColaborador', methods=['POST'])
def criar_voluntario_colaborador():
    try:
        # Obter os dados do novo voluntário colaborador a partir do corpo da requisição
        novo_voluntario = request.get_json()

        # Extrair os campos do novo voluntário colaborador
        cpf = novo_voluntario['cpf']
        nome = novo_voluntario['nome']
        email = novo_voluntario['email']
        data_nascimento = novo_voluntario['data_nascimento']
        tipo = novo_voluntario['tipo']
        sexo = novo_voluntario['sexo']
        funcao = novo_voluntario['funcao']

        with app.app_context():
            cur = mysql.connection.cursor()
            # Executar a inserção do novo voluntário colaborador no banco de dados
            cur.execute("INSERT INTO voluntarios_colaboradores (cpf, nome, email, data_nascimento, tipo, sexo, funcao) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                        (cpf, nome, email, data_nascimento, tipo, sexo, funcao))
            mysql.connection.commit()
            cur.close()

            # Retornar uma resposta de sucesso
            return jsonify({'message': 'Novo voluntário colaborador criado com sucesso'}), 201

    except Exception as e:
        # Em caso de erro, retornar uma resposta com o erro ocorrido
        return jsonify({'error': str(e)}), 500

# Rota para atualizar os dados de um voluntário colaborador
@app.route('/updateVoluntarioColaborador', methods=['PUT'])
def atualizar_voluntario_colaborador():
    try:
        # Obter os dados atualizados do voluntário colaborador a partir do corpo da requisição
        dados_atualizados = request.get_json()

        # Extrair os campos atualizados
        cpf = dados_atualizados['cpf']
        nome = dados_atualizados['nome']
        email = dados_atualizados['email']
        data_nascimento = dados_atualizados['data_nascimento']
        tipo = dados_atualizados['tipo']
        sexo = dados_atualizados['sexo']
        funcao = dados_atualizados['funcao']

        with app.app_context():
            cur = mysql.connection.cursor()
            # Executar a atualização dos dados do voluntário colaborador no banco de dados
            cur.execute("UPDATE voluntarios_colaboradores SET nome = %s, email = %s, data_nascimento = %s, tipo = %s, sexo = %s, funcao = %s WHERE cpf = %s",
                        (nome, email, data_nascimento, tipo, sexo, funcao, cpf))
            mysql.connection.commit()
            cur.close()

            # Retornar uma resposta de sucesso
            return jsonify({'message': 'Dados do voluntário colaborador atualizados com sucesso'}), 200

    except Exception as e:
        # Em caso de erro, retornar uma resposta com o erro ocorrido
        return jsonify({'error': str(e)}), 500

# Rota para excluir um voluntário colaborador
@app.route('/deleteVoluntarioColaborador', methods=['DELETE'])
def excluir_voluntario_colaborador():
    try:
        # Obter o CPF do voluntário colaborador a ser excluído a partir do corpo da requisição
        dados_exclusao = request.get_json()
        cpf = dados_exclusao['cpf']

        with app.app_context():
            cur = mysql.connection.cursor()
            # Executar a exclusão do voluntário colaborador no banco de dados
            cur.execute("DELETE FROM voluntarios_colaboradores WHERE cpf = %s", (cpf,))
            mysql.connection.commit()
            cur.close()

            # Retornar uma resposta de sucesso
            return jsonify({'message': 'Voluntário colaborador excluído com sucesso'}), 200

    except Exception as e:
        # Em caso de erro, retornar uma resposta com o erro ocorrido
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run()
