// abcd1234: $2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm
let users = [
  {
    id: "1",
    username: "bob",
    password: "$2b$12$G9xf8SFq3oTEgdj7ozHQ/uhDOyeQcUEDU8tnOcvpvApuadr3nE5Vm",
    name: "Bob",
    email: "bob@gmail.com",
    url: "https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png",
  },
  {
    id: "2",
    username: "sakao34",
    password: "$2b$10$W7ubDmrq5Bc9mUaBsALwJ.W2WzUXeGcsTtp.IXO0tUJkESjzJG602",
    name: "Gunho",
    email: "hoyahoya0517@naver.com",
    url: "https://res.cloudinary.com/hoyahoya/image/upload/v1694054107/2023fw/3d63615ef5594_atozbp_wsrvrv.jpg",
  },
];

export async function findByUsername(username) {
  return users.find((user) => user.username === username);
}

export async function findById(id) {
  return users.find((user) => user.id === id);
}

export async function createUser(user) {
  const created = { ...user, id: Date.now().toString() };
  users.push(created);
  return created.id;
}
