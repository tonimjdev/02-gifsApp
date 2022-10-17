import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey = 'MXHqWlAqlg8Ujt599qBXNhKqVqXE9xx9';
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

  buscarGifs( query:string ) {
    
    query = query.trim().toLocaleLowerCase();

    if (!this._historial.includes( query )) {
      this._historial.unshift( query );
      this._historial = this._historial.splice(0,10);
    
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=MXHqWlAqlg8Ujt599qBXNhKqVqXE9xx9&q=${query}&limit=30`)
    .subscribe( ( resp ) => {
      console.log( resp.data );
      this.resultados = resp.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });


  }
}
