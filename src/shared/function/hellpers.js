import moment from "jalali-moment";

export const changeDateToJalaaliDate = (date) => {
  return moment(date, "YYYY/MM/DD").locale("fa").format("YYYY/MM/DD");
};

export const converToSecound = (time) => {
  var hms = time;
  var a = hms.split(":");

  var seconds = +a[0] * 60 * 60 + +a[1] * 60;

  return seconds;
};

export const convertSecondToTime = (seconds) => {
  var date = new Date(0);
  date.setSeconds(seconds);
  var timeString = date.toISOString().substring(11, 19);
  return timeString;
};

export const convertDateToJalali = (date, format) => {
  if (!date || !format) throw new Error("تاریخ یا فرمت را وارد نکرده اید");
  let d = moment(date, "YYYY-MM-DD").locale("fa").format(format);
  return d;
};

export function getTimeDifference(time1, time2) {
  const [h1, m1] = time1.split(":").map(Number);
  const [h2, m2] = time2.split(":").map(Number);

  const totalMinutes1 = h1 * 60 + m1;
  const totalMinutes2 = h2 * 60 + m2;

  let diff = Math.abs(totalMinutes1 - totalMinutes2);

  const hours = Math.floor(diff / 60);
  const minutes =  diff % 60;;

  const format = `${hours ?   `${hours} ساعت` : ""} ${minutes ? ` و ${minutes} دقیقه` : ""}`;
  return format;
}
