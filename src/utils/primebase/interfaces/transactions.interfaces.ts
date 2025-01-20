export type TransactionType = "loan" | "paybills" | "transfer";
export type TransactionCategory = "credit" | "debit" | "airtime" | "data" | "bettting, lottery and gaming";
export type TransactionStatus = "success" | "failed";

export interface Transaction {
  _id: string; // Unique transaction identifier (UUID)
  name: string; // Transaction name or description
  user: string; // User ID (UUID)
  type: TransactionType; // Restricted to "loan" or "paybills"
  category: TransactionCategory; // Restricted to specific categories
  amount: number; // Amount involved in the transaction
  outstanding: number; // Outstanding amount, if any
  activity?: number; // Activity status (optional)
  details: string; // Details or description of the transaction
  transaction_number: string; // Unique transaction number
  session_id: string; // Session ID associated with the transaction
  status: TransactionStatus; // Restricted to "success" or "failed"
  created_at: string; // Timestamp of when the transaction was created
  updated_at: string; // Timestamp of when the transaction was updated
  message?: string; // Additional message, if any (optional)
  receiver: string; // Receiver information
  bank: string; // Bank details
  account_number: string; // Account number
}

export interface PayBill {
  name: string;            // The name of the bill payment
  category: string;        // The category of the bill payment
  details: string;         // Details regarding the bill payment
  customerId: string;      // The ID of the customer making the payment
  amount: number;          // The amount to be paid
  reference: string;       // A reference string for the payment
  bank: string;            // The bank associated with the payment
  division: string;        // The division of the biller
  paymentItem: string;     // The specific payment item
  productId: string;       // The product ID associated with the payment
  billerId: string;        // The ID of the biller
  phoneNumber?: string | null; // The phone number of the customer (optional)
}

export interface Transfer {
  fromAccount: string;
  fromClientId: string;
  fromClient: string;
  fromSavingsId: string;
  fromBvn: string; // Must be exactly 11 digits and only contain digits
  toClient: string;
  toSession: string;
  toBvn: string; // Must be exactly 11 digits and only contain digits
  toKyc: string;
  bank: string;
  toAccount: string;
  toBank: string;
}

