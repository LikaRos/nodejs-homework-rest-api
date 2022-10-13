const express = require("express");

const ctrl = require("../../controllers/contacts");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/contact");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.listContacts));

router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validateBody(schema.addSchema), ctrlWrapper(ctrl.addContact));

router.put("/:id", validateBody(addSchema), ctrlWrapper(ctrl.updateContact));

router.patch(
  "/:id/favorite",
  validateBody(updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:id", ctrlWrapper(ctrl.removeContact));

module.exports = router;
