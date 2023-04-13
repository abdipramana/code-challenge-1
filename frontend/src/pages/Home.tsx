import { ShapeSet } from 'lincd/lib/collections/ShapeSet';
import { Storage } from "lincd/lib/utils/Storage";
import { useEffect, useState } from 'react';
import { House } from '../shapes/House';
import './Home.scss';
import * as style from './Home.scss.json';
import Spinner from '../components/Spinner';
import { HousePreview } from "../components/HousePreview";

export default function Home() {
  let [houses, setHouses] = useState<ShapeSet<House>>()
  useEffect(() => {
    Storage.promiseUpdated().then(() => {
      let houses = House.getLocalInstances();
      setHouses(houses);
    })
  }, [])

  return (
    <div className={style.Home}>
      {/* <h2>Code challenge</h2>
      <div className={style.housesContainer}>{houses && <p>{houses?.size} houses are ready to be used</p>}</div> */}
      <div className={style.container}>
        <div className={style.headlineSection}>
          <span className={style.categories}>Our Recommendation</span>
          <h3 className={style.headline}>Featured House</h3>
        </div>
        {!houses && (
          <Spinner />
        )}
        <div className={style.grid}>
          {houses && houses.map((house: House) => (
            <HousePreview of={house} />
          ))}
        </div>
      </div>
    </div>
  );
}
