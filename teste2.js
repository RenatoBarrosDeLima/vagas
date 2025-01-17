var data = require("./fakeData");

module.exports = function (req, res) {
  // Foi aplicado a destructuring nas variáveis 'name' e 'job'
  //  O código original não estava funcionando, pois estava sendo declarada uma variável 'jov' e sendo utilizada outra chamada 'job'
  const { name, job } = req.body;

  // Fiz um tratamento para evitar de salvar um registro sem 'name' e 'job'
  if (!name || !job) {
    res.status(500).send("É necessário informar name e job");
  }

  // Lógica para adicionar o ID nos novos registros criados
  var id = data[data.length - 1].id + 1;

  // Aqui também foi aplicado a destructuring para melhorar ainda mais o código
  var newUser = { id, name, job };

  data.push(newUser);

  res.send(newUser);
};
