import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAgeToUser1744016294392 implements MigrationInterface {
    name = 'AddAgeToUser1744016294392'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "age" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "age"`);
    }

}
