import { RequestService } from "@/services/request.service";
import { RequestStatusEnum } from "@prisma/client";

export async function PUT(req: Request, { params: { id } }) {
  const requestService = new RequestService();

  const { status } = await req.json();

  if (status === RequestStatusEnum.accepted) {
    return requestService.acceptRequest({
      requestId: id,
    });
  } else {
    return requestService.refuseRequest({
      requestId: id,
    });
  }
}

export async function DELETE(req: Request, { params: { id } }) {
  const requestService = new RequestService();

  return requestService.cancelRequest({
    requestId: id,
  });
}
