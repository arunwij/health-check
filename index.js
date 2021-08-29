const ServiceManager = require("./ServiceManager");
const ServiceStatusAlert = require("./ServiceStatusAlert");
const config = require("./config");
const eventEmitter = require("./eventEmitter");
const mailer = require("./mailer");
const cron = require("node-cron");
const pug = require("pug");
const path = require("path");
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
  this.serviceManager.registerServices();
};

HealthCheck.prototype.sendPeriodicServiceStatus = function ({
  interval = "",
  recipients = [],
}) {
  const template = pug.compileFile(
    path.resolve(__dirname, "./templates/HealthCheckPeriodicStatus.pug")
  );

  const html = template({
    timestamp: new Date(),
    period: interval.label,
  });

  const cronCallback = () => {
    mailer.send("Health Check - Periodic Service Status", html, "", recipients);
    console.log("Periodic Status Alert Sent");
  };

  cron.schedule(interval.value, cronCallback);
};

module.exports = {
  HealthCheck,
  intervals: config.intervals,
};
