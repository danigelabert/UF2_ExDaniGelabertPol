import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Matricula} from "../matricula.model";
import {Alumnes} from "../alumnes.model";
import {Departament} from "../departament.model";

@Component({
  selector: 'app-componentex',
  templateUrl: './componentex.component.html',
  styleUrls: ['./componentex.component.css']
})
export class ComponentexComponent implements OnInit{
  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  //connectors
  llistaAssigInfo() {
    this.http.get<any>("http://localhost:4080/ex1").forEach((data) => {
      console.log(data);
    })
  }

  signeZ() {
    this.http.post<any>("http://localhost:4080/ex2", {}).subscribe();
  }


  //orm
  naiDe10() {
    this.http.get<Alumnes[]>("http://localhost:4080/ex3").subscribe((data) => {
      data.forEach((alumnes) => {

        // @ts-ignore
        let alum = new Alumnes(alumnes.alumn_dni, alumnes.alumn_nom, alumnes.alumn_cognom_1, alumnes.alumn_cognom_2, alumnes.alumn_adreca, alumnes.alumn_codi_postal, alumnes.alumn_poblacio,alumnes.alumn_comarca,alumnes.alumn_telefon, alumnes.alumn_data_naixement,alumnes.alumn_casat, alumnes.alumn_e_mail,alumnes.alumn_zodiac);
        console.log(alum)
      })
    })
  }

  afegirDepartament(){
    this.http.post('http://localhost:4080/ex4', {
      codi:6, nom: "IT", ubi:"Girona", telf:"679902", dni:"5555"
    }).subscribe((data) => {
    });
    console.log("Enviat")
    // this.http.post<any>("http://localhost:4080/update", {codi:6, nom: "IT", ubi:"Girona", telf:"679902", dni:"5555"}).subscribe();
  }
}
