import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as cryptoJS from "crypto-js";
import { SeguridadService } from 'src/app/servicios/seguridad.service';

@Component({
  selector: 'app-cambio-clave',
  templateUrl: './cambio-clave.component.html',
  styleUrls: ['./cambio-clave.component.css']
})

export class IdentificacionComponent implements OnInit {
  fgValidador: FormGroup = this.fb.group({
    'clave-anterior': ['', [Validators.required]],
    'clave-nueva-1': ['',[Validators.required]],
    'clave-nueva-2': ['',[Validators.required]]
   });
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router) { }

  ngOnInit(): void {
  }

  IdentificarUsuario(){
    let usuario = this.fgValidador.controls["usuario"].value;
    let clave = this.fgValidador.controls["clave"].value;
    let claveCifrada = cryptoJS.MD5(clave).toString();
    this.servicioSeguridad.Identificar(usuario, claveCifrada).subscribe((datos:any) => {
      this.servicioSeguridad.AlmacenarSesion(datos);
      this.router.navigate(["/inicio"]);
    }, (error: any) => {
      // KO
      alert("Datos Inválidos")
    })
  }


}

