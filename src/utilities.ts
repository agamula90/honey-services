export function getImagePath(assetImagePath: string) {
  return `https://elasticbeanstalk-eu-central-1-306070261283.s3.eu-central-1.amazonaws.com/public/${assetImagePath}`;
}

const months = [
    "січня",
    "лютого",
    "березня",
    "квітня",
    "травня",
    "червня",
    "липня",
    "серпня",
    "вересня",
    "жовтня",
    "листопада",
    "грудня",
];

export function formatDateAsShortString(date: Date) {
  let month = months[date.getUTCMonth()].substring(0, 3);
  return `${date.getDate()} ${month}. ${date.getFullYear()}`;
}

export function formatDateAsLongString(date: Date) {
  let month = months[date.getUTCMonth()];
  let hours = date.getHours().toString();
  if (Number(hours) < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes().toString();
  if (Number(minutes) < 10) {
    minutes = `0${minutes}`;
  }
  return `${date.getDate()} ${month} ${date.getFullYear()} в ${hours}:${minutes}`;
}