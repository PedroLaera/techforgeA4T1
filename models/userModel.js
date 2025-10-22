let users = [];
let nextUserId = 1;

function addUser({ username, passwordHash }) {
  if (!username || !passwordHash) {
    throw new Error(
      "userName e passwordHash são obrigatórios para adicionar um usuário."
    );
  }

  const newUser = {
    id: nextUserId,
    username: username,
    passwordHash: passwordHash,
  };

  users.push(newUser);
  nextUserId++;

  return newUser;
}

function findByUsername(username) {
  return users.find((user) => user.username === username);
}
module.exports = {
  addUser,
  findByUsername,
};
