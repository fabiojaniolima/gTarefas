import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) { }

  public getDB() {
    return this.sqlite.create({
      name: 'database.db',
      location: 'default'
    });
  }

  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        this.createTables(db);
        
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject) {

    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS task (id integer primary key AUTOINCREMENT NOT NULL, title TEXT)']
    ])
      .then(() => console.log('tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

}
