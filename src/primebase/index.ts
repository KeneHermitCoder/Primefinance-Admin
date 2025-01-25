import { Auth } from "./auth";
import { KYC } from "./kyc";
import { PayBillsAPI } from "./paybills";
import { Loan } from "./loan";
import { Data } from "./data";

export class Primebase {
    private URL: string;
    public auth: Auth; // Declare auth, kyc, paybill, and loan as public properties
    public kyc: KYC;
    public paybill: PayBillsAPI;
    public loan: Loan;
    public data: Data;

    constructor(URL: string) {
        this.URL = URL;

        // Initialize properties after URL is set
        this.auth = new Auth(`${this.URL}/api/users`);
        this.kyc = new KYC(`${this.URL}/api/kyc`);
        this.paybill = new PayBillsAPI(`${this.URL}/api/paybills`);
        this.loan = new Loan(`${this.URL}/api/loans`);
        this.data = new Data(`${this.URL}/api/data`);
    }
}