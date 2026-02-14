import { z } from "zod";

const baseSchema = {
  origin: z.string({
    error: (iss) =>
      iss.input === undefined ? "لطفا یک مبدا انتخاب کنید" : "Invalid input.",
  }),
  destination: z.string({
    error: (iss) =>
      iss.input === undefined ? "لطفا یک مقصد انتخاب کنید" : "Invalid input.",
  }),

  flightDate: z.preprocess(
    (val) => {
      if (typeof val === "string" && val !== "") {
        const normalized = val.replace(/\//g, "-");
        return new Date(normalized);
      }
      return val;
    },
    z
      .date({
        error: (iss) => !iss.input && "لطفا یک تاریخ انتخاب کنید",
      })
      .transform((date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
      }),
  ),
  classMultiplier: z
    .enum(["Economy", "Business", "First"], {
      required_error: "لطفا کلاس پرواز را انتخاب کنید",
    })
    .default("Economy"),
  travelers: z.number().min(1, "حداقل 1 مسافر ضروری است"),
};

export const flightSearchSchema = z.discriminatedUnion("isReturnFlightDate", [
  z.object({
    ...baseSchema,
    isReturnFlightDate: z.literal("OneWay"),
    returnFlightDate: z.date().optional(),
  }),
  z.object({
    ...baseSchema,
    isReturnFlightDate: z.literal("Return"),
    returnFlightDate: z.preprocess(
      (val) => {
        if (typeof val === "string" && val !== "") {
          const normalized = val.replace(/\//g, "-");
          return new Date(normalized);
        }

        return val;
      },
      z
        .date({
          error: (iss) => !iss.input && "لطفا یک تاریخ انتخاب کنید",
        })
        .transform((date) => {
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");

          return `${year}-${month}-${day}`;
        }),
    ),
  }),
]);

export const addTravelerSchema = z.object({
  name: z
    .string({
      error: (iss) =>
        iss.input === undefined || (null && "لطفا نام را به لاتین پر کنید"),
    })
    .regex(/^[A-Za-z]+$/, {
      message: "فقط حروف انگلیسی مجاز است",
    }),
  lastName: z
    .string({
      error: (iss) =>
        iss.input === undefined ||
        (null && "لطفا نام خانوادگی را به لاتین پر کنید"),
    })
    .regex(/^[A-Za-z]+$/, {
      message: "فقط حروف انگلیسی مجاز است",
    }),
  dateOfBirth: z.preprocess(
    (val) => {
      if (!(val == "" || undefined)) {
        var date = new Date(val);
      }
      return date;
    },
    z
      .date({
        error: (iss) =>
          iss.input === undefined && "لطفا تاریخ تولد خود را انتخاب کنید",
      })
      .transform((data) => {
        return data.toLocaleDateString();
      }),
  ),
  gender: z.literal(["male", "fmale"], {
    error: (iss) =>
      iss.code === "invalid_value" && "لطفا جنسیت خود را انتخاب کنید",
  }),
  nationality: z.string({
    error: (iss) => !iss.input && "لطفا ملیت خود را انتخاب کنید",
  }),
});
