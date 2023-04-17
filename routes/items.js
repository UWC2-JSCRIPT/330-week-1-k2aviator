const { Router } = require("express");
const router = Router();

const itemDao = require('../daos/items');

router.get("/", (req, res, next) => {
  res.json(itemDao.getAll())
});

router.get("/:id", (req, res, next) => {
  const id = req.params.id
  const item = itemDao.getById(id)
    if (!item) {
      return res.status(404).send("Item not found")
    }
  res.json(item)
});

router.post("/", (req, res, next) => {
  itemDao.create(req.body);
  res.sendStatus(200);
});

router.put("/:id", (req, res, next) => {
  const id = req.params.id
  itemDao.updateById(id,req.body)
  res.sendStatus(200)
});

router.delete("/:id", (req, res, next) => {
  const id = req.params.id
  const item = itemDao.deleteById(id)
  res.status(200).send("Item deleted")
});

module.exports = router;
