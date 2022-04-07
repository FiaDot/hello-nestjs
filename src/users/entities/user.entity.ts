import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  AutoIncrement,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';

@Table({
  // timestamps: true, // createAt, updatedAt 컬럼 추가
  // paranoid: true, // deleteAt 컬럼 추가 : 실제 레코드 삭제 안함 (soft delete)
  // charset: 'utf8mb4', // TODO : 따로 설정할 필요 있는지 체크 필요
  // collate: 'utf8mb4_general_ci', // TODO : 따로 설정할 필요 있는지 체크 필요
})
export class User extends Model<User> {
  @ApiProperty({ description: '플랫폼 제공 User ID' })
  @Column
  platformUID: string;

  @ApiProperty({ description: '유저 고유번호' })
  @PrimaryKey
  @AutoIncrement
  // @Column(DataType.INTEGER.UNSIGNED)
  @Column
  id: number;

  @ApiProperty({ description: '레벨' })
  @Default(1)
  @Column
  lv: number;

  @ApiProperty({ description: '경험치' })
  @Default(0)
  @Column
  exp: number;

  @ApiProperty({ description: '골드' })
  @Default(0)
  @Column
  gold: number;

  @ApiProperty({ description: '차단여부' })
  @Default(false)
  @Column
  isBlock: boolean;

  @ApiProperty({ description: '최종 로그인 시간' })
  @AllowNull(true)
  @Column
  loginAt: Date;

  // @ApiProperty({ description: '생성일시' })
  // @CreatedAt
  // createdAt: Date;
  //
  // @ApiProperty({ description: '수정일시' })
  // @UpdatedAt
  // updatedAt: Date;
}
