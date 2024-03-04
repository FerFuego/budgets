import { ui } from '../app.js';
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

export default Budget;