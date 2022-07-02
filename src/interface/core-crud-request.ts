import { CrudRequest } from "@nestjsx/crud";

export interface ICrudRequest extends CrudRequest {
  user: { id: number; role: string };
}
