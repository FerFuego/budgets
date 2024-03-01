/**
 * Custom class to calculate Budget
 * Budget Page
 * @author Fer Catalano
 */
class Budget {

    constructor (budget) {
        this.budget = Number(budget);
        this.remaining = Number(budget);
        this.expenses = [];
    }

    // Set expenses
    setExpense (expense) {
        this.expenses = [...this.expenses, expense];
        // Show expenses
        ui.setExpensesList(this.expenses);
        // Calculate budgets
        this.calculateBudgets();
    }

    // Delete expense
    deleteExpense (id) {
        this.expenses = this.expenses.filter(expense => expense.id !== id);
        // Show expenses
        ui.setExpensesList(this.expenses);
        // Calculate budgets
        this.calculateBudgets();
    }

    // Calculate remaining
    calculateBudgets() {

        // Calculate total
        const total = this.expenses.reduce((totalAcumulado, expense) => totalAcumulado + expense.amount, 0); // 0 is initial value
        this.remaining = this.budget - total;

        const data = {
            budget: this.budget,
            remaining: this.remaining
        }
        // Show remaining
        ui.insertBudget(data);
    }
}

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

        this.result.classList.remove('alert-success')
        this.result.classList.remove('alert-warning')
        this.result.classList.remove('alert-info')
        this.result.classList.remove('alert-danger')

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

// Form Class
class Form {
    
    init () {
        // Get inputs
        this.expense = document.querySelector('#gasto');
        this.amount = document.querySelector('#cantidad');
        this.form = document.querySelector('#add-expense');
        this.form.addEventListener('submit', this.validate.bind(this) );
    }

    validate (e) {
        e.preventDefault();

        // Validate
        if (this.expense.value === '' || this.amount.value === '') {
            // Error
            ui.showMessage('Ambos campos son obligatorios', 'error');
        } else if (this.amount.value <= 0) {
            // Error
            ui.showMessage('Cantidad no valida', 'error');
        } else {
            // Send data
            this.sendData();
            // Success
            ui.showMessage('Gasto insertado correctamente', 'success');
        }
    }

    sendData () {
        // Data
        const data = {
            id: Date.now(),
            name: this.expense.value,
            amount: Number(this.amount.value)
        }
        // Insert data
        budget.setExpense(data);
    }
}

// Variables Globales
let budget;
let ui   = new UI();
let form = new Form();
    form.init();

// Event Listener
document.addEventListener('DOMContentLoaded', preguntarPresupuesto() );

// Functions Prompt
function preguntarPresupuesto () {

    const userBudget = prompt('¿Cual es tu presupuesto?');
    
    if (!userBudget || userBudget === null || isNaN(userBudget) || userBudget <= 0) {
        window.location.reload();
    }

    // Set budget
    budget = new Budget(userBudget);

    // Show budget
    ui.insertBudget(budget);
}