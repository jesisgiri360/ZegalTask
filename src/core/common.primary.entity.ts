import { CommonEntity } from "./common.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class CommonEntityPrimary extends CommonEntity {
  @PrimaryGeneratedColumn({ name: "id", type: "bigint" })
  id: number;
}
