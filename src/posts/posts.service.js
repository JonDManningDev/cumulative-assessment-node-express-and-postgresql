const knex = require("../db/connection");

async function create(post) {
  const createdRecords = await knex("posts").insert(post).returning("*");
  return createdRecords[0];
}

function read(postId) {
  return knex("posts").select("*").where({ post_id: postId }).first();
}

async function update(updatedPost) {
  //your solution here
  const postId = updatedPost.post_id;
  const updatedRecords = await knex("posts")
    .update(updatedPost)
    .where({ post_id: postId })
    .returning("*");
  return updatedRecords[0];
}

function destroy(postId) {
  //your solution here
  return knex('posts').del().where({ 'post_id': postId});
}

module.exports = {
  create,
  read,
  update,
  delete: destroy,
};
