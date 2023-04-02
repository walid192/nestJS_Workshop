import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm"

export class TimestampEntities{
    @CreateDateColumn({
        update:false
    })
    createdAt: Date

    @UpdateDateColumn()
    updateAt:Date

    @DeleteDateColumn()
    deletedAt:Date
}