import app from "./src/express.js";

const port = 8000;

app.listen(port, () => {
    console.log("gateway is listen at port " + port);
});