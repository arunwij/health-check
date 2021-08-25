const ServiceManager = require("./ServiceManager");
const ServiceStatusAlert = require("./ServiceStatusAlert");
const config = require("./config");
const eventEmitter = require("./eventEmitter");
const mailer = require("./mailer");
const { serviceStatus } = require("./constants");

//
async function handleServiceStatusChange({ alert, recipients }) {
  if (alert.status !== serviceStatus.PENDING) {
    console.log(alert);
    const serviceStatusAlert = new ServiceStatusAlert(alert, recipients);
    await serviceStatusAlert.notify();
  }
}

function setup(emailConfigs) {
  mailer.setup(emailConfigs);
  eventEmitter.on("SERVICE_STATUS_CHANGE", handleServiceStatusChange);
}

function HealthCheck(serviceConfigs = [], emailConfigs = {}) {
  this.serviceManager = new ServiceManager(serviceConfigs);
  setup(emailConfigs);
}

HealthCheck.prototype.monitor = function () {
  this.serviceManager.monitor();
};

module.exports = {
  HealthCheck,
  intervals: config.intervals,
};
