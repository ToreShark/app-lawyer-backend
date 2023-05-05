// import { MigrationInterface, QueryRunner } from 'typeorm';

// export class DocumentRefactor1683185933342 implements MigrationInterface {
//   public async up(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query('ALTER TABLE "documents" ADD COLUMN "user" uuid');
//     await queryRunner.query('ALTER TABLE "documents" DROP COLUMN "createdAt"');
//     await queryRunner.query('ALTER TABLE "documents" DROP COLUMN "updatedAt"');
//   }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query('ALTER TABLE "documents" DROP COLUMN "user"');
//     await queryRunner.query(
//       'ALTER TABLE "documents" ADD COLUMN "createdAt" TIMESTAMP NOT NULL DEFAULT now()',
//     );
//     await queryRunner.query(
//       'ALTER TABLE "documents" ADD COLUMN "updatedAt" TIMESTAMP NOT NULL DEFAULT now()',
//     );
//   }
// }
