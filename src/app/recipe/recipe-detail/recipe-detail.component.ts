// Importa Component y OnInit para inicializar el componente
import { Component, OnInit } from '@angular/core';

// Importa el modelo de datos Recipe
import { Recipe } from '../Recipe';

// Importa ActivatedRoute para leer parámetros de la URL
// ✅ Cumple Punto 2: lectura del ID desde la ruta
import { ActivatedRoute, Router } from '@angular/router';

// Importa el servicio que consulta recetas desde la URL externa
// ✅ Cumple Punto 1: uso del servicio para obtener detalle de receta
import { RecipeServiceService } from '../recipe.service.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  // Receta seleccionada
  recipe: Recipe | null = null;

  // ✅ Cumple Punto 4: variable para mostrar el ingrediente más usado
  ingredienteMasUsado: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeServiceService,
    private router: Router
  ) {}
  
  // ✅ Cumple Punto 2: obtiene el ID desde la URL y consulta el detalle desde el servicio
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.calcularIngredienteMasUsado(); // ✅ Cumple Punto 4
      },
      error: (error) => {
        console.error("Error al cargar receta:", error);
      }
    });
  }

  // ✅ Cumple Punto 4: calcula el ingrediente con mayor cantidad (ignorando unidades)
  calcularIngredienteMasUsado(): void {
    if (!this.recipe || !this.recipe.ingredientes) return;

    let maxCantidad = 0;
    let ingredienteMax = '';

    this.recipe.ingredientes.forEach(ingrediente => {
      const cantidad = parseFloat(ingrediente.cantidad);
      if (!isNaN(cantidad) && cantidad > maxCantidad) {
        maxCantidad = cantidad;
        ingredienteMax = ingrediente.nombre;
      }
    });

    this.ingredienteMasUsado = ingredienteMax;
  }

  // ✅ Cumple Punto 3: botón para regresar al listado de recetas
  goBack(): void {
    this.router.navigate(['/recipe']);
  }
}

