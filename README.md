# Health Check
health-check is HTTP service health monitor. We'll notify you when your application health status changes.

## Installation
```
npm install health-check
```
## Usage
```
const {Health, intervals} = require('health-check');

// specify service details
const serviceConfigs = [
    {
        name: "My Service 1",
        url: "https://my-service-1-url.com/health",
        interval: intervals["5-second"]
        recipients: ["notify-user1@example.com", "notify-user2@example.com"]
    },
    {
        name: "My Service 2",
        url: "http://localhost:3000",
        interval: intervals["1-minute"]
        recipients: ["notify-user1@example.com"]
    }
]

// specify email server configs
const emailConfigs = {
    from: "from-email@myemail.com",
    host: "smtp-host-url",
    port: "smtp-port",
    auth: {
        user: "username",
        pass: "password"
    }
}

const healthCheck = new HealthCheck(serviceConfig, emailConfig);
healthcheck.monitor();
```