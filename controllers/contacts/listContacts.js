const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { page = 1, limit = 2 } = req.query;
  const skip = (page - 1) * limit;
  const result = await Contact.find(req.user, "-createdAt -updatedAt", {
    skip,
    limit,
  });

  res.json(result);
};

module.exports = listContacts;
