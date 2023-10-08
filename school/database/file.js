import { databaseConfiguration } from "./config.js";
import { logFile } from "../logs/log.js";

import { data } from "../json/jsonData.cjs";
export const exportFiles = {
    databaseConfiguration,
    getCurrentDateTime: () => new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })).toLocaleString(),
    generateNumericID: length => Math.floor(Math.random() * Math.pow(10, length)).toString().padStart(length, '0'),
    logFile,
    data
}