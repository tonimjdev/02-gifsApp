import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'MXHqWlAqlg8Ujt599qBXNhKqVqXE9xx9';
  private servicioUrl = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];

  // TO DO: Cambiar any por su tipo correspondiente
  public resultados: Gif[] = [];

  // Getter
  get historial() {
    
    return [...this._historial];
  }

  constructor ( private http: HttpClient ) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];

  }

  buscarGifs( query:string, total:number ) {
    
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams().
    set('api_key', this.apiKey).
    set('limit', total).
    set('q', query);

    console.log(params.toString());

    this.http.get<SearchGifsResponse>(`${ this.servicioUrl }/search`, { params } )
    .subscribe( ( resp ) => {
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

  borrarHistorial() {
    this._historial = [];
    localStorage.setItem('historial', JSON.stringify(this._historial));
  }
}