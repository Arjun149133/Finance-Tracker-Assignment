import mongoose from "mongoose";

export enum CategoryEnum {
    FoodAndDining = "Food & Dining",
    Transportation = "Transportation",
    Shopping = "Shopping",
    Entertainment = "Entertainment",
    BillsAndUtilities = "Bills & Utilities",
    Healthcare = "Healthcare",
    Education = "Education",
    Travel = "Travel",
    PersonalCare = "Personal Care",
    HomeAndGarden = "Home & Garden",
    GiftsAndDonations = "Gifts & Donations",
    Other = "Other",
    Salary = "Salary",
    Freelance = "Freelance",
    Business = "Business",
    Investments = "Investments",
    RentalIncome = "Rental Income",
    Gifts = "Gifts"
}

export enum MonthEnum {
    January = "January",
    February = "February",
    March = "March",
    April = "April",
    May = "May",
    June = "June",
    July = "July",
    August = "August",
    September = "September",
    October = "October",
    November = "November",
    December = "December"
}

const TransactionSchema = new mongoose.Schema({
    title: { type: String, required: true},
    amount: { type: Number, required: true },
    month: { type: String, enum: Object.values(MonthEnum)},
    description: { type: String },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, enum: Object.values(CategoryEnum), required: true },
}, {
    timestamps: true
})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;