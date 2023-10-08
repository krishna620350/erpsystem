import { set, ref } from "firebase/database";
import { exportFiles } from "./file.js";
import { doc, collection, getDocs, query, where, setDoc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";


class schoolDatabase extends  exportFiles.databaseConfiguration{
    #id;
    constructor() {
        super();
        this._schoolDoc = collection(this._store, exportFiles.data.collectionName.school);
    }

    _readData = async (data) => {
        try {
            const isData = await getDocs(query(this._schoolDoc, where("email", "==", data.email)));
            if (isData.empty) {
                exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [EMPTY] - This ${data.email} is not in the database`, exportFiles.data.color.empty);
                return {
                    message: `This ${data.email} is not in the database`,
                    success: false
                };
            }
    
            for (const doc of isData.docs) {
                const value = await bcrypt.compare(data.password, doc.data().password);
                if (value) {
                    exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [FOUND] - This ${data.email} is in the database`, exportFiles.data.color.found);
                    const docData = doc.data();
                    const { password, ...filteredData } = docData;
                    return {
                        message: {
                            id: doc.id,
                            data: filteredData,
                        },
                        success: true
                    };
                }
            }
    
            return {
                message: "Password does not match",
                success: false
            };
        } catch (err) {
            exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [ERROR] - System error`, exportFiles.data.color.error);
            console.error(`Failed to load resource: ${err}`);
            return {
                message: "System error",
                success: false,
            };
        }
    };
    

    _addData = async (data) => {
        try{
            let id;
            data.password = await bcrypt.hash(data.password, 10);
            const isEmailPresent = await getDocs(query(this._schoolDoc, where("email", "==", data.email)));

            if(!isEmailPresent.empty){
                exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [EXITS] - This ${data.email} is already in the database`, exportFiles.data.color.found);
                return {
                    message: `This ${data.email} is already in the database`,
                    success: false
                }
            }

            do{
                id = exportFiles.generateNumericID(10);
                let docs = await getDoc(doc(this._schoolDoc, id));
                if(!docs.exists()){
                    break;
                }
            }while(true);

            this.#id = id;
            await setDoc(doc(this._schoolDoc, this.#id), data);

            set(ref(this._database, `schoolLogin/${id}`),{
                email: data.email,
                password: data.password,
                timestamp: {
                    startAt: exportFiles.getCurrentDateTime(),
                    endAt: "00/00/0000, 00:00:00"
                }
            });
            exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [INSERT] - This ${data.email} data is inserted in the database`, exportFiles.data.color.write);
            return {
                success: true,
            }
            
        }catch(err){
            exportFiles.logFile.writeLog(`${exportFiles.getCurrentDateTime()} - [ERROR] - System error`, "red");
            console.error(`Failed to load resource: ${err}`);
            return {
                message: "System error",
                success: false,
            }
        }
    };
}

export {schoolDatabase}