import sqlite3 from 'sqlite3';
import { Database, RunResult } from 'sqlite3';

// Interface
export interface ITest {
    user: string;
    email: string;
  }
  

// Class
export class TestSQLiteService {
    private db: Database;
  
    constructor() {
      this.db = new sqlite3.Database('../database.sqlite');
    }
  
    public run(): Promise<ITest[]> {
      return new Promise((resolve, reject) => {
        this.db.all('SELECT * FROM users', [], (err, rows: ITest[]) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
        });
      });
    }
  }

  