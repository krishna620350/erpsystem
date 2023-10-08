import express from "express";
import cors from "cors";
import { dataFiles } from "./files.js";

const app = express();

app.use(cors());

app.use(dataFiles.contentSecurity);
app.use(dataFiles.typeSecurityGroup);

const proxies = [
  { path: "/school",  target: `${dataFiles.path}${dataFiles.port.school}`, name:"school"},
  { path: "/teacher", target: `${dataFiles.path}${dataFiles.port.teacher}`, name:"teacher"},
  { path: "/student", target: `${dataFiles.path}${dataFiles.port.student}`, name:"student"},
];

proxies.forEach((proxyConfig) => {
  const { path, target, name } = proxyConfig;
  const logDataMiddleware = dataFiles.logDataMiddleware(name);
  const apiProxy = dataFiles.createApiProxy(target, path);
  app.use(path, logDataMiddleware, apiProxy);
});

app.use((err, req, res, next) => {
  console.error("Global Error Handler:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;