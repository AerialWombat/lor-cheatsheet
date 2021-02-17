import { useEffect, useState } from 'react';
import CardList from './components/CardList';
import CardListItem from './components/CardListItem';

import './styles/styles.scss';
import cardData from './assets/set-data/combined-set-data.json';

function App() {
  const [cards, setCards] = useState<Card[]>(
    cardData.sort((card1, card2) => card1.cost - card2.cost)
  );
  const [costFilters, setCostFilters] = useState<costFilters>({
    '-1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7+': false,
  });
  const [regionFilters, setRegionFilters] = useState<regionFilters>({
    Demacia: false,
    Noxus: false,
    Freljord: false,
    Ionia: false,
    Shadowisles: false,
    Bilgewater: false,
    PiltoverZaun: false,
    Targon: false,
  });

  // useEffect(() => {
  //   console.log('EFFECT');
  // });

  const toggleCostFilter: toggleCostFilter = (selectedValue) => {
    setCostFilters({
      ...costFilters,
      [selectedValue]: !costFilters[selectedValue],
    });
  };

  const toggleRegionFilter: toggleRegionFilter = (selectedRegion) => {
    setRegionFilters({
      ...regionFilters,
      [selectedRegion]: !regionFilters[selectedRegion],
    });
  };

  return (
    <div className="layout">
      <div className="card-tooltip"></div>
      <div className="layout__lists">
        <CardList
          cards={cards}
          speed="Burst"
          costFilters={costFilters}
          regionFilters={regionFilters}
        />
        <CardList
          cards={cards}
          speed="Fast"
          costFilters={costFilters}
          regionFilters={regionFilters}
        />
        <CardList
          cards={cards}
          speed="Slow"
          costFilters={costFilters}
          regionFilters={regionFilters}
        />
      </div>
      <div className="layout__filters">
        <div className="row">
          <div className="region-filter" onClick={() => toggleRegionFilter('Demacia')}>
            Demacia
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Noxus')}>
            Noxus
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Freljord')}>
            Freljord
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Ionia')}>
            Ionia
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('ShadowIsles')}>
            ShadowIsles
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Bilgewater')}>
            Bilgewater
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('PiltoverZaun')}>
            PiltoverZaun
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Targon')}>
            Targon
          </div>
          {/* <div className="region-filter" onClick={() => toggleRegionFilter('Shurima')}>
            Shurima
          </div> */}
        </div>
        <div className="row">
          <div className="cost-filter" onClick={() => toggleCostFilter('-1')}>
            -1
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('2')}>
            2
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('3')}>
            3
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('4')}>
            4
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('5')}>
            5
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('6')}>
            6
          </div>
          <div className="cost-filter" onClick={() => toggleCostFilter('7+')}>
            7+
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
