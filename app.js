var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var data = require("./fakeData");

var teste1 = require("./teste1");
var teste2 = require("./teste2");
var teste3 = require("./teste3");
var teste4 = require("./teste4");
var teste5 = require("./teste5");

app.set("view engine", "jade");

app.use(express.json());
app.use(express.urlencoded());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.send(`get user/ </br>
  get users/ </br>
  post users/ </br>
  delete users/ </br>
  put users/ </br>
  `);
});

const checkPermissionsDelete = (req, res, next) => {
  // Suponha que o ID do usuário seja passado pelo cabeçalho da requisição
  const userId = req.headers["user-id"];

  if (!userId) {
    res.status(403).send("Permissão negada");
  }

  // Permissão necessária para a ação de deletar
  const allowedPermissions = "delete";

  const user = data.find((user) => user.id == userId);

  if (!user) {
    res.status(403).send("Permissão negada");
  }

  if (
    user.permissions?.some((permission) => permission == allowedPermissions)
  ) {
    next();
  } else {
    res.status(403).send("Permissão negada");
  }
};

const checkPermissionsUpdate = (req, res, next) => {
  // Suponha que o ID do usuário seja passado pelo cabeçalho da requisição
  const userId = req.headers["user-id"];

  // Permissão necessária para a ação de editar
  const allowedPermissions = "update";

  const user = data.find((user) => user.id == userId);

  if (!user) {
    res.status(403).send("Permissão negada");
  }

  if (
    user.permissions?.some((permission) => permission == allowedPermissions)
  ) {
    next();
  } else {
    res.status(403).send("Permissão negada");
  }
};

// Agora é esperado receber o ID do usuário na busca, sendo assim, para buscar um usuário a rota é utilizada dessa forma:
// {host}/user/ID, sendo que o 'ID' é o ID do usuário
app.get("/user/:id", teste1.getUser);

app.get("/users", teste1.getUsers);
app.post("/users", teste2);

// Agora é esperado receber o ID do usuário na exclusão, sendo assim, para excluir um usuário a rota é utlizada dessa forma:
// {host}/users/ID, sendo que o 'ID' é o ID do usuário
// Como foi criado o middleware agora também é necessário passar o user-id no headers, sendo que esse user-id é o ID do usuário
// Foi criado uma chave 'permissions' no fakeData, em que essa chave é que dá as permissões para o usuário apagar ou editar um usuário
app.delete("/users/:id", checkPermissionsDelete, teste3);

// Agora é esperado receber o ID do usuário na edição, sendo assim, para editar um usuário a rota é utlizada dessa forma:
// {host}/users/ID, sendo que o 'ID' é o ID do usuário
// Como foi criado o middleware agora também é necessário passar o user-id no headers, sendo que esse user-id é o ID do usuário
// Para conceder permissões de apagar ou editar basta atualizar o usuário passando a chave "permissions": ["update", "delete"], podendo passar apenas uma dessas
app.put("/users/:id", checkPermissionsUpdate, teste4);

// Rota para definir quantas vezes um usuário foi lido na função getUser do teste1
app.get("/user/count/:id", teste1.getUserListCount);

app.get("/users/access", teste5);

const port = 3000;
app.listen(port, function () {
  console.log("Express server listening on port " + port);
});
