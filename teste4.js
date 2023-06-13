var data = require("./fakeData");

module.exports = function (req, res) {
  const { id } = req.params;
  const { name, job, permissions } = req.body;

  // Apliquei a destructuring na variável ID

  // Se o parâmetro 'id' não foi informado é retornando essa informação para o usuário
  if (!id) {
    res.status(404).send("ID não informado");
  }

  // Fiz um tratamento para evitar de atualizar um registro sem 'name' e 'job'
  if (!name && !job && !permissions) {
    res.status(500).send("É necessário informar name ou job");
  }

  const user = data.find((user) => user.id == id);
  //Se existir usuário com o ID informado então atualiza, caso contrário retorna uma mensagem informando que não foi encontrado registros
  if (user) {
    if (name) {
      user.name = name;
    }
    if (job) {
      user.job = job;
    }
    if (permissions) {
      user.permissions = permissions;
    }
    res.send(user);
  } else {
    res.status(404).send("Usuário não encontrado");
  }
};
