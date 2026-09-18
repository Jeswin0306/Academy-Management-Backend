import { drizzle } from "drizzle-orm/node-postgres";
import { log } from "node:console";
import { Pool } from "pg";
import * as schema from "./schema.js";
import "dotenv/config";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});


export async function testDatabaseConnection() {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log("Database connected successfully");
    console.log('database time :', result.rows[0]);
  } catch(error){
    console.log("Database connection failed :", error);
  }
}

export const db = drizzle(pool, {schema,});
