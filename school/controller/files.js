import { data } from "../json/jsonData.cjs";

import { SchoolModel } from "../model/schoolModel.js";
import {schoolDatabase} from "../database/dataSchool.js";
import { schoolInterface } from "../interface/schoolinterface.js";


export const exportFiles = {
    saltRound: data.numberOfRounds,
    schoolInterface,
    schoolDatabase,
    SchoolModel,
}