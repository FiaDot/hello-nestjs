import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({ description: '플랫폼 제공 User ID' })
  platformUID: string;

  @ApiProperty({ description: '유저 고유번호' })
  uid: string;

  @ApiProperty({ description: '레벨' })
  lv: number;

  @ApiProperty({ description: '경험치' })
  exp: number;

  @ApiProperty({ description: '골드' })
  @Column({ default: 0 })
  gold: number;

  @ApiProperty({ description: '차단여부' })
  @Column({ default: false })
  block: boolean;

  @ApiProperty({ description: '최종 로그인 시간' })
  @Column({
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
    // default null이고 nullable 이면 transformer 버그 발생
    // default: null,
    nullable: true,
  })
  loginAt: LocalDateTime;

  @ApiProperty({ description: '생성일시' })
  // @CreateDateColumn()
  @Column({
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
  })
  createdAt: LocalDateTime;

  @ApiProperty({ description: '수정일시' })
  // @UpdateDateColumn()
  @Column({
    type: 'datetime',
    transformer: new LocalDateTimeTransformer(),
    nullable: false,
  })
  updatedAt: LocalDateTime;

  @BeforeInsert()
  protected beforeInsert() {
    this.createdAt = LocalDateTime.now();
    this.updatedAt = LocalDateTime.now();
  }

  @BeforeUpdate()
  protected beforeUpdate() {
    this.updatedAt = LocalDateTime.now();
  }
}
