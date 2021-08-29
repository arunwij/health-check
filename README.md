# Health Check
health-check is HTTP service health monitor. We'll notify you when your application health status changes.

## Installation
```
npm install @arunwij/health-check
```
## Usage
```
const { HealthCheck, intervals } = require('@arunwij/health-check');

// specify service details
const serviceConfigs = [
    {
        name: "My Service 1",
        url: "https://my-service-1-url.com/health",
        interval: intervals["5-second"],
        recipients: ["notify-user1@example.com", "notify-user2@example.com"]
    },
    {
        name: "My Service 2",
        url: "http://localhost:3000",
        interval: intervals["1-minute"],
        recipients: ["notify-user1@example.com"]
    }
]

// specify email server configs
const emailConfig = {
    from: "from-email@myemail.com",
    host: "smtp-host-url",
    port: "smtp-port",
    auth: {
        user: "username",
        pass: "password"
    }
}

const healthCheck = new HealthCheck(serviceConfigs, emailConfig);
healthCheck.monitor();
```
## Monitoring Alert Preview
[![Screenshot-2021-08-29-at-19-41-51-Mailtrap-Safe-Email-Testing.png](https://i.postimg.cc/FRZxqTTz/Screenshot-2021-08-29-at-19-41-51-Mailtrap-Safe-Email-Testing.png)](https://postimg.cc/njX79Gbf)

## Periodic Health Check Service Status
This feature sends periodic emails for recipients to make sure the health check service is running without issue.
```
const periodicStatusAlertConfig = {
  interval: intervals["every-5-seconds"],
  recipients: ["arunaswj@gmail.com"],
};

healthCheck.sendPeriodicServiceStatus({
  interval: intervals["once-a-day"],
  recipients: ["notify-user1@example.com"],
});
```
## Periodic Health Check Service Status Preview
[![Screenshot-2021-08-29-at-19-53-51.png](https://i.postimg.cc/ZRML4Whz/Screenshot-2021-08-29-at-19-53-51.png)](https://postimg.cc/N9RXxfMd)