import { schoolControllerObject } from "../controller/controllerSchool.js";

import { data } from "../json/jsonData.cjs";

export const controller = {
    router: data.routers,
    collection: data.collectionName,
    schoolControllerObject,

};
// console.log(controller.registration.welcome);