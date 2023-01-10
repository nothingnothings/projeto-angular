import { Injectable } from "@angular/core";

import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from "rxjs";
import { RecipeBookService } from "./recipeBook.service";
import { Recipe } from "./recipeBook/recipe.model";


@Injectable({providedIn: 'root'})
export class RecipesResolverService implements Resolve<Recipe[]> {


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        
        const recipes = this.recipeBookService.getRecipes();
        console.log('TEST');
        ///aqui fazemos o RETURN DE UM OBSERVABLE, que vai essencialmente sofrer 'subscribe' automaticamente pelo typesccript por estar posicionado em 1 resolver....
        
        
        if (recipes.length === 0) {
            console.log('LINE')
            return this.recipeBookService.loadRecipes();  // vai 'resolve' essa data ANTES DE NOSSOS COMPONENTS SEREM CARREGADOS, ANTES DA PAGE DE 'recipe-book' SER CARREGADA...
        
        } else {
            console.log('LINE2')
            console.log(recipes);
            return recipes
        }
        

    }

    constructor(private recipeBookService: RecipeBookService) {

    }

}