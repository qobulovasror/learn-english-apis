const router = require("express").Router();

const { getVerbWithId, getVerb, getRandVerb } = require("../controllers/irregular_verbs");

router.get("/ping", (req, res) => {
  res.send("pong");
});

//get verb weith params
router.get("/", getVerb);

//get random verb
router.get("/random", getRandVerb);

//get verb with i0d
router.get("/id/:id", getVerbWithId);



module.exports = router;
