const { time, loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Agenda", function () {
  async function deployAgendaFixture() {
    const [owner, otherAccount] = await ethers.getSigners();
    const Agenda = await ethers.getContractFactory("Agenda");
    const agenda = await Agenda.deploy();
    return { agenda, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should deploy the contract successfully", async function () {
      const { agenda } = await loadFixture(deployAgendaFixture);
      expect(agenda.address).to.be.properAddress;
    });
  });

  describe("Appointments", function () {
    it("Should allow adding an appointment", async function () {
      const { agenda, owner } = await loadFixture(deployAgendaFixture);
      const description = "Meeting with team";
      const timestamp = (await time.latest()) + 3600; // 1 hour in the future

      await expect(agenda.addAppointment(description, timestamp))
        .to.emit(agenda, "AppointmentAdded")
        .withArgs(owner.address, description, timestamp);
    });

    it("Should revert if description is empty", async function () {
      const { agenda } = await loadFixture(deployAgendaFixture);
      const timestamp = (await time.latest()) + 3600;

      await expect(agenda.addAppointment("", timestamp)).to.be.revertedWith("Description cannot be empty");
    });

    it("Should revert if timestamp is in the past", async function () {
      const { agenda } = await loadFixture(deployAgendaFixture);
      const pastTimestamp = (await time.latest()) - 3600;

      await expect(agenda.addAppointment("Past event", pastTimestamp)).to.be.revertedWith("Invalid timestamp");
    });

    it("Should return the correct appointments for a user", async function () {
      const { agenda, owner } = await loadFixture(deployAgendaFixture);
      const description = "Doctor appointment";
      const timestamp = (await time.latest()) + 7200; // 2 hours in the future

      await agenda.addAppointment(description, timestamp);
      const appointments = await agenda.getAppointments();

      expect(appointments.length).to.equal(1);
      expect(appointments[0].description).to.equal(description);
      expect(appointments[0].timestamp).to.equal(timestamp);
    });
  });
});
