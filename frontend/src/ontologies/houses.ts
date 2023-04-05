import {NamedNode} from 'lincd/lib/models';
import {JSONLD} from 'lincd-jsonld/lib/utils/JSONLD';
import {createNameSpace} from 'lincd/lib/utils/NameSpace';
import {linkedOntology} from '../package';
//import all the exports of this file as one variable called _this (we need this at the end)
import * as _this from './houses';

/**
 * Load the data of this ontology into memory, thus adding the properties of the entities of this ontology to the local graph.
 */
export var loadData = () => {
  return import('../data/houses.json').then((data) => JSONLD.parse(data));
};

/**
 * The namespace of this ontology, which can be used to create NamedNodes with URI's not listed in this file
 */
export var ns = createNameSpace('http://lincd.org/ont/houses/');

/**
 * The NamedNode of the ontology itself
 */
export var _self: NamedNode = ns('');

//A list of all the entities (Classes & Properties) of this ontology, each exported as a NamedNode
export var House: NamedNode = ns('House');
export var image: NamedNode = ns('image');
export var price: NamedNode = ns('price');
export var title: NamedNode = ns('title');
export var propertyType: NamedNode = ns('propertyType');

//An extra grouping object so all the entities can be accessed from the prefix/name
export const houses = {
  House,
  image,
  price,
  title,
  propertyType,

};

//Registers this ontology to LINCD.JS, so that data loading can be automated amongst other things
linkedOntology(_this, ns, 'houses', loadData, '../data/houses.json');
