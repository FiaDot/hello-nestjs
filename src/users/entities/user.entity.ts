import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('User')
export class User {
  @ApiProperty({ description: '플랫폼 제공 User ID' })
  @Column({ length: 128 })
  platformUID: string;

  @ApiProperty({ description: '유저 고유번호' })
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @ApiProperty({ description: '레벨' })
  @Column({ default: 1 })
  lv: number;

  @ApiProperty({ description: '경험치' })
  @Column({ default: 0 })
  exp: number;

  @ApiProperty({ description: '골드' })
  @Column({ default: 0 })
  gold: number;

  @ApiProperty({ description: '차단여부' })
  @Column({ default: false })
  block: boolean;

  @ApiProperty({ description: '최종 로그인 시간' })
  @Column({ default: null, nullable: true })
  loginAt: Date;

  @ApiProperty({ description: '생성일시' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: '수정일시' })
  @UpdateDateColumn()
  updatedAt: Date;
}
