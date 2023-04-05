import {Shape} from 'lincd/lib/shapes/Shape';
import {Literal, NamedNode} from 'lincd/lib/models';
import {linkedShape} from '../package';
import { houses } from '../ontologies/houses';
import {literalProperty} from "lincd/lib/utils/ShapeDecorators";

@linkedShape
export class House extends Shape {
  static targetClass:NamedNode = houses.House;

  @literalProperty({
    path: houses.title,
    maxCount: 1,
  })
  get title() {
    return this.getValue(houses.title);
  }

  set title(val: string) {
    this.overwrite(houses.title, new Literal(val));
  }

  @literalProperty({
    path: houses.title,
    maxCount: 1,
  })
  get price() {
    return this.getValue(houses.price);
  }

  set price(val: string) {
    this.overwrite(houses.price, new Literal(val));
  }

  @literalProperty({
    path: houses.propertyType,
    maxCount: 1,
  })
  get propertyType() {
    return this.getValue(houses.propertyType);
  }

  set propertyType(val: string) {
    this.overwrite(houses.propertyType, new Literal(val));
  }

  @literalProperty({
    path: houses.image,
    maxCount: 1,
  })
  get image() {
    return this.getValue(houses.image);
  }

  set image(val: string) {
    this.overwrite(houses.image, new Literal(val));
  }
}