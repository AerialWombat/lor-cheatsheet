import { useEffect, useState } from 'react';
import CardList from './components/CardList';
import CardListItem from './components/CardListItem';

import './styles/styles.scss';
import cardData from './assets/set-data/combined-set-data.json';

function App() {
  const [cards, setCards] = useState(cardData.sort((card1, card2) => card1.cost - card2.cost));
  const [costFilters, setCostFilters] = useState<costFilters>({
    '-1': false,
    '2': false,
    '3': false,
    '4': false,
    '5': false,
    '6': false,
    '7+': false,
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

  return (
    <div className="layout">
      <div className="layout__lists">
        <CardList cards={cards} speed="Burst" costFilters={costFilters} />
        <CardList cards={cards} speed="Fast" costFilters={costFilters} />
        <CardList cards={cards} speed="Slow" costFilters={costFilters} />
      </div>
      <div className="layout__filters">
        <div className="row">
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
          <div className="region-filter">R</div>
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
