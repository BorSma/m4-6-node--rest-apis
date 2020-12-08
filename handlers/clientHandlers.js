const { v4: uuidv4 } = require("uuid");
const { clients } = require("../data/clients");

// write your handlers here...

const clientsList = (req, res) => {
  res.status(200).json({ status: 200, data: clients });
};

const clientById = (req, res) => {
  let client = clients.filter((client) => client.id === req.params.id);
  if (client.length > 0) res.status(200).json({ status: 200, data: client });
  else
    res.status(200).json({ status: 200, data: "No client by that id found" });
};

const clientAdd = (req, res) => {
  let clientLocationArr = clients.map((client) => {
    if (client.email === req.body.email) return 1;
    else return 0;
  });
  let clientLocation = clientLocationArr.indexOf(1);
  if (clientLocation === -1) {
    let entry = {};
    entry.id = uuidv4();
    entry.isActive = req.body.isActive;
    entry.age = req.body.age;
    entry.name = req.body.name;
    entry.gender = req.body.gender;
    entry.company = req.body.company;
    entry.email = req.body.email;
    entry.phone = req.body.phone;
    entry.address = req.body.address;
    clients.push(entry);
    res.status(200).json({ status: 200, data: clients });
  } else
    res
      .status(200)
      .json({ status: 200, data: "Client already exists in the system" });
};

const clientDel = (req, res) => {
  let clientLocationArr = clients.map((client) => {
    if (client.id === req.body.id) return 1;
    else return 0;
  });
  let clientLocation = clientLocationArr.indexOf(1);
  if (clientLocation >= 0) {
    if (clients[clientLocation].id === req.body.id) {
      clients.splice(clientLocation, 1);
      res.status(200).json({ status: 200, data: clients });
    }
  } else res.status(200).json({ status: 200, data: `No Client by that ID` });
};


module.exports = { clientsList, clientById, clientAdd, clientDel};
