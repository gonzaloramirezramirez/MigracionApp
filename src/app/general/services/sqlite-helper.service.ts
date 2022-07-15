import { Injectable } from '@angular/core';
//import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SqliteHelperService {

  private isOpen = false;
  //private db: SQLiteObject;
  
  constructor(
    private platform: Platform,
    //private sqlite: SQLite,
  ) { }

  /*
  executeBatch(params: any[]){
    return new Promise((resolve) => {
      this.open().then(() => {
        this.db.sqlBatch(params).then((response) => {
          resolve(response);
        }).catch(error => {
          console.log(error.message);
          return null;
        });//.catch(err => reject(err));
      }).catch(error => {
        console.log(error.message);
        return null;
      });//.catch(err => reject(err));
    })
  }

  execute(query: string, params: any){
    return new Promise((resolve) => {
      this.open().then(() => {
        this.db.executeSql(query, params).then((response) => {
          const items = [];
          for (let i = 0; i < response.rows.length; i++) {
            const element = response.rows.item(i);
            items.push(element);
          }
          resolve(response);
        }).catch(error => {
          console.log(error.message);
          return null;
        });//.catch(err => reject(err));
      }).catch(error => {
        console.log(error.message);
        return null;
      });//.catch(err => reject(err));
    })
  }

  getData(query: string, params: any){
    return new Promise((resolve) => {
      this.open().then(() => {
        this.db.executeSql(query, params).then((response) => {
          resolve(response);
        }).catch(error => {
          console.log(error.message);
          return null;
        });//.catch(err => reject(err));
      }).catch(error => {
        console.log(error.message);
        return null;
      });//.catch(err => reject(err));
    })
  }

  private open(){
    return new Promise((resolve) => {
      this.platform.ready().then(() => {
        if(this.isOpen){
          resolve(this.isOpen);
        }
        else{
          this.sqlite.create({
            name: 'data.db',
            location: 'default'
          }).then((db: SQLiteObject) => {
              this.db = db;
              this.isOpen = true;
            }).catch(error => {
              console.log(error.message);
              return null;
            });//.catch(e => reject(e));
        }
      }).catch(error => {
        console.log(error.message);
        return null;
      });//.catch(e => reject(e));
    })
  }

  */
}
