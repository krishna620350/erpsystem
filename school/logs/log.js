import fs from "fs";
import chalk from "chalk";

const MAX_LOG_LINES = 1000;

class logFileCreate {
    constructor() {
        this.lineCount = 0;
        this.logFileCount = 2;
        this.logFile = fs.createWriteStream("./logs/database_log_1.log", { flags: "a" });
        this.log = console.log;
    }

    writeLog(message, color) {
        this.logFile.write(message + "\n");
        this.lineCount++;

        // Check if the line count exceeds the threshold
        if (this.lineCount >= MAX_LOG_LINES) {
            // Close the current log file and create a new one
            this.logFile.close();
            this.createNewLogFile();
        }
        
        const coloredMessage = chalk[color](message);
        this.log(coloredMessage);
    }

    createNewLogFile() {
        this.lineCount = 0; // Reset line count
        const newLogFilePath = `./logs/database_log_${this.logFileCount}.log`;
        this.logFileCount ++;
        // Create the new log file
        this.logFile = fs.createWriteStream(newLogFilePath, { flags: "a" });
    }

    close() {
        this.logFile.close();
    }
}

export const logFile = new logFileCreate();