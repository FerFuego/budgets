// UI Class
class UI {

    constructor () {
        this.form = document.querySelector('#add-expense');
        this.result = document.querySelector('.restante');
        this.expenseList = document.querySelector('#expense-list ul');
    }

    insertBudget (data) {
        // Extract data
        const { budget, remaining } = data;
        // Show budget
        document.querySelector('#total').textContent = budget;
        document.querySelector('#remaining').textContent = remaining;
        // check budget
        this.checkBudget(data);
    }

    showMessage (message, type) {
        const div = document.createElement('div');
        div.classList.add('text-center', 'alert');
        if (type === 'error') {
            div.classList.add('alert-danger');
        } else {
            div.classList.add('alert-success');
        }
        // Add text
        div.appendChild(document.createTextNode(message));
        // Insert into DOM
        document.querySelector('.primario').insertBefore(div, this.form);
        // Remove alert after 3 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 3000);
        // Reset form
        this.form.reset();
    }

    setExpensesList (expenses) {
        let result = '';
        expenses.forEach(expense => {
            const { id, name, amount } = expense;
            result += `
                <li class="list-group-item d-flex justify-content-between align-items-center" id="expense-${id}">
                    ${name}
                    <span class="badge badge-primary badge-pill">$ ${amount}</span>
                    <a href="#" class="badge badge-danger badge-pill borrar-gasto" onclick="budget.deleteExpense(${id})" data-id="${id}">&times;</a>
                </li>
            `;
        });
        this.expenseList.innerHTML = result;
    }

    checkBudget (data) {
        // Extract data
        const { budget, remaining } = data;

        this.result.classList.remove('alert-success','alert-warning','alert-info','alert-danger')

        if (remaining <= 0) {
            this.form.querySelector('button[type="submit"]').disabled = true;
            this.result.classList.add('alert-danger')
            this.showMessage('El presupuesto se ha agotado', 'error');
        } else if ((budget / 4) > remaining) {
            this.result.classList.add('alert-warning')
            this.form.querySelector('button[type="submit"]').disabled = false;
        } else if ((budget / 2) > remaining) {
            this.result.classList.add('alert-info')
            this.form.querySelector('button[type="submit"]').disabled = false;
        } else {
            this.result.classList.add('alert-success')
            this.form.querySelector('button[type="submit"]').disabled = false;
        }
    }
}

export default UI;