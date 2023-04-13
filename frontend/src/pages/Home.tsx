import { ShapeSet } from 'lincd/lib/collections/ShapeSet';
import { Storage } from "lincd/lib/utils/Storage";
import { useEffect, useState } from 'react';
import { House } from '../shapes/House';
import './Home.scss';
import * as style from './Home.scss.json';
import Spinner from '../components/Spinner';
import { HousePreview } from "../components/HousePreview";

const FILTER_DATA = ['All', 'House', 'Villa', 'Apartment'];

export default function Home() {
  let [houses, setHouses] = useState<ShapeSet<House>>();
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    Storage.promiseUpdated().then(() => {
      let houses = House.getLocalInstances();
      setHouses(houses);
    })
  }, [])

  const handleFilterClick = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const filteredHouses = houses?.filter(({ propertyType: type }) => {
    if (filter === 'All') {
      return true;
    } else {
      return type === filter;
    }
  });

  return (
    <div className={style.Home}>
      {/* <h2>Code challenge</h2>
      <div className={style.housesContainer}>{houses && <p>{houses?.size} houses are ready to be used</p>}</div> */}
      <div className={style.container}>
        <div className={style.headlineSection}>
          <div>
            <span className={style.categories}>Our Recommendation</span>
            <h3 className={style.headline}>Featured House</h3>
          </div>
          <div className={style.filter}>
            {FILTER_DATA.map((option) => (
              <button 
                key={option} 
                className={option === filter ? style.activeFilterButton : ''}
                onClick={() => handleFilterClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        {!houses && (
          <Spinner />
        )}
        <div className={style.grid}>
          {filteredHouses?.map((house: House) => (
            <HousePreview of={house} key={house.namedNode.uri} />
          ))}
        </div>
      </div>
    </div>
  );
}
