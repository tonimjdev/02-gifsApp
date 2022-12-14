import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html'
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;
  @ViewChild('totalRes') totalRes!:ElementRef<HTMLOptionElement>;

  constructor( private gifsService: GifsService ) {}

  buscar() {
    const valor = this.txtBuscar.nativeElement.value;
    const totalGifs = Number(this.totalRes.nativeElement.value);
    console.log('txtBuscar', this.txtBuscar.nativeElement.value);
    this.gifsService.buscarGifs( valor, totalGifs );
    this.txtBuscar.nativeElement.value = "";
    //this.totalRes.nativeElement.value = "";
  }
}
