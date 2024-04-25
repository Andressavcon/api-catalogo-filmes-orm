import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Film1714006973212 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const table = new Table({
      name: 'film',
      columns: [
        {
          name: 'id',
          type: 'serial',
          isPrimary: true,
        },
        {
          name: 'title',
          type: 'text',
          isUnique: true,
        },
        {
          name: 'gender',
          type: 'text',
          isNullable: true,
        },
        {
          name: 'synopsis',
          type: 'text',
          isNullable: true,
        },
      ],
    });
    await queryRunner.createTable(table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('film');
  }
}
