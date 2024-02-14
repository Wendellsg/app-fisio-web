import { getSession } from "@/lib/auth.guard";
import { HttpStatusCode } from "@/lib/http";
import prisma from "@/lib/prisma";
import {
  Prisma,
  Routine,
  RoutineFrequencyTypeEnum,
  RoutinePeriodEnum,
  User,
} from "@prisma/client";
import * as bcrypt from "bcrypt";

export class UsersService {
  constructor() {}
  async create(
    createUserDto: Prisma.UserCreateInput
  ): Promise<User | Response> {
    if (!createUserDto.email || !createUserDto.name) {
      return Response.json(
        {
          message: "Email ou senha não informados",
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    const findUser = await prisma.user.findUnique({
      where: {
        email: createUserDto.email,
      },
    });

    if (findUser) {
      return Response.json(
        {
          message: "Usuário já cadastrado",
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );
    }

    try {
      if (!createUserDto.password) {
        // random password
        createUserDto.password = Math.random().toString(36).slice(-8);
      }

      const encripted = bcrypt.hashSync(createUserDto.password, 10);

      const user = await prisma.user.create({
        data: {
          name: createUserDto.name,
          email: createUserDto.email,
          password: encripted,
        },
      });

      return user;
    } catch (error) {
      return Response.json(
        {
          message: "Erro ao criar usuário",
          error,
        },
        { status: HttpStatusCode.INTERNAL_SERVER_ERROR }
      );
    }
  }

  async updateProfileImage(userId: string, profileImage: string) {
    if (!profileImage)
      return {
        status: HttpStatusCode.BAD_REQUEST,
        message: "Imagem não informada",
      };

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          image: profileImage,
        },
      });

      return {
        message: "User updated",
        user: updatedUser,
      };
    } catch (error) {
      return {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Erro ao atualizar imagem",
      };
    }
  }

  findAll() {
    return prisma.user.findMany();
  }

