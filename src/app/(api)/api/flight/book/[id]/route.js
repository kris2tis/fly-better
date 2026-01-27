import prisma from "../../../../../../lib/prisma";

export async function GET(request, { params }) {
  const { id } = await params;
  const flight = await prisma.trip.findUnique({ where: { id: id } , include:{Route:true}});

  return Response.json({ data: flight }, { status: 200 });
}
