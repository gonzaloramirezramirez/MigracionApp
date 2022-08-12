import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Tablas } from '../models/enums';
import { GeneralServiceService } from './general-service.service';

declare var window: any;


@Injectable({
  providedIn: 'root'
})
export class DBService {

  db: any;
  readonly DATABASE_NAME: string = "sigo";

  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private generalService: GeneralServiceService
  ) {
    this.platform.ready().then(() => {
      this.createDB();
    }).catch(error => {
      console.log(error);
    })
  }

  //Crea la BD
  createDB() {

    if (!this.platform.is('cordova')) {
      let local = window.openDatabase(this.DATABASE_NAME, '1.0', 'DEV', 5 * 1024 * 1024);
      this.db = this.browserDBInstance(local);

      
      this.crearTablas();
    } else {

      this.sqlite.create({
        name: this.DATABASE_NAME,
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.db = db;
          this.crearTablas();
        })
        .catch(e => {
          alert("error " + JSON.stringify(e))
        });
    }
   
  }

  // Crea las tablas
  crearTablas() {
    let sql ='';  
    
    //Personal
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Personal + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });      
    //Vehiculos
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Vehiculos + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });    
    //Sistemas Vehiculo
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.SistemasVehiculo + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Clases
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Clase + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Falla
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Falla + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Secuencia
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Secuencias + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Inspeccion
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Inspeccion + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Ruta
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Rutas + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Inspeccion Supervisor
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.InspeccionSupervisor + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Detalle Inspeccion
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.DetalleInspeccion + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterio Inspeccionado
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriterioInspeccionado + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Programacion
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.TripulacionProgramada + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Programacion Barrido
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.ProgramacionBarrido + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterios Preoperacionales
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriteriosPreOperacionales + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterio Preoperacional por Vehiculo
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriterioPreOperacionalVehiculo + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Bolsas por Empresa
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.BolsasEmpresa + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Zona
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Zonas + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Instalacion
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Instalaciones + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterio Facility
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriteriosFacility + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterio por Servicio
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriteriosPorServicio + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Criterios Barrido
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.CriteriosBarrido + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
    //Contenedor
    sql = 'CREATE TABLE IF NOT EXISTS ' + Tablas.Contenedor + ' (id string primary key, usuario text, empresa int, data text, fecha text, sincronizado text)';
    this.db.executeSql(sql, []).then((res)=> { }).catch(e => { alert("error " + JSON.stringify(e)) });   
  }

    //Inserta los datos de la tabla
  insertBD (key, data, tabla, usuario, empresa, sincronizado = 'N', fecha = this.generalService.formatDate(new Date())) {
    const codEmpresa = parseInt(empresa);
    const llave= key.toString();
    const sql ="INSERT INTO " + tabla + " (id, usuario, empresa, data, fecha, sincronizado) VALUES "
               +  "('" + llave +"','" + usuario + "'," + codEmpresa + ",'" + data + "','" + fecha + "','" + sincronizado + "')"
        this.db.executeSql(sql,[]).then(row => {
        }).catch(err =>{
          console.log(err);
          throw err;
        });
    
  }

  //Actualiza los datos de la tabla
  updateBD(key, data, tabla, usuario, empresa) {
    const codEmpresa = parseInt(empresa);
    const llave = parseInt(key);
    this.db.executeSql("UPDATE " + tabla + " SET data='" + data + "' WHERE usuario=? AND empresa=? AND id=?", [usuario,codEmpresa,llave]).then(id => {
        console.log(id);
    }).catch(err =>{
      console.log(JSON.stringify(err));
    });
  }

    //Actualiza el campo sincronizacion en la tabla
    updateSincronizaBD(key, tabla, usuario, empresa, sincronizado) {
      return new Promise((resolve,reject)=>{
        const codEmpresa = parseInt(empresa);
        if(key){
          const llave = parseInt(key);
          this.db.executeSql("UPDATE " + tabla + " SET sincronizado=? WHERE usuario=? AND empresa=? AND id=?", [sincronizado,usuario,codEmpresa,llave])
          .then(id => {
            resolve(id);
          }).catch(err =>{
            reject(err);
          });
        } else {
          this.db.executeSql("UPDATE " + tabla + " SET sincronizado=? WHERE usuario=? AND empresa=?", [sincronizado,usuario,codEmpresa])
          .then(id => {
            resolve(id);
          }).catch(err =>{
            reject(err);
          });
        }

        
      });
    }

  //Selecciona los datos de Sqlite
  fetch(key, tabla, usuario, empresa, sincronizado = null) {
    const that = this;
    const codEmpresa = parseInt(empresa);
    return new Promise((resolve,reject)=>{
        //Si tiene key
        let query = "";

        if(sincronizado){
          query = "SELECT * FROM " + tabla + " WHERE empresa=" + codEmpresa + " and usuario='" + usuario +"' and sincronizado='"+ sincronizado +"'";
        } else {
          if (key) {
            query = "SELECT * FROM " + tabla + " WHERE id='"+ key +"'";
          } else {
            query = "SELECT * FROM " + tabla + " WHERE empresa=" + codEmpresa + " and usuario='" + usuario +"'";
          }          
        }

        that.db.executeSql(query,[]).then(response => {
          let data=[];
          for (let index = 0; index < response.rows.length; index++) {
            data.push( JSON.parse(response.rows.item(index).data) );
          }
          resolve(data);
        }).catch(err=>{
          reject(err);
        });
    });
  }

  clearData(tabla, key = null, sincronizado = null) {
    let query = "";

    if(sincronizado){
      this.db.executeSql("DELETE FROM " + tabla + " WHERE sincronizado=?", [sincronizado]).then(id => {
        console.log(id);
        }).catch(err =>{
          throw err;
        });
    } else {
      //Si tiene key
      if(key) {
        query = "DELETE FROM " + tabla +" WHERE id='" + key +"'";
      } else {
        query = "DELETE FROM " + tabla ;
      }

    this.db.executeSql(query, []).then(id => {
      console.log(id);
      }).catch(err =>{
        throw err;
      });
    }
    
  }

  existeRegistro(key, tabla, usuario, empresa){
    return new Promise((resolve,reject)=> {
      const codEmpresa = parseInt(empresa);
        this.db.executeSql("SELECT * FROM " + tabla + " WHERE id= "+ key + " AND usuario='" + usuario  +"' AND empresa=" + codEmpresa ).then(rows => {

            if (rows[0]) {
                resolve(true);
            } else {
                resolve(false);
            }
        }).catch(err=> {
          reject(err);
        });
    });
  }

  //Cuenta los registros de una tabla
  countRegister(tabla,usuario,empresa,codigo = null, fecha = this.generalService.formatDate(new Date())){
    return new Promise((resolve,reject)=> {
      const codEmpresa = parseInt(empresa);
      let consulta= "SELECT COUNT(*) FROM " + tabla + " WHERE usuario='" + usuario  +"' AND empresa=" + codEmpresa + " AND fecha='" + fecha + "'" ;
      if(codigo){
          consulta+= " AND id="+codigo;
      }

      this.db.executeSql(consulta).then(rows => {
          if (rows[0]) {
              resolve(rows[0][0]);
          } else {
              resolve(null);
          }
      }).catch(err => {
        reject(err);
      });
    });
  }

  //Obtiene inspecciones pendientes
  getPendientes(){
    return new Promise((resolve,reject)=> {
      const estadoPendiente = 'P';
      let consulta= "SELECT COUNT(*) AS pd FROM inspeccionsupervisor WHERE sincronizado = '" + estadoPendiente + "'" ;

      this.db.executeSql(consulta).then(rows => {
          if (rows.rows[0]) {
              resolve(rows.rows[0].pd);
          } else {
              resolve(null);
          }
      }).catch(err => {
        reject(err);
      });
    });
  }

  browserDBInstance = (db) => {

    return {
      executeSql: (sql) => {
        return new Promise((resolve, reject) => {
          db.transaction((tx) => {
            tx.executeSql(sql, [], (tx, rs) => {
              resolve(rs)
            });
          });
        })
      },
      sqlBatch: (arr) => {
        return new Promise((r, rr) => {
          let batch = [];
          db.transaction((tx) => {
            for (let i = 0; i < arr.length; i++) {
              batch.push(new Promise((resolve, reject) => {
                tx.executeSql(arr[i], [], () => { resolve(true) })
              }))
              Promise.all(batch).then(() => r(true));
            }
          });
        })
      }
    }
  }

}