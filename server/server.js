const express = require("express");
const port = 5000;

const app = express();
app.use(express.json());

const trelloRouter = require("./routes/routes");
app.use("/trello", trelloRouter);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
