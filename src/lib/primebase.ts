import { Primebase } from "../primebase";
import { APP_BASE_URL } from "./url";

console.log({ APP_BASE_URL });

export const primebase = new Primebase(APP_BASE_URL);