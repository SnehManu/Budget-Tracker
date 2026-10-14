import app from "./app.js";
import { db } from "./config/db.js";

if (!process.env.VERCEL) {
  await db();
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`local host running at port ${port}`);
  });
}

export default app;
