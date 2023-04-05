import {useEffect,useState} from 'react';
import {ShapeSet} from 'lincd/lib/collections/ShapeSet';
import {House} from '../shapes/House';
import {Storage} from "lincd/lib/utils/Storage";
import './Home.scss';
import * as style from './Home.scss.json';
import {HousePreview} from '../components/HousePreview';
export default function Home() {
  let [houses,setHouses] = useState<ShapeSet<House>>()
  useEffect(() => {
    Storage.promiseUpdated().then(() => {
      let houses = House.getLocalInstances();
      setHouses(houses);
    })
  },[])
  return (
    <div className={style.Home}>
      <h2>Code challenge</h2>
      <div className={style.housesContainer}>{houses && <p>{houses?.size} houses are ready to be used</p>}</div>
    </div>
  );
}
