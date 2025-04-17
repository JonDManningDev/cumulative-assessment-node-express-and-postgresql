const service = require("./posts.service.js");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function postExists(req, res, next) {
  const { postId } = req.params;

  const post = await service.read(postId);
  if (post) {
    res.locals.post = post;
    return next();
  }
  return next({ status: 404, message: `Post cannot be found.` });
}

async function create(req, res) {
  // your solution here
  const { data } = req.body;
  const post = await service.create(data);
  return res.status(201).json({ data: post });
}

async function update(req, res) {
  // your solution here
  const { data } = req.body;
  return res.json({ data: await service.update(data) });
}

async function destroy(req, res) {
  // your solution here
  const { postId } = req.params;
  const deleted = await service.delete(postId);
  return res.sendStatus(204);
}

module.exports = {
  create: asyncErrorBoundary(create),
  update: [asyncErrorBoundary(postExists), asyncErrorBoundary(update)],
  delete: [asyncErrorBoundary(postExists), asyncErrorBoundary(destroy)],
};
