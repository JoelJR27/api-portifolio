import "dotenv/config";

import app from "./src/app/app.js";

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`SERVIDOR RODANDO NA PORTA: ${process.env.SERVER_PORT}`);
});
