const Service = require("./Service");
const cron = require("node-cron");

function ServiceManager(serviceConfigs = []) {
  this.handleMonitor = null;
  this.services = new Map();
  // setup
  for (serviceConfig of serviceConfigs) {
    const service = new Service(serviceConfig);
    this.services.set(service.id, service);
  }
}

ServiceManager.prototype.update = function (service) {
  const hasService = this.services.has(service.id);
  if (hasService) {
    this.services.set(service.id, service);
  }
};

ServiceManager.prototype.getService = function (serviceId) {
  return this.services.get(serviceId);
};

ServiceManager.prototype.registerServices = function () {
  const services = this.services;
  for (const [serviceId, service] of services) {
    const cronCallback = async function () {
      const [status, httpResponse] = await service.monitor();
      service.addHistory(status, httpResponse);
    };

    cron.schedule(service.config.interval.value, cronCallback);
  }
};

module.exports = ServiceManager;