  async findOne(id: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
    });

    if (!user)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    user.password = "";
    user.resetPasswordToken = "";
    return {
      message: "Usuário encontrado",
      status: HttpStatusCode.OK,
      data: user,
    };
  }

  async findPatients(id: string) {
    const user = await prisma.professional.findFirst({
      where: {
        id: id,
      },
      include: {
        patients: true,
      },
    });

    if (!user)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    return user.patients.map((patient) => {
      return patient;
    });
  }

  async findUserProfessionals(id: string) {
    const professionals = await prisma.professional.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!professionals)
      return {
        message: "Profissionais não encontrados",
        status: HttpStatusCode.NOT_FOUND,
      };

    return professionals;
  }

  async getPatient(patientId: string) {
    const patient = await prisma.user.findFirst({
      where: {
        id: patientId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        weight: true,
        height: true,
        routines: {
          select: {
            professional: {
              select: {
                id: true,
              },
            },
            activities: true,
            exercise: {
              select: {
                id: true,
                name: true,
                description: true,
                image: true,
              },
            },
            id: true,
            description: true,
            frequency: true,
            frequencyType: true,
            period: true,
            repetitions: true,
            series: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });

    if (!patient)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    return {
      message: "Usuário encontrado",
      status: HttpStatusCode.OK,
      data: patient,
    };
  }

  async addPatientToProfessional(professionalId: string, patientId: string) {
    const professional = await prisma.professional.findFirst({
      where: {
        id: professionalId,
      },
      include: {
        patients: true,
      },
    });

    if (!professional)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    if (professional.patients.find((patient) => patient.id === patientId))
      return {
        message: "Paciente já adicionado",
        status: HttpStatusCode.BAD_REQUEST,
      };

    const patient = await prisma.user.findFirst({
      where: {
        id: patientId,
      },
      select: {
        professionals: true,
      },
    });

    if (!patient)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    const updatedUser = await prisma.professional.update({
      where: {
        id: professionalId,
      },
      data: {
        patients: {
          connect: {
            id: patientId,
          },
        },
      },
    });

    return {
      message: "User updated",
      data: updatedUser,
    };
  }

  async updatePatient(patient: Partial<User>) {
    try {
      await prisma.user.update({
        where: {
          id: patient.id,
        },
        data: { ...patient },
      });

      return {
        message: "User updated",
        status: HttpStatusCode.OK,
      };
    } catch (error) {
      return {
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
        message: "Erro ao atualizar usuário",
      };
    }
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email },
      select: { id: true, name: true, email: true, image: true },
    });
    return user;
  }

  async update(id: string, updateUserDto: Prisma.UserUpdateInput) {
    delete updateUserDto.password;
    delete updateUserDto.email;
    delete updateUserDto.resetPasswordToken;

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          ...updateUserDto,
        },
      });

      return {
        message: "User updated",
        data: updatedUser,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao atualizar usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async addPatient(professionalId: string, patientId: string) {
    const professional = await prisma.professional.findFirst({
      where: {
        id: professionalId,
      },

      include: {
        patients: true,
      },
    });

    if (!professional)
      throw Response.json(
        {
          message: "Profissional não encontrado",
        },
        { status: HttpStatusCode.NOT_FOUND }
      );

    if (professional.patients.find((patient) => patient.id === patientId))
      throw Response.json(
        {
          message: "Paciente já adicionado",
        },
        { status: HttpStatusCode.BAD_REQUEST }
      );

    const patient = await prisma.user.findFirst({
      where: {
        id: patientId,
      },
      select: {
        professionals: true,
      },
    });

    if (!patient)
      throw Response.json(
        {
          message: "Paciente não encontrado",
        },
        { status: HttpStatusCode.NOT_FOUND }
      );

    await prisma.professional.update({
      where: {
        id: professionalId,
      },
      data: {
        patients: {
          connect: {
            id: patientId,
          },
        },
      },
    });

    return {
      message: "User updated",
    };
  }

  async getPatients() {
    const session = getSession();

    const professional = await prisma?.professional.findUnique({
      where: {
        id: session?.id,
      },
    });

    const patients = await prisma?.user.findMany({
      where: {
        professionals: {
          some: {
            id: professional?.id,
          },
        },
      },

      select: {
        id: true,
        name: true,
        image: true,
        email: true,
      },
    });

    return patients;
  }

  async removePatient(id: string, patientId: string) {
    try {
      // Carregar o usuário com seus pacientes
      const user = await prisma.professional.findFirst({
        where: {
          id: id,
        },
        include: {
          patients: true,
        },
      });

      if (!user)
        return {
          message: "Usuário não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };

      // Encontrar o paciente que precisa ser removido
      const patientToRemove = user.patients.find(
        (patient) => patient.id === patientId
      );

      if (!patientToRemove)
        return {
          message: "Paciente não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };
      // Remover o paciente da lista de pacientes do profissional
      await prisma.professional.update({
        where: {
          id: id,
        },
        data: {
          patients: {
            disconnect: {
              id: patientId,
            },
          },
        },
      });

      return {
        message: "User updated",
        status: HttpStatusCode.OK,
      };
    } catch (error) {
      return {
        message: "Erro ao atualizar usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async addFavoriteExercise(id: string, exerciseId: string) {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        favoriteExercises: true,
      },
    });

    if (!user)
      return {
        message: "Usuário não encontrado",
        status: HttpStatusCode.NOT_FOUND,
      };

    if (user.favoriteExercises.find((exercise) => exercise.id === exerciseId))
      return {
        message: "Este exercício já está em sua lista de favoritos",
        status: HttpStatusCode.BAD_REQUEST,
      };

    try {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          favoriteExercises: {
            connect: {
              id: exerciseId,
            },
          },
        },
      });

      return {
        message: "User updated",
        data: updatedUser,
      };
    } catch (error) {
      return {
        message: "Erro ao atualizar usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async removeFavoriteExercise(id: string, exerciseId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
        include: {
          favoriteExercises: true,
        },
      });

      if (!user)
        return {
          message: "Usuário não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          favoriteExercises: {
            disconnect: {
              id: exerciseId,
            },
          },
        },
      });

      return {
        message: "User updated",
        data: updatedUser,
      };
    } catch (error) {
      return {
        message: "Erro ao remover exercício favorito",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async createRoutine(id: string, routine: Routine, professionalId: string) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });
      if (!user)
        return {
          message: "Usuário não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };
      const professional = await prisma.professional.findFirst({
        where: {
          id: professionalId,
        },
      });

      if (!professional)
        return {
          message: "Profissional não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };

      const exercise = await prisma.exercise.findFirst({
        where: {
          id: routine.exerciseId,
        },
      });

      if (!exercise)
        return {
          message: "Exercício não encontrado",
          status: HttpStatusCode.NOT_FOUND,
        };
      await prisma.routine.create({
        data: {
          professionalId: professionalId,
          userId: id,
          exerciseId: routine.exerciseId,
          description: routine.description,
          frequency: routine.frequency,
          frequencyType: RoutineFrequencyTypeEnum[routine.frequencyType],
          period: RoutinePeriodEnum[routine.period],
          repetitions: routine.repetitions,
          series: routine.series,
        },
      });

      return {
        message: "User updated",
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao criar rotina",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async getRoutines(userId: string) {
    try {
      const routines = await prisma.routine.findMany({
        where: {
          user: {
            id: userId,
          },
        },
        select: {
          id: true,
          description: true,
          frequency: true,
          frequencyType: true,
          period: true,
          repetitions: true,
          series: true,
          exercise: {
            select: {
              id: true,
              name: true,
              description: true,
              summary: true,
              image: true,
              video: true,
            },
          },
          professional: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                  image: true,
                },
              },
            },
          },
          user: {
            select: {
              id: true,
            },
          },
          activities: {
            select: {
              id: true,
              date: true,
              comments: true,
              effortLevel: true,
              painLevel: true,
              createdAt: true,
            },
          },
        },
      });

      return routines;
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao buscar rotinas",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async updateRoutine(
    id: string,
    routineId: string,
    routine: Prisma.RoutineUpdateInput
  ) {
    try {
      const updatedUser = await prisma.routine.update({
        where: {
          id: routineId,
        },
        data: {
          ...routine,
        },
      });

      return {
        message: "User updated",
        user: updatedUser,
      };
    } catch (error) {
      return {
        message: "Erro ao atualizar rotina",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async createActivity(createActivityDto: Prisma.ActivityCreateInput) {
    try {
      await prisma.activity.create({
        data: {
          date: new Date(createActivityDto.date),
          comments: createActivityDto.comments,
          effortLevel: createActivityDto.effortLevel,
          painLevel: createActivityDto.painLevel,
          routine: createActivityDto.routine,
        },
      });

      return {
        message: "Atividade criada com sucesso",
        status: HttpStatusCode.OK,
      };
    } catch (error) {
      console.log(error);
      return {
        message: "Erro ao criar atividade",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async removeActivity(id: string, routineId: string, activityId: string) {
    try {
      const activity = await prisma.activity.findFirst({
        where: {
          id: activityId,
        },
        select: {
          id: true,
          routine: {
            select: {
              user: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      });

      if (!activity)
        return {
          message: "Atividade não encontrada",
          status: HttpStatusCode.NOT_FOUND,
        };

      if (activity.routine.user.id !== id)
        return {
          message: "Você não tem permissão para remover esta atividade",
          status: HttpStatusCode.FORBIDDEN,
        };

      await prisma.activity.delete({
        where: {
          id: activityId,
        },
      });

      return {
        message: "Atividade removida com sucesso",
        status: HttpStatusCode.OK,
      };
    } catch (error) {
      return {
        message: "Erro ao remover atividade",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }

  async remove(id: string) {
    try {
      await prisma.user.delete({
        where: {
          id,
        },
      });
      return {
        message: "Usuário removido com sucesso",
        status: HttpStatusCode.OK,
      };
    } catch (error) {
      return {
        message: "Erro ao remover usuário",
        status: HttpStatusCode.INTERNAL_SERVER_ERROR,
      };
    }
  }
}
