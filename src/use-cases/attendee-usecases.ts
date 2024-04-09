import {
  AttendeeRepository,
  CreateAttendeeRequest,
  CreateAttendeeResponse,
  DeleteAttendeeResponse,
  FindAllAttendeesResponse,
  FindAttendeeByEmailResponse,
  FindAttendeeByIdResponse,
  UpdateAttendeeRequest,
  UpdateAttendeeResponse,
} from '@/repositories/attendees-repository-contract.ts';

export class AttendeeUseCases implements AttendeeRepository {
  constructor(private repository: AttendeeRepository) {}

  async create(data: CreateAttendeeRequest): CreateAttendeeResponse {
    return this.repository.create(data);
  }

  async update(data: UpdateAttendeeRequest): UpdateAttendeeResponse {
    return this.repository.update(data);
  }

  async findById(id: number): FindAttendeeByIdResponse {
    return this.repository.findById(id);
  }

  async findByEmail(email: string): FindAttendeeByEmailResponse {
    return this.repository.findByEmail(email);
  }

  async findAll(): FindAllAttendeesResponse {
    return this.repository.findAll();
  }

  async delete(id: number): DeleteAttendeeResponse {
    return this.repository.delete(id);
  }
}
