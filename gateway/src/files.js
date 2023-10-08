import { createApiProxy, logDataMiddleware } from "../apiProxy/proxyServer.js";
import { contentSecurity } from "../security/contentSecurity.js";
import {typeSecurityGroup} from "../security/typeSecurity.js";
import { data } from "../json/jsonData.cjs";

export const dataFiles = {
    createApiProxy,
    logDataMiddleware,
    path: data.local,
    port: data.port,
    contentSecurity,
    typeSecurityGroup
}