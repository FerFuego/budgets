import { ui, budget } from '../app.js';

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

export default Form;