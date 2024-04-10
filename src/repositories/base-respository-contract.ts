/** Generic Types for Requests **/
export type CreateRequest<T> = T & {};
export type UpdateRequest<T> = Partial<T> & { id: string | number };

/** Generic Types for Responses **/
export type Response<T> = Promise<T | null>;

/** Generic Repository Interface **/
export interface Repository<T> {
  create(data: CreateRequest<T>): Response<T>;
  update(data: UpdateRequest<T>): Response<T>;
  delete(id: string | number): Response<T>;
  findById(id: string | number): Response<T>;
  findAll(): Response<T[]>;
}
