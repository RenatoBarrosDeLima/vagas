var data = require("./fakeData");

const getUser = (req, res, next) => {
  // A forma ideal de buscar um registro de usuário é utilizando o id, então apliquei a busca pelo id, pois assim se torma mais performatico a busca de usuário
  const { id } = req.params;

  // Se o parâmetro 'id' não foi informado é retornando essa informação para o usuário
  if (!id) {
    res.status(404).send("ID não informado");
  }

  // Substitui o loop(for) pelo método find, assim não precisa percorrer todo o array, parando no primeiro registro encontrado.
  // Agoara a busca não é mais pelo nome, e sim pelo ID do usuário, simplificando a pesquisa do usuário.
  const user = data.find((user) => user.id == id);

  //Se existir usuário com o ID informado então retorna, caso contrário retorna uma mensagem informando que não foi encontrado registros
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
