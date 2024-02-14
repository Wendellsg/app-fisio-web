import { getSession } from "@/lib/auth.guard";
import { HttpStatusCode } from "@/lib/http";
import prisma from "@/lib/prisma";
import { RequestStatusEnum } from "@prisma/client";

export class RequestService {
  async createRequest({ patientId }) {
    if (!patientId) {
      return Response.json(
        { message: "Corpo da requisição não enviado" },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const session = getSession();

    const professional = await prisma?.professional.findUnique({
      where: {
        userId: session?.id,
      },
    });

    if (!professional) {
      return Response.json(
        { message: "Profissional não encontrado" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const patient = await prisma?.user.findUnique({
      where: {
        id: patientId,
      },
    });

    if (!patient) {
      return Response.json(
        { message: "Paciente não encontrado" },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    const existRequest = await prisma?.request.findFirst({
      where: {
        userId: patient.id,
        professionalId: professional.id,
      },
    });

    if (existRequest) {
      return Response.json(
        { message: "Você já enviou uma requisição para este paciente" },
        {
          status: HttpStatusCode.BAD_REQUEST,
        }
      );
    }

    try {
      await prisma?.request.create({
        data: {
          userId: patient.id,
          professionalId: professional.id,
        },
      });

      return Response.json(
        { message: "Requisição criada com sucesso" },
        {
          status: HttpStatusCode.OK,
        }
      );
    } catch (error) {
      return Response.json(
        { message: "Erro ao criar requisição" },
        {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }

  async getProfessionalRequests() {
    const session = getSession();

    const professional = await prisma?.professional.findUnique({
      where: {
        userId: session?.id,
      },
    });

    if (!professional) {
      return Response.json(
        { message: "Profissional não encontrado" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const requests = await prisma?.request.findMany({
      where: {
        professionalId: professional.id,
        AND: {
          OR: [
            {
              status: RequestStatusEnum.pending,
            },
            {
              status: RequestStatusEnum.rejected,
            },
          ],
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            id: true,
            image: true,
          },
        },
      },
    });

    return requests;
  }

  async acceptRequest({ requestId }) {
    if (!requestId) {
      return Response.json(
        { message: "Corpo da requisição não enviado" },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const session = getSession();

    const user = await prisma?.user.findUnique({
      where: {
        id: session?.id,
      },
    });

    if (!user) {
      return Response.json(
        { message: "Usuário não encontrado" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const request = await prisma?.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return Response.json(
        { message: "Requisição não encontrada" },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    try {
      await prisma?.request.update({
        where: {
          id: requestId,
        },
        data: {
          status: RequestStatusEnum.accepted,
        },
      });

      await prisma?.professional.update({
        where: {
          id: request.professionalId,
        },
        data: {
          patients: {
            connect: {
              id: request.userId,
            },
          },
        },
      });

      return Response.json(
        { message: "Requisição aceita com sucesso" },
        {
          status: HttpStatusCode.OK,
        }
      );
    } catch (error) {
      return Response.json(
        { message: "Erro ao aceitar requisição" },
        {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }

  async refuseRequest({ requestId }) {
    if (!requestId) {
      return Response.json(
        { message: "Corpo da requisição não enviado" },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const session = getSession();

    const user = await prisma?.user.findUnique({
      where: {
        id: session?.id,
      },
    });

    if (!user) {
      return Response.json(
        { message: "Usuário não encontrado" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const request = await prisma?.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return Response.json(
        { message: "Requisição não encontrada" },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    try {
      await prisma?.request.update({
        where: {
          id: requestId,
        },
        data: {
          status: RequestStatusEnum.rejected,
        },
      });

      return Response.json(
        { message: "Requisição recusada com sucesso" },
        {
          status: HttpStatusCode.OK,
        }
      );
    } catch (error) {
      return Response.json(
        { message: "Erro ao recusar requisição" },
        {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }

  async getPatientRequests() {
    const session = getSession();

    const user = await prisma?.user.findUnique({
      where: {
        id: session?.id,
      },
    });

    if (!user) {
      return Response.json(
        { message: "Usuário não encontrado" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const requests = await prisma?.request.findMany({
      where: {
        userId: user.id,
      },
      include: {
        professional: true,
      },
    });

    return requests;
  }

  async cancelRequest({ requestId }) {
    if (!requestId) {
      return Response.json(
        { message: "Corpo da requisição não enviado" },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const session = getSession();

    const user = await prisma?.user.findUnique({
      where: {
        id: session?.id,
      },
    });

    const professional = await prisma?.professional.findUnique({
      where: {
        userId: session?.id,
      },
    });

    if (!user && !professional) {
      return Response.json(
        { message: "Você não tem permissão para excluir esta requisição" },
        {
          status: HttpStatusCode.UNAUTHORIZED,
        }
      );
    }

    const request = await prisma?.request.findUnique({
      where: {
        id: requestId,
      },
    });

    if (!request) {
      return Response.json(
        { message: "Requisição não encontrada" },
        {
          status: HttpStatusCode.NOT_FOUND,
        }
      );
    }

    try {
      await prisma?.request.delete({
        where: {
          id: requestId,
        },
      });

      return Response.json(
        { message: "Requisição cancelada com sucesso" },
        {
          status: HttpStatusCode.OK,
        }
      );
    } catch (error) {
      return Response.json(
        { message: "Erro ao cancelar requisição" },
        {
          status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        }
      );
    }
  }
}
