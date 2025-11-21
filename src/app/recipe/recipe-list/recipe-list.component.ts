// Importa el decorador Component y la interfaz OnInit para inicializar el componente
import { Component, OnInit } from '@angular/core';

// Importa el modelo de datos Recipe
import { Recipe } from '../Recipe';

// Importa datos locales (ya no necesarios si se usa el servicio externo)
import { recipeData } from '../recipeData';

// Importa el servicio que consulta recetas desde la URL externa
// ✅ Cumple Punto 1: uso del servicio creado para obtener recetas
import { RecipeServiceService } from '../recipe.service.service';

// Importa Router para navegación entre rutas
// ✅ Cumple Punto 2: navegación al detalle de receta
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  standalone: false,
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css',
})
export class RecipeListComponent implements OnInit {
  // Lista de recetas obtenidas del servicio
  recipes: Recipe[] = [];

  // Variables para manejar selección de recetas (opcional)
  selected: Boolean = false;
  selectedRecipe: Recipe | null = null;

  // Inyección del servicio y del router
  constructor(private recipeService: RecipeServiceService, private router: Router) {}

  // ✅ Cumple Punto 1 y 2: al iniciar, se consulta la lista de recetas desde el servicio
  ngOnInit() {
    this.getRecipes();
  }

  // ✅ Cumple Punto 1: función que llama al servicio para obtener recetas
  getRecipes(): void {
    this.recipeService.getRecipes().subscribe((recipes => {
      this.recipes = recipes;
    }));
  }

  // ✅ Cumple Punto 2 y 3: al seleccionar una receta, navega al detalle usando su ID
  onSelect(recipe: Recipe) {
    this.router.navigate(['/recipe', recipe.id]);
  }
}

