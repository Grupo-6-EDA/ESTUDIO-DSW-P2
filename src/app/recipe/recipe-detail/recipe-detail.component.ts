import { Component, OnInit } from '@angular/core';
import { Recipe } from '../Recipe';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeServiceService } from '../recipe.service.service';

@Component({
  selector: 'app-recipe-detail',
  standalone: false,
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css',
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe | null = null;
  ingredienteMasUsado: string = '';

  constructor(
    private route: ActivatedRoute,
    private recipeService: RecipeServiceService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.recipeService.getRecipe(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.calcularIngredienteMasUsado();
      },
      error: (error) => {
        console.error("Error al cargar receta:", error);
      }
    });
  }

  calcularIngredienteMasUsado(): void {
    if (!this.recipe || !this.recipe.ingredientes) return;

    let maxCantidad = 0;
    let ingredienteMax = '';

    this.recipe.ingredientes.forEach(ingrediente => {
      // Convertir la cantidad a número, ignorando texto
      const cantidad = parseFloat(ingrediente.cantidad);
      
      // Si es un número válido y es mayor que el máximo actual
      if (!isNaN(cantidad) && cantidad > maxCantidad) {
        maxCantidad = cantidad;
        ingredienteMax = ingrediente.nombre;
      }
    });

    this.ingredienteMasUsado = ingredienteMax;
  }

  goBack(): void {
    this.router.navigate(['/recipe']);
  }
}
