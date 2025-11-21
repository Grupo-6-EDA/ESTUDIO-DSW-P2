import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecipeServiceService {
  private url = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/recipe.json`);
  }

  getRecipe(id: number): Observable<any> {
  return this.http.get<any>(`${this.url}/${id}/recipe.json`)
  }
}
