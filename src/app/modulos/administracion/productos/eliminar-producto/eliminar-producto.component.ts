import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeloProducto } from 'src/app/modelos/producto.modelo';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-eliminar-producto',
  templateUrl: './eliminar-producto.component.html',
  styleUrls: ['./eliminar-producto.component.css']
})
export class EliminarProductoComponent implements OnInit {
  id: string = '';
  fgValidador: FormGroup = this.fb.group({
    'id': ['', [Validators.required]],
    'nombre': ['', [Validators.required]],
    'descripcion': ['', [Validators.required]],
    'precioVenta': ['', [Validators.required]],
    'stock': ['', [Validators.required]],
    'imagen': ['', [Validators.required]]
  });
  constructor(private fb: FormBuilder,
    private servicioProducto: ProductoService,
    private router : Router, 
    private route : ActivatedRoute)
   { }

  ngOnInit(): void {
    this.id =  this.route.snapshot.params["id"];
    this.EliminarProducto();
    this.BuscarProducto();
   
  }
  BuscarProducto(){
    this.id = this.route.snapshot.params["id"];
    this.servicioProducto.ObtenerRegistrosPorId(this.id).subscribe((datos: ModeloProducto) => {
     if(datos){
      this.fgValidador.controls["id"].setValue(datos.id);
      this.fgValidador.controls["nombre"].setValue(datos.nombre);
      this.fgValidador.controls["descripcion"].setValue(datos.descripcion);
      this.fgValidador.controls["precionVenta"].setValue(datos.precioVenta);
      this.fgValidador.controls["imagen"].setValue(datos.imagen);
     }
    });

  }

  EliminarProducto(){
    this.servicioProducto.EliminarProducto(this.id).subscribe((datos: any)=> {
      alert("Producto eliminado correctamente")
      this.router.navigate(["/administracion/listar-productos"]);
    }, (error: any)=> {
      alert("Error eliminando el producto");
      
    }) ;

  }
}
