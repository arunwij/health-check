const intervals = {
  "2-second": {
    id: "2-second",
    label: "2 seconds",
    value: "*/2 * * * * *",
  },
  "5-second": {
    id: "5-second",
    label: "5 seconds",
    value: "*/5 * * * * *",
  },
  "10-second": {
    id: "10-second",
    label: "10 seconds",
    value: "*/10 * * * * *",
  },
  "20-second": {
    id: "20-second",
    label: "20 seconds",
    value: "*/20 * * * * *",
  },
  "30-second": {
    id: "30-second",
    label: "30 seconds",
    value: "*/30 * * * * *",
  },
  "1-minute": {
    id: "1-minute",
    label: "1 minute",
    value: "* * * * *",
  },
  "2-minute": {
    id: "2-minute",
    label: "2 minutes",
    value: "*/2 * * * *",
  },
  "3-minute": {
    id: "3-minute",
    label: "3 minutes",
    value: "*/3 * * * *",
  },
  "5-minute": {
    id: "5-minute",
    label: "5 minutes",
    value: "*/5 * * * *",
  },
  "10-minute": {
    id: "10-minute",
    label: "10 minutes",
    value: "*/10 * * * *",
  },
};

const config = {
  intervals,
  defaultInterval: intervals["2-second"],
  historySize: 5,
  defaultHelthyStreak: 3,
  defaultUnhealthyStreak: 3,
  monitorTimeout: 10000,
  mail: {
    host: "your-host",
    port: "port",
    auth: {
      user: "",
      pass: "",
    },
  },
};

module.exports = config;
