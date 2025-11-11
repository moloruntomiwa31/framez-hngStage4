import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPost = mutation({
  args: { userId: v.id("users"), content: v.string(), imageUrl: v.optional(v.string()) },
  handler: async (ctx, args) => {
    return await ctx.db.insert("posts", {
      userId: args.userId,
      content: args.content,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
    });
  },
});

export const getAllPosts = query({
  handler: async (ctx) => {
    const posts = await ctx.db.query("posts").order("desc").collect();
    const postsWithUsers = await Promise.all(
      posts.map(async (post) => {
        const user = await ctx.db.get(post.userId);
        return { ...post, user };
      })
    );
    return postsWithUsers;
  },
});

export const getUserPosts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("posts")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});
