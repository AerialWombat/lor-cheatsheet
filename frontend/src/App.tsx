import { useEffect, useRef, useState } from 'react';
import CardList from './components/CardList';
import CardOverlay from './components/CardOverlay';
import CardToolTip from './components/CardToolTip';
import FilterButton from './components/FilterButton';
import SettingsMenu from './components/SettingsMenu';
import SwipeIndicators from './components/SwipeIndicators';

import './styles/styles.scss';
import cardData from './assets/set-data/combined-set-data.json';
import { defaultWhitelist } from './assets/default-whitelist';

function usePrevious(value: number) {
  const ref = useRef<number>();
  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current as number;
}

function useStickyState<T>(defaultValue: T, key: string) {
  const [value, setValue] = useState(() => {
    const stickyValue = window.localStorage.getItem(key);

    return stickyValue !== null ? JSON.parse(stickyValue) : defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function App() {
  const [cards] = useState<Card[]>(cardData.sort((card1, card2) => card1.cost - card2.cost));
  const [categories] = useState<string[]>(['Burst', 'Fast', 'Slow', 'Unit']);
  const [settingsIsVisible, setSettingsIsVisible] = useState<boolean>(false);
  const [cardOverlay, setCardOverlay] = useState<CardOverlay>({
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
  const [cardsWhitelist, setCardsWhitelist] = useStickyState(defaultWhitelist, 'whitelist');
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
    'Shadow Isles': false,
    Bilgewater: false,
    'Piltover & Zaun': false,
    Targon: false,
  });
  const [currentSwipeIndex, setCurrentSwipeIndex] = useState<number>(0);
  const prevSwipeIndex: number = usePrevious(currentSwipeIndex);

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
    if (window.innerWidth > 661) return; // Only use overlay for mobile views

    setCardOverlay({ code: code ? code : '', isVisible: !cardOverlay.isVisible });
  };

  const updateTooltip: updateTooltip = (event, code) => {
    if (window.innerWidth <= 660) return; // Only use tooltips for larger views

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
      {cardOverlay.isVisible && (
        <CardOverlay code={cardOverlay.code} updateOverlay={updateCardOverlay} />
      )}
      {toolTip.isVisible && <CardToolTip code={toolTip.code} position={toolTip.position} />}

      <div className="settings-toggle" onClick={() => setSettingsIsVisible(!settingsIsVisible)}>
        Whitelist
      </div>
      <SettingsMenu
        cards={cards}
        cardsWhitelist={cardsWhitelist}
        setCardsWhitelist={setCardsWhitelist}
        settingsIsVisible={settingsIsVisible}
        setSettingsIsVisible={setSettingsIsVisible}
      />
      <SwipeIndicators
        currentSwipeIndex={currentSwipeIndex}
        prevSwipeIndex={prevSwipeIndex}
        maxSwipeIndexes={categories.length}
      />

      <div className="layout__lists">
        {categories.map((category) => {
          return (
            <CardList
              key={category}
              cards={cards}
              category={category}
              cardsWhitelist={cardsWhitelist}
              costFilters={costFilters}
              regionFilters={regionFilters}
              updateTooltip={updateTooltip}
              updateOverlay={updateCardOverlay}
              setCurrentSwipeIndex={setCurrentSwipeIndex}
            />
          );
        })}
      </div>
      <div className="layout__filters">
        <div className="filters__row">
          <FilterButton
            type="region"
            value="Demacia"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Noxus"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Freljord"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Ionia"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Shadow Isles"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Bilgewater"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Piltover & Zaun"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
          <FilterButton
            type="region"
            value="Targon"
            filters={regionFilters}
            clickHandler={toggleRegionFilter}
          />
        </div>
        <div className="filters__row">
          <FilterButton
            type="cost"
            value="-1"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="2"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="3"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="4"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="5"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="6"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
          <FilterButton
            type="cost"
            value="7+"
            filters={costFilters}
            clickHandler={toggleCostFilter}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
