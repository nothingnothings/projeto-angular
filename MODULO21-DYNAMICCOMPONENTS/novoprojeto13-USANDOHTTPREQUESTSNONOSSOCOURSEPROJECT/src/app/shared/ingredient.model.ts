// export class Ingredient {
//   constructor(public name: string, public amount: number, public id: number ) {}
// }

export class Ingredient {
  constructor(public ingredient: string, public amount: number, public recipeIndex: number) {}
}
