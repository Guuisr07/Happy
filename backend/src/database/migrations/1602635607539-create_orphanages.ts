import {MigrationInterface, QueryRunner, Table } from "typeorm";

export class createOrphanages1602635607539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    //REALIZAR ALTERACOES, CRIAR, ALTERAR, DELETAR TABELA
    await queryRunner.createTable(new Table({ //Criando uma tabela 
      name: 'orphanages',
      columns: [
      {
        name: 'id',
        type: 'integer',
        unsigned: true,
        isPrimary: true, //Chave primaria
        isGenerated: true, //Auto gerada
        generationStrategy: 'increment', //Auto increment 
      },
      {
        name: 'name',
        type: 'varchar',
      },
      {
        name: 'latitude',
        type: 'decimal', //para poder usar Float
        scale: 10, //numero depois da virgula
        precision: 2, //numero antes da virgula
      },
      {
        name: 'longitude',
        type: 'decimal', 
        scale: 10, 
        precision: 2, 
      },
      {
        name: 'about',
        type: 'text',
      },
      {
        name: 'instructions',
        type: 'text',
      },
      {
        name: 'opening_hours',
        type: 'varchar',
      },
      {
        name: 'open_on_weekends',
        type: 'boolean',
        default: false,
      },
    ],
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    //DESFAZER O QUE FOI FEITO NO UP
    await queryRunner.dropTable('orphanages');
  }
}

//Para executar a migration e criar a tabela deve se usar o yarn typeorm migration:run
