const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AgendaModule", (m) => {
  const agenda = m.contract("Agenda", [], {});
  return { agenda };
});
