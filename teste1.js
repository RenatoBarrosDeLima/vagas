var data = require("./fakeData");

const getUser = (req, res, next) => {
  // Converter o texto do parâmetro 'name' para minúsculas, e verifica se o parâmetro 'name' realmente existe
  const name = req.query.name?.toLowerCase();

  // Se o parâmetro 'name' não foi informado é retornando essa informação para o usuário
  if (!name) {
    res.status(404).send("Nome não informado");
  }

  // Substitui o loop(for) pelo método find, assim não precisa percorrer todo o array, parando no primeiro registro encontrado.
  // Não faço diferenciação entre letras maiúsculas e minúsculas, simplificando a pesquisa do usuário.
  const user = data.find((user) => user.name?.toLowerCase().includes(name));

  //Se existir usuário com o nome informado então retorna, caso contrário retorna uma mensagem informando que não foi encontrado registros
  if (user) {
    res.send(user);
  } else {
    res.status(404).send("Usuário não encontrado");
  }
};

const getUsers = (req, res, next) => {
  res.send(data);
};

module.exports = {
  getUser,
  getUsers,
};
