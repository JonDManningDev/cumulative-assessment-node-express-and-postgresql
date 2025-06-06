const knex = require("../db/connection");

function list() {
  // your solution here
  return knex("comments").select("*");
}

async function listCommenterCount() {
  // your solution here
  const counts = await knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .select("u.user_email as commenter_email")
    .count("c.comment_id")
    .groupBy("commenter_email")
    .orderBy("commenter_email");

  return counts.map((count) => ({
    ...count,
    count: parseInt(count.count),
  }));
}

function read(commentId) {
  // your solution here
  return knex("comments as c")
    .join("users as u", "c.commenter_id", "u.user_id")
    .join("posts as p", "c.post_id", "p.post_id")
    .select(
      "c.comment_id",
      "c.comment",
      "u.user_email as commenter_email",
      "p.post_body as commented_post"
    )
    .where({ "c.comment_id": commentId })
    .first();
}

module.exports = {
  list,
  listCommenterCount,
  read,
};
