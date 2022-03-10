import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HeroeModel} from "../models/heroe.model";
import {map,delay} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = 'https://crud-heroes-4536b-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient) { }

  crearHeroe( heroe: HeroeModel){
    return this.http.post(`${ this.url}/heroes.json`,heroe)
      .pipe(
        map((resp:any)=>{
          heroe.id = resp.name
          return heroe
        })
      )
  }
  actualizarHeroe( id:any, heroe:{nombre: string; poder: string; vivo:boolean}){


    return this.http.put(`${this.url}/heroes/${id}.json`,heroe)
  }

  borrarHeroe(id:string){

    return this.http.delete(`${this.url}/heroes/${id}.json`)
  }

  getHeroe(id: string ){

    return this.http.get(`${ this.url}/heroes/${id}.json`);
}


  getHeroes(){
   return  this.http.get(`${this.url}/heroes.json`)
     .pipe(
       map(this.crearArreglo),
       delay(0)
     )
  }

  private crearArreglo(heroesObj: any) {

    const heroes: HeroeModel[] = [];
    console.log(heroesObj);
    if (heroesObj === null) { return []; }
    Object.keys (heroesObj).forEach ( (key)=> {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push( heroe);
    });
    return heroes;
  }


}
