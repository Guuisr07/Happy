import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602642743464 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
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
          name: 'path',
          type: 'varchar',
        },
        {
          name:'orphanage_id',
          type: 'integer', 
        }
      ],
      foreignKeys: [ //Criando um relacionamento com a tabela orphanages
        {
          name: 'ImageOrphanage', //nome do relacionamento
          columnNames: ['orphanage_id'], //coluna aonde esta o relacionamento na tabela images 
          referencedTableName: 'orphanages', //referenciando a tabela orphanages
          referencedColumnNames: ['id'], //referenciando a coluna id da tabela orphanages 
          onUpdate: 'CASCADE', //quando o orfanato trocar de id, troca tambem na tabela images
          onDelete: 'CASCADE',//quando deletar um orfanato deleta tambem as imagens do orfanato
        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }
}
