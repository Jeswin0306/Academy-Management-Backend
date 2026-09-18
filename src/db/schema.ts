import { pgTable, serial, varchar, boolean, timestamp, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role",[
  "ADMIN",
  "STAFF",
  "TEACHER",
  "STUDENT",
]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length : 225 }).notNull(),
  email: varchar("email", { length : 225 }).unique().notNull(),
  password: varchar("password", { length : 225 }).notNull(),
  role: userRoleEnum("role").notNull(),
  is_active: boolean("isActive").notNull().default(true),
  created_at: timestamp("createdAt").defaultNow().notNull(),
  updated_at: timestamp("updatedAt").defaultNow().notNull(),
});

