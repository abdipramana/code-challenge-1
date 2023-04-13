import React from 'react';
import './HousePreview.scss';
import {default as style} from './HousePreview.scss.json';
import {registerPackageModule, linkedComponent} from '../package';
import { House } from '../shapes/House';
import { formatCurrency } from '../utils/helper';

export const HousePreview = linkedComponent<House>(
  House.request((house) => ({
    title: house.title,
    image: house.image,
    price: house.price,
    propertyType: house.propertyType,
  })),
  ({linkedData}) => {
    let {title, image, price, propertyType} = linkedData;
    
    return (
      <div className={style.HousePreview}>
        <figure>
          <img src={image} alt={title} />
          <span className={`${style.propertyType} ${style[propertyType]}`}>{propertyType}</span>
        </figure>
        <div>
          <h4 className={style.title}>{title}</h4>
          <p className={style.price}>{formatCurrency(price)}</p>
        </div>
      </div>
    );
  },
);

//register all components in this file
registerPackageModule(module);