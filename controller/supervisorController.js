const testSupervisor = async (req, res, next) => {
  try {
    res.status(201).send("This is supervisor");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { testSupervisor };
