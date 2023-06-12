var data = require("./fakeData");

module.exports = function (req, res) {
  // A forma ideal de buscar um registro de usuário é utilizando o id, então apliquei a busca pelo id, pois assim se torma mais performatico a busca de usuário
  const { id } = req.params;

  // Se o parâmetro 'id' não foi informado é retornando essa informação para o usuário
  if (!id) {
    res.status(404).send("ID de usuário não informado");
  }

  // Substitui o loop(for) pelo método findIndex, assim não precisa percorrer todo o array, parando no primeiro registro encontrado.
  // Agoara a busca não é mais pelo nome, e sim pelo ID do usuário, simplificando a pesquisa do usuário.
  // Encontra o índice do usuário com base no ID informado
  var indexUser = data.findIndex((user) => user.id == id);

  if (indexUser !== -1) {
    // Remove o usuário do array
    data.splice(indexUser, 1);
    res.send("Usuário removido com sucesso");
  } else {
    res.status(404).send("Usuário não encontrado");
  }
};
