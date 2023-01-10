import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
// import { RouterModule } from "@angular/router";
import { RecipeBookRoutingModule } from "./recipe-book-routing.module";
import { RecipeBookComponent } from "./recipe-book.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { SelectARecipeComponent } from "./select-a-recipe/select-a-recipe.component";



import { SharedModule } from "../shared/shared.module"; ///features compartilhadas entre vários modules, como 'CommonModule', spinning loader, directives, etc...
import { LoggingService } from "../logging.service";  ///exemplo de SERVICE PROVIDENCIADO DENTRO DE 1 LAZILY-LOADED COMPONENT --> essa instance desse service será SCOPADA APENAS A ESSE MODULE ESPECÍFICO, NÃO VAI 'VAZAR' PARA O RESTO DOS MODULES, será realmente exclusiva essa instance (instance separada do resto de nosso app, no caso... não é application-wide, ela)...

@NgModule({

    declarations: [
        RecipeBookComponent,
        RecipeDetailComponent,
        RecipeBookComponent,
        SelectARecipeComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,

    ],
    providers: [

        LoggingService
    ],
    imports: [
       
       SharedModule, ////DEVE SER IMPORTADO AQUI E TAMBÉM EM 'app.module.ts' (todos shared modules são assim)....
        // CommonModule,
        ReactiveFormsModule,  ///esses 3 modules são necessários, aqui, pq usamos essas 3 features dentro dos componnets/código de 'recipeBookMOdule', esse SUBMODULE de nosso app (que é representado por 'app.module.ts', o module em que esse 'recipeBookMOdule' é importado) ------> 
        ///A RAZÃO PARA TERMOS DE 'REPETIR' ESSES IMPORTS, AQUI, É QUE __ IMPORTS REALIZADOS LÁ EM 'app.module.ts' NÃO SÃO TRANSFERIDOS/INHERITED AUTOMATICAMENTE PELOS 'child modules' importados nele...
        RecipeBookRoutingModule  ////assim fazemos o ACTUAL IMPORT DAS  _ROUTES_ RELATIVAS_ A ESSA FEATURE DE 'recipeBook' dentro do nosso module de 'recipeBook' (ou seja, aqui há um outsourcing bem absurdo, que deixa nossos components bem mais 'lean')...
    ],
     exports: [

        ///não PRECISAMOS IMPORTAR NENHUM DESSES COMPONENTS AO RESTO DAS FEATURES/MODULES DE NOSSO APP, justamente pq ELES SÓ SÃO/SERÃO USADOS INTERNAMENTE, com ESSE PRÓPRIO 'MODULE' de 'RecipeBookModule' que criamos.... 
        //  RecipeBookComponent,
        // RecipeDetailComponent,
        // RecipeBookComponent,
        // SelectARecipeComponent, 
        // RecipeItemComponent
    ],

})

export class RecipeBookModule {

    
} 