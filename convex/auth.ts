import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const signUp = mutation({
  args: { email: v.string(), password: v.string(), name: v.string() },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (existing) throw new Error("User already exists");
    
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: args.password,
      name: args.name,
    });
    
    return userId;
  },
});

export const login = mutation({
  args: { email: v.string(), password: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
    
    if (!user || user.password !== args.password) {
      throw new Error("Invalid credentials");
    }
    
    return user._id;
  },
});

export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});
