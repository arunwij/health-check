const intervals = {
  "every-2-seconds": {
    id: "every-2-seconds",
    label: "every 2 seconds",
    value: "*/2 * * * * *",
  },
  "every-5-seconds": {
    id: "every-5-seconds",
    label: "every 5 seconds",
    value: "*/5 * * * * *",
  },
  "every-10-seconds": {
    id: "every-10-seconds",
    label: "every 10 seconds",
    value: "*/10 * * * * *",
  },
  "every-20-seconds": {
    id: "every-20-seconds",
    label: "every 20 seconds",
    value: "*/20 * * * * *",
  },
  "every-30-seconds": {
    id: "every-30-seconds",
    label: "every 30 seconds",
    value: "*/30 * * * * *",
  },
  "every-1-minute": {
    id: "every-1-minute",
    label: "every 1 minute",
    value: "* * * * *",
  },
  "every-2-minutes": {
    id: "every-2-minute",
    label: "every 2 minutes",
    value: "*/2 * * * *",
  },
  "every-3-minutes": {
    id: "every-3-minute",
    label: "every 3 minutes",
    value: "*/3 * * * *",
  },
  "every-5-minutes": {
    id: "every-5-minute",
    label: "every 5 minutes",
    value: "*/5 * * * *",
  },
  "every-10-minutes": {
    id: "10-minute",
    label: "every 10 minutes",
    value: "*/10 * * * *",
  },
  "once-a-day": {
    id: "once-a-day",
    label: "once a day",
    value: "0 0 * * *",
  },
  "once-a-week": {
    id: "once-a-week",
    label: "once a week",
    value: "0 0 * * 0",
  },
  "once-a-month": {
    id: "once-a-month",
    label: "once a month",
    value: "0 0 1 * *",
  },
};

const config = {
  intervals,
  defaultInterval: intervals["every-1-minute"],
  historySize: 5,
  defaultHelthyStreak: 3,
  defaultUnhealthyStreak: 3,
  monitorTimeout: 10000,
};

module.exports = config;
