const testExecutor = async (req, res, next) => {
  try {
    res.status(201).send("This is executor");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

module.exports = { testExecutor };
