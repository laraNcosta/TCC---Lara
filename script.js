document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("employeeForm");
    const tableBody = document.querySelector("#employeeTable tbody");
    const tableHeader = document.getElementById("tableHeader");
  
    let editMode = false;
    let editRow = null;
  
    form.addEventListener("submit", function(e) {
      e.preventDefault();
  
      const name = document.getElementById("nameInput").value;
      const birthDate = document.getElementById("birthInput").value;
      const gender = document.getElementById("genderInput").value;
      const type = document.getElementById("typeInput").value;
      const position = document.getElementById("positionInput").value;
      const email = document.getElementById("emailInput").value;
      const cpf = document.getElementById("cpfInput").value;
      
  
      if (name === "" || birthDate === "" || gender === "" || type === "" || position === "" || email === "" || cpf === "") {
        alert("Por favor, preencha todos os campos.");
        return;
      }
  
      if (editMode) {
        const cells = editRow.cells;
        cells[0].textContent = name;
        cells[1].textContent = birthDate;
        cells[2].textContent = gender;
        cells[3].textContent = type;
        cells[4].textContent = position;
        cells[5].textContent = email;
        cells[6].textContent = cpf;
        
  
        editMode = false;
        editRow = null;
        form.reset();
        form.querySelector("button[type='submit']").textContent = "Adicionar";
      } else {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
          <td>${name}</td>
          <td>${birthDate}</td>
          <td>${gender}</td>
          <td>${type}</td>
          <td>${position}</td>
          <td>${email}</td>
          <td>${cpf}</td>
          
          <td>
            <button class="button-edit">Editar</button>
            <button class="button-delete">Excluir</button>
          </td>
        `;
  
        form.reset();
        tableHeader.style.display = "table-header-group";
      }
  
      if (tableBody.rows.length === 0) {
        tableHeader.style.display = "none";
      } else {
        tableHeader.style.display = "table-header-group";
      }
    });
  
    tableBody.addEventListener("click", function(e) {
      if (e.target.classList.contains("button-delete")) {
        const row = e.target.parentNode.parentNode;
        row.remove();
  
        if (tableBody.rows.length === 0) {
          tableHeader.style.display = "none";
        }
      } else if (e.target.classList.contains("button-edit")) {
        const row = e.target.parentNode.parentNode;
        const cells = row.cells;
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
