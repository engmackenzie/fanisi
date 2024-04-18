import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCompany1713453267694 implements MigrationInterface {
    name = 'AddCompany1713453267694'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "company" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "company"
        `);
    }

}
