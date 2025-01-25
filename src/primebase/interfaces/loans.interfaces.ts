export type LOANCATEGORY = "personal" | "working";
export type LOANTYPE = "request" | "repay";
export type LOANSTATUS = "pending" | "rejected" | "accepted";
export type LOANPAYMENTSTATUS = "complete" | "in-progress" | "not-started";

export interface LoanApplication {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string; // Use string because phone numbers can be large
  dob: string; // Date of birth in string format (e.g., "19/01/2005")
  bvn: string; // Bank Verification Number as string
  nin: string; // National Identification Number as string
  address: string;
  company?: string; // Nullable since it's empty in the data
  company_address?: string; // Nullable since it's empty in the data
  annual_income?: string; // Nullable since it's empty in the data
  guarantor_1_name?: string; // Nullable since it's empty in the data
  guarantor_1_phone?: string; // Nullable since it's empty in the data
  guarantor_2_name?: string; // Nullable since it's empty in the data
  guarantor_2_phone?: string; // Nullable since it's empty in the data
  doi?: string; // Date of incorporation in string format
  tin?: string; // Tax Identification Number, nullable
  created_at: string; // Timestamp of creation
  updated_at: string;
  userId: string; // UUID of the user
  base64Image: string; // File name or base64 string of the image
  acknowledgment: boolean; // Converted from "FALSE"
  category: LOANCATEGORY // Loan category
  type: LOANTYPE; // Loan type
  status: LOANSTATUS; // Loan status
  amount: number; // Loan amount
  reason: string; // Reason for the loan
  duration: number; // Duration in days
  outstanding: number;
  repayment_amount: number; // Total repayment amount
  percentage: number; // Interest percentage
  repayment_date: string; // Repayment date in string format
  loan_date: string; // Loan date in string format
  loan_payment_status: LOANPAYMENTSTATUS;
}