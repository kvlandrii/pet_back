import { config } from "./config/env";
import app from "./app";
import { connectDB } from "./config/db";

connectDB();

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});
