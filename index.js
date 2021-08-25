const ServiceManager = require("./ServiceManager");
const ServiceStatusAlert = require("./ServiceStatusAlert");
const config = require("./config");
const eventEmitter = require("./eventEmitter");

//
function HealthCheck(serviceConfigs = []) {
  this.serviceManager = new ServiceManager(serviceConfigs);
  this.eventEmitter = eventEmitter.on(
    "SERVICE_STATUS_CHANGE",
    async function ({ alert, recipients }) {
      console.log(alert);
      const serviceStatusAlert = new ServiceStatusAlert(alert, recipients);
      await serviceStatusAlert.notify();
    }
  );
}

HealthCheck.prototype.monitor = function () {
  this.serviceManager.monitor();
};

// sample service config
// const recipients = ["arunaswj@gmail.com"];
// const serviceConfigs = [
//   {
//     name: "My Service 1",
//     url: "http://localhost:3000/health",
//     recipients: recipients,
//   },
//   {
//     name: "My Service 2",
//     url: "http://localhost:3001/health",
//     recipients: recipients,
//     interval: config.intervals["5-second"],
//   },
// ];

module.exports = {
  HealthCheck,
  intervals: config.intervals,
};
