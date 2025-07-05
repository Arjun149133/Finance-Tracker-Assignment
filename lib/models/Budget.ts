import mongoose from "mongoose";
import { CategoryEnum, MonthEnum } from "./Transaction";

const BudgetSchema = new mongoose.Schema({
    category: { type: String, enum: Object.values(CategoryEnum), required: true },
    amount: { type: Number, required: true },
    month: { type: String, enum: Object.values(MonthEnum), required: true },
    description: { type: String },
}, {
    timestamps: true
})

const Budget = mongoose.models.Budget || mongoose.model('Budget', BudgetSchema);
export default Budget;