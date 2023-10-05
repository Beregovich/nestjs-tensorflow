import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNickname1695917805127 implements MigrationInterface {
    name = 'AddNickname1695917805127'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "nick_name" character varying NOT NULL DEFAULT 'fake'`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "first_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "nick_name"`);
    }

}
