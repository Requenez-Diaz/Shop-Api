import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductSize } from "./product.size";

@Entity()

export class Size {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    name: string;

    @Column({ type: 'numeric' })
    width: number;

    @Column({ type: 'numeric' })
    height: number;

    @Column({ type: 'numeric' })
    units: number;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ nullable: true })
    is_active: string;

    @OneToMany(() => ProductSize, (productImage) => productImage.product, {
        cascade: true,
        eager: true,
    })
    product?: ProductSize[];
}