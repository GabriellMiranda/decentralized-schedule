// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Agenda {
    struct Appointment {
        string description;
        uint256 timestamp;
    }

    Appointment[] private appointments;
    mapping(address => Appointment[]) private userAppointments;

    event AppointmentAdded(address indexed user, string description, uint256 timestamp);

    function addAppointment(string calldata _description, uint256 _timestamp) external {
        require(bytes(_description).length > 0, "Description cannot be empty");
        require(_timestamp > block.timestamp, "Invalid timestamp");

        Appointment memory newAppointment = Appointment(_description, _timestamp);
        userAppointments[msg.sender].push(newAppointment);
        appointments.push(newAppointment);

        emit AppointmentAdded(msg.sender, _description, _timestamp);
    }

    function getAppointments() external view returns (Appointment[] memory) {
        return userAppointments[msg.sender];
    }
}
