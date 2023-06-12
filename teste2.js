var data = require("./fakeData");

module.exports = function (req, res) {
  // Foi aplicado a destructuring nas variáveis 'name' e 'job'
  //  O código original não estava funcionando, pois estava sendo declarada uma variável 'jov' e sendo utilizada outra chamada 'job'
  const { name, job } = req.body;

  // Fiz um tratamento para evitar de salvar um registro sem 'name' e 'job'
  if (!name || !job) {
    res.status(500).send({ error: "É necessário informar name e job" });
  }

  // Aqui também foi aplicado a destructuring para melhorar ainda mais o código
  var newUser = { name, job };

  data.push(newUser);

  res.send(newUser);
};
