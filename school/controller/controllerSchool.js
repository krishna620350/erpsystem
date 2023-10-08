import { exportFiles } from "./files.js";
import { Mixin } from 'ts-mixer'

class schoolController extends Mixin(exportFiles.schoolDatabase, exportFiles.schoolInterface, exportFiles.SchoolModel){
    constructor(){
        super();
        this._data = {};
    };

    // @override
    findSchool = async (req, res) => {
        try{
            this._data = req.query;
            const result = await this._readData(this._data);

            if(result.success){
                res.status(200).json(result);
            }else{
                res.status(404).json(result);
            }
        }catch(err){
            console.log(err);
            res.status(404).json({message: "system failure", success: false});
        }
    };

    // @override
    registerSchool = async (req, res) => {
        try{
            this._data = req.body;
            const errors = this._validation(this._data);
            if(Object.keys(errors).length === 0){
                const result = await this._addData(this._data);
                if (result.success) {
                    // School successfully registered
                    res.status(200).json({ message: 'School registered successfully', success: true });
                } else {
                    // Error in adding data
                    res.status(500).json(result);
                }
            }else{
                res.status(203).json({message: errors, success: false});
            }
        }catch(err){
            console.log(err);
            res.status(404).json({message: "system failure", success: false});
        }
    };

    // @override
    modifySchool = (req, res) => {

    };

    // @override
    deleteSchool = (req, res) => {

    };

    // @override
    verifySchool = (req, res) => {

    };
}
const schoolControllerObject = new schoolController();
export {schoolControllerObject};