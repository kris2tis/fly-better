import * as z from "zod";
export const accountSchema = z.object({
  fullName: z.string().min(5, "نام و نام خانوادگی باید حداقل ۵ کاراکتر باشد"),

  nationalCode: z.string().regex(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),

  phoneNumber: z.string().regex(/^09\d{9}$/, "شماره موبایل معتبر نیست"),

  nationality: z.string().nonempty("ملیت الزامی است"),

  gender: z.enum(["male", "female"], "جنسیت معتبر نیست"),

  dateOfBirth: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "تاریخ تولد معتبر نیست",
  }),
});
