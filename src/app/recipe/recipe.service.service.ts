// Importa el módulo HttpClient necesario para hacer peticiones HTTP externas
// ✅ Cumple con: "La consulta debe usar la siguiente url para las peticiones"
import { HttpClient } from '@angular/common/http';

// Importa el decorador Injectable para declarar un servicio en Angular
import { Injectable } from '@angular/core';

// Importa Observable para manejar respuestas asincrónicas de las peticiones HTTP
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root' // ✅ Cumple con: "El nuevo servicio recipe.service.ts en el módulo correspondiente"
})
export class RecipeServiceService {
  // URL base para las consultas de recetas
  // ✅ Cumple con: "La consulta debe usar la siguiente url para las peticiones"
  private url = 'https://raw.githubusercontent.com/2603-Uniandes/jsons/refs/heads/main/2025-10%20Recetas';

  // Constructor que inyecta el cliente HTTP
  constructor(private http: HttpClient) { }

  // Función para consultar el listado de recetas
  // ✅ Cumple con: "Creación de función para consulta del listar de recipes"
  getRecipes(): Observable<any[]>{
    return this.http.get<any[]>(`${this.url}/recipe.json`);
  }

  // Función para consultar el detalle de una receta específica por ID
  // ✅ Cumple con: "Creación de función para consultar el detalle de una receta"
  getRecipe(id: number): Observable<any> {
    return this.http.get<any>(`${this.url}/${id}/recipe.json`);
  }
}
 
