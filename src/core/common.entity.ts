import { Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export class CommonEntity {
  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    name: "created_at",
    select: false,
  })
  public createdAt: Date;

  @UpdateDateColumn({
    select: false,
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
    name: "updated_at",
  })
  public updatedAt: Date;

  @Column({ name: "created_by", nullable: true, select: false })
  createdBy: string;

  @Column({ name: "updated_by", nullable: true, select: false })
  updatedBy: string;

  @Column("boolean", { name: "is_active", default: true, select: false })
  isActive: boolean;
}
