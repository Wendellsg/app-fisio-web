import { getSession } from "@/lib/auth.guard";
import prisma from "@/lib/prisma";
import { AppointmentStatusEnum } from "@prisma/client";
export class AppointmentsService {
  constructor() {}

  async create(createAppointmentDto: {
    professionalId: string;
    patientId: string;
    startDate: Date;
    endDate: Date;
    status: AppointmentStatusEnum;
  }) {
    try {
      const professional = await prisma?.professional.findUnique({
        where: { id: createAppointmentDto.professionalId },
      });

      if (!professional) {
        return Response.json(
          {
            message: "Profissional não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      const patient = await prisma?.user.findUnique({
        where: { id: createAppointmentDto.patientId },
      });

      if (!patient) {
        return Response.json(
          {
            message: "Paciente não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      prisma?.appointment.create({
        data: {
          professionalId: createAppointmentDto.professionalId,
          patientId: createAppointmentDto.patientId,
          startDate: createAppointmentDto.startDate,
          endDate: createAppointmentDto.endDate,
          status: createAppointmentDto.status,
        },
      });
      return Response.json(
        {
          message: "Agendamento criado com sucesso",
        },
        {
          status: 201,
        }
      );
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao criar agendamento",
          error,
        },
        {
          status: 500,
        }
      );
    }
  }

  findAll() {
    return `This action returns all appointments`;
  }

  async findByProfessional({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) {
    try {
      const session = getSession();

      const professional = await prisma?.professional.findUnique({
        where: { userId: session?.id },
      });

      if (!professional) {
        return Response.json(
          {
            message: "Profissional não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      return await prisma?.appointment.findMany({
        where: {
          professionalId: professional.id,
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
        },
        include: {
          patient: {
            select: {
              name: true,
              image: true,
              id: true,
              email: true,
            },
          },
          professional: {
            select: {
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao buscar agendamentos",
          error,
        },
        {
          status: 500,
        }
      );
    }
  }

  async findByPatient({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) {
    try {
      const session = getSession();

      return await prisma?.appointment.findMany({
        where: {
          patientId: session?.id,
          startDate: {
            gte: startDate,
          },
          endDate: {
            lte: endDate,
          },
        },
      });
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao buscar agendamentos",
          error,
        },
        {
          status: 500,
        }
      );
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} appointment`;
  }

  async update(
    id: string,
    updateAppointmentDto: {
      professionalId: string;
      patientId: string;
      startDate: Date;
      endDate: Date;
      status: AppointmentStatusEnum;
    }
  ) {
    try {
      const session = getSession();

      const professional = await prisma?.professional.findUnique({
        where: { userId: session?.id },
      });

      if (!professional) {
        return Response.json(
          {
            message: "Profissional não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      const appointment = await prisma?.appointment.findUnique({
        where: { id },
      });

      if (!appointment || appointment.professionalId !== professional.id) {
        return Response.json(
          {
            message: "Não autorizado",
          },
          {
            status: 401,
          }
        );
      }

      return await prisma?.appointment.update({
        where: { id },
        data: updateAppointmentDto,
      });
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao atualizar agendamento",
          error,
        },
        {
          status: 500,
        }
      );
    }
  }

  async remove(id: string) {
    try {
      const session = getSession();

      const professional = await prisma?.professional.findUnique({
        where: { userId: session?.id },
      });

      if (!professional) {
        return Response.json(
          {
            message: "Profissional não encontrado",
          },
          {
            status: 404,
          }
        );
      }

      return await prisma?.appointment.delete({
        where: { id },
      });
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao deletar agendamento",
          error,
        },
        {
          status: 500,
        }
      );
    }
  }
}
