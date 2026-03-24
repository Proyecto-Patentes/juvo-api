import dotenv from "dotenv";
dotenv.config();
import { Hono } from "hono";
import { serve } from "@hono/node-server";
import plateRoutes from "./routes/plate.js";
import reportRoutes from "./routes/report.js";
import reportCategoryRoutes from "./routes/report-category.js";
import vehicleTypeRoutes from "./routes/vehicle-type.js";

const app = new Hono();

app.get("/", (c) => c.text("API running"));

app.route("/plate", plateRoutes);
app.route("/report", reportRoutes);
app.route("/report-category", reportCategoryRoutes);
app.route("/vehicle-type", vehicleTypeRoutes);

export const config = { runtime: "nodejs" };

export default app;

// Start local server when not running in Vercel
if (!process.env.VERCEL) {
  const port = Number(process.env.PORT) || 3000;
  serve({ fetch: app.fetch, port }, () => {
    console.log(`Juvo API running at http://localhost:${port}`);
  });
}
