import { useState } from 'react';
import CardList from './components/CardList';
import CardOverlay from './components/CardOverlay';
import CardToolTip from './components/CardToolTip';

import './styles/styles.scss';
import cardData from './assets/set-data/combined-set-data.json';

function App() {
  const [cards, setCards] = useState<Card[]>(
    cardData.sort((card1, card2) => card1.cost - card2.cost)
  );
  const [overlay, setOverlay] = useState<Overlay>({
    code: '',
    isVisible: false,
  });
  const [toolTip, setTooltip] = useState<Tooltip>({
    code: '',
    isVisible: false,
    position: {
      x: 0,
      y: 0,
    },
  });
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

  const updateCardOverlay: updateOverlay = (code) => {
    if (window.innerWidth > 661) return;

    setOverlay({ code: code ? code : '', isVisible: !overlay.isVisible });
  };

  const updateTooltip: updateTooltip = (event, code) => {
    if (window.innerWidth <= 660) return;

    const { width, height, left, right, top, bottom } = event.target.getClientRects()[0];
    const position = {
      x: right + width > window.innerWidth ? right - width - 250 : left + width,
      y: bottom + 350 > window.innerHeight ? bottom - height - 300 : top + height / 2,
    };

    if (event.type === 'mouseenter') setTooltip({ code: code, isVisible: true, position });
    if (event.type === 'mouseleave') setTooltip({ code: code, isVisible: false, position });
  };

  return (
    <div className="layout">
      {overlay.isVisible && <CardOverlay code={overlay.code} updateOverlay={updateCardOverlay} />}
      {toolTip.isVisible && <CardToolTip code={toolTip.code} position={toolTip.position} />}
      <div className="layout__lists">
        <CardList
          cards={cards}
          speed="Burst"
          costFilters={costFilters}
          regionFilters={regionFilters}
          updateTooltip={updateTooltip}
          updateOverlay={updateCardOverlay}
        />
        <CardList
          cards={cards}
          speed="Fast"
          costFilters={costFilters}
          regionFilters={regionFilters}
          updateTooltip={updateTooltip}
          updateOverlay={updateCardOverlay}
        />
        <CardList
          cards={cards}
          speed="Slow"
          costFilters={costFilters}
          regionFilters={regionFilters}
          updateTooltip={updateTooltip}
          updateOverlay={updateCardOverlay}
        />
      </div>
      <div className="layout__filters">
        <div className="row">
          <div className="region-filter" onClick={() => toggleRegionFilter('Demacia')}>
            Dm
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Noxus')}>
            Nx
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Freljord')}>
            Fj
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Ionia')}>
            In
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('ShadowIsles')}>
            Si
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Bilgewater')}>
            Bw
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('PiltoverZaun')}>
            Pz
          </div>
          <div className="region-filter" onClick={() => toggleRegionFilter('Targon')}>
            Tg
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
