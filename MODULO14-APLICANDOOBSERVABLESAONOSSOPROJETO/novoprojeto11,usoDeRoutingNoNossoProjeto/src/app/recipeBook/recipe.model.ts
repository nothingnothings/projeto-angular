import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  // public name: string = '';   ////sem shorthand
  // public description: string = '';
  // public imagePath : string = '';

  // constructor(name: string, desc: string, imagePath: string) { ///sem shorthand

  //     this.name = name;
  //     this.description = desc;
  //     this.imagePath = imagePath

  // }

  constructor(
    public name: string,
    public description: string,
    public imagePath: string,
    public ingredients: Ingredient[]
  ) {
    ///sem shorthand....
  }
}
