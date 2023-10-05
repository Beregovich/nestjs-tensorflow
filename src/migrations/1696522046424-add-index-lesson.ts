import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddIndexLesson1696522046424 implements MigrationInterface {
  name = 'AddIndexLesson1696522046424';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "title_hash" ON "lesson"  USING HASH ("title")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "public"."title_hash"`);
  }
}
