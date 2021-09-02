const config = require("./config");
const Queue = require("./Queue");
const axios = require("axios");
const eventEmitter = require("./eventEmitter");
const { v4: uuid } = require("uuid");
const { serviceStatus } = require("./constants");

function Service(serviceConfig = {}) {
  this.id = uuid();
  this.name = serviceConfig.name;
  this.url = serviceConfig.url;
  this.status = serviceStatus.PENDING;
  this.history = new Queue(config.historySize);
  this.config = {
    healthyStreak: serviceConfig.healthyStreak || config.defaultHelthyStreak,
    unhealthyStreak:
      serviceConfig.unhealthyStreak || config.defaultUnhealthyStreak,
    interval: serviceConfig.interval || config.defaultInterval,
  };
  this.recipients = serviceConfig.recipients;
  this.initialized = false;
  this.createdAt = new Date();
  this.monitoredAt = new Date();
}

Service.prototype.addHistory = function (status, httpResponse) {
  this.history.enqueue(status);
  const serviceStatus = getServiceStatus(this.history);
  this.setStatus(serviceStatus, httpResponse);
};

Service.prototype.monitor = async function () {
  console.log(`monitoring service ${this.name}...`);
  console.log("service", this);
  try {
    const options = {
      url: this.url,
      method: "GET",
      timeout: config.monitorTimeout,
    };
    const response = await axios(options);
    return [
      serviceStatus.HEALTHY,
      { status: response.status, statusText: response.statusText },
    ];
  } catch (error) {
    const response = error.response || {
      status: 404,
      statusText: "Not Found",
    };
    return [
      serviceStatus.UNHEALTHY,
      { status: response.status, statusText: response.statusText },
    ];
  }
};

Service.prototype.setStatus = function (status, httpResponse) {
  if (status !== this.status) {
    this.status = status;
    this.monitoredAt = new Date();
    eventEmitter.emit("SERVICE_STATUS_CHANGE", {
      alert: {
        id: this.id,
        name: this.name,
        status: this.status,
        url: this.url,
        httpResponse: `${httpResponse.status} ${httpResponse.statusText}`,
        monitoredAt: this.monitoredAt,
      },
      recipients: this.recipients,
    });
  }
};

function getServiceStatus(history) {
  let healthyStreak = 0;
  let unhealthySteak = 0;

  history.traverseBackward(config.defaultHelthyStreak, (status) => {
    if (status === serviceStatus.HEALTHY) {
      healthyStreak++;
    }

    if (status === serviceStatus.UNHEALTHY) {
      unhealthySteak++;
    }
  });

  if (healthyStreak >= config.defaultHelthyStreak) {
    return serviceStatus.HEALTHY;
  }

  if (unhealthySteak >= config.defaultUnhealthyStreak) {
    return serviceStatus.UNHEALTHY;
  }

  return serviceStatus.PENDING;
}

module.exports = Service;
