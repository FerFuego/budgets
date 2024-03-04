import Form from "./classes/Form.js";
import Budget from "./classes/Budget.js";
import UI from "./classes/UI.js";


// Variables Globales
export let budget;
export let ui   = new UI();
export let form = new Form();
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