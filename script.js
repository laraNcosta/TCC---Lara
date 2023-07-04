const form = document.getElementById("employeeForm");

document.addEventListener("DOMContentLoaded", function() {
  const tableBody = document.querySelector("#employeeTable tbody");
  const tableHeader = document.getElementById("tableHeader");

  let editMode = false;
  let editRow = null;

  buscarVoluntarios();

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("nameInput").value;
    const data_nascimento = document.getElementById("birthInput").value;
    const sexo = document.getElementById("genderInput").value;
    const tipo = document.getElementById("typeInput").value;
    const funcao = document.getElementById("positionInput").value;
    const email = document.getElementById("emailInput").value;
    const cpf = document.getElementById("cpfInput").value;
    

    if (nome === "" || data_nascimento === "" || sexo === "" || tipo === "" || funcao === "" || email === "" || cpf === "") {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const voluntario = {
      cpf: cpf,
      nome: nome,
      email: email,
      data_nascimento: data_nascimento,
      tipo: tipo,
      sexo: sexo,
      funcao: funcao
    };

    if (editMode) {
      atualizarVoluntarioColaborador(voluntario);
    } else {
      criarVoluntarioColaborador(voluntario);
    }
  });

  tableBody.addEventListener("click", function(e) {
    const row = e.target.parentNode.parentNode;
    const cells = row.cells;

    if (e.target.classList.contains("button-delete")) {
      const data = {
        cpf: cells[6].textContent
      }
      excluirVoluntarioColaborador(data);

    } else if (e.target.classList.contains("button-edit")) {
      const name = cells[0].textContent;
      const birthDate = cells[1].textContent;
      const gender = cells[2].textContent;
      const type = cells[3].textContent;
      const position = cells[4].textContent;
      const email = cells[5].textContent;
      const cpf = cells[6].textContent;

      document.getElementById("nameInput").value = name;
      document.getElementById("birthInput").value = birthDate;
      document.getElementById("genderInput").value = gender;
      document.getElementById("typeInput").value = type;
      document.getElementById("positionInput").value = position;
      document.getElementById("emailInput").value = email;
      document.getElementById("cpfInput").value = cpf;

      editMode = true;
      editRow = row;
      form.querySelector("button[type='submit']").textContent = "Salvar";
    }
  });
});


async function buscarVoluntarios() {
  try {
    const response = await fetch('http://127.0.0.1:5000/voluntarios');
    const data = await response.json();
    exibirVoluntarios(data);

  } catch (error) {
    console.error('Erro:', error);
  }
};

function exibirVoluntarios(data){
  const tableBody = document.querySelector("#employeeTable tbody");
  tableBody.innerHTML = "";

  data.forEach(voluntario => {
    const newRow = tableBody.insertRow();

    newRow.innerHTML = `
      <td>${voluntario.nome}</td>
      <td>${voluntario.data_nascimento}</td>
      <td>${voluntario.sexo}</td>
      <td>${voluntario.tipo}</td>
      <td>${voluntario.funcao}</td>
      <td>${voluntario.email}</td>
      <td>${voluntario.cpf}</td>
      
      <td>
        <button class="button-edit">Editar</button>
        <button class="button-delete">Excluir</button>
      </td>
    `;
  
    form.reset();
    tableHeader.style.display = "table-header-group";
  });

  if (tableBody.rows.length === 0) {
    tableHeader.style.display = "none";
  } else {
    tableHeader.style.display = "table-header-group";
  }
};


async function criarVoluntarioColaborador(voluntario) {
  try {
    const response = await fetch('http://127.0.0.1:5000/createVoluntarioColaborador', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voluntario)
    });

    if (!response.ok) {
      throw new Error('Erro ao criar o voluntário colaborador');
    }

    //const data = await response.json();
    //console.log(data);
    alert('Voluntário/Colaborador criado');

    buscarVoluntarios();
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function atualizarVoluntarioColaborador(voluntario) {
  try {
    const response = await fetch('http://127.0.0.1:5000/updateVoluntarioColaborador', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voluntario)
    });

    if (!response.ok) {
      throw new Error('Erro ao atualizar o voluntário colaborador');
    }

    //const data = await response.json();
    //console.log(data);
    alert('Voluntário/Colaborador atualizado');

    buscarVoluntarios();
  } catch (error) {
    console.error('Erro:', error);
  }
}

async function excluirVoluntarioColaborador(voluntario) {
  try {
    const response = await fetch(`http://127.0.0.1:5000/deleteVoluntarioColaborador`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(voluntario)
    });

    if (!response.ok) {
      throw new Error('Erro ao excluir o voluntário colaborador');
    }

    alert('Voluntário excluído com sucesso');
    buscarVoluntarios();

  } catch (error) {
    console.error('Erro:', error);
  }
}
