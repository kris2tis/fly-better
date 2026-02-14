import { headers } from "next/headers";
import { auth } from "../../../../lib/auth";
import { accountSchema } from "../schema/account.schema";
import { flattenError } from "zod";
import prisma from "../../../../lib/prisma";
export async function UpdateAccountData(data) {
  const validationResult = accountSchema.safeParse(data);
  if (!validationResult.success) {
    const errorsOBJ = flattenError(validationResult.error);
    let errorsARY = [];
    for (const key in errorsOBJ.fieldErrors) {
      errorsARY.push({ field: key, errorMessage: errorsOBJ.fieldErrors[key][0] });
    }
    throw {
      message: "خطا در اعتبار سنجی فیلد ها",
      status: 400,
      data: errorsARY,
    };
  } else {
    const userData = await auth.api.getSession({ headers: await headers() });
    const userId = userData?.user?.id || null;

    if (!userId) throw { status: 401, message: "لطفا وارد سایت شوید !" };
    try {
      await prisma.user.update({ where: { id: userId }, data: data });
      return { status: 200, message: "اطلاعات با موفقیت بروز شدند" };
    } catch (error) {
      console.log("__________ services error : ", error);
    }
  }
}
