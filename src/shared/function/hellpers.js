import { app } from "@/httpServices";
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

export const getFlight = async (id) => {
  return await app.get(`/flight/book/${id}`).then(({ data }) => data.data);
};
