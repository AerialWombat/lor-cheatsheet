import { useEffect, useRef, useMemo } from 'react';
import CardListItem from './CardListItem';

interface Props {
  cards: Card[];
  category: string;
  cardsWhitelist: string[];
  costFilters: costFilters;
  regionFilters: regionFilters;
  combineBurstFocus: boolean;
  combineUnitLandmark: boolean;
  updateTooltip: updateTooltip;
  updateOverlay: updateOverlay;
  setCurrentSwipeIndex: React.Dispatch<React.SetStateAction<number>>;
}

const CardList: React.FC<Props> = ({
  cards,
  category,
  cardsWhitelist,
  costFilters,
  regionFilters,
  combineBurstFocus,
  combineUnitLandmark,
  updateTooltip,
  updateOverlay,
  setCurrentSwipeIndex,
}) => {
  const cardList = useRef<HTMLDivElement>(null);
  const filteredCards = useMemo(() => {
    return cards
      .filter((card) => cardsWhitelist.includes(card.code))
      .filter((card) => {
        // Filter card based on category
        if (category === 'Fast' || category === 'Slow') {
          return card.spellSpeed === category;
        } else if (category === 'Burst') {
          if (combineBurstFocus)
            return card.spellSpeed === category || card.keywords.includes('Focus');

          return card.spellSpeed === category && !card.keywords.includes('Focus');
        } else if (category === 'Focus') {
          if (combineBurstFocus) return {};

          return card.keywords.includes('Focus');
        } else if (category === 'Unit') {
          if (combineUnitLandmark) return card.type === category || card.type === 'Landmark';

          return card.type === category;
        } else if (category === 'Landmark') {
          if (combineUnitLandmark) return {};

          return card.type === 'Landmark';
        } else {
          return false;
        }
      })
      .filter((card) => {
        // Filter based on region
        if (Object.values(regionFilters).every((filter) => filter === false)) {
          return card;
        } else {
          if (regionFilters[card.regions[0]] || regionFilters[card.regions[1]]) return true;
        }
      })
      .filter((card) => {
        // Filter based on cost
        if (Object.values(costFilters).every((filter) => filter === false)) {
          return card;
        } else if (costFilters['1-'] && costFilters['7+']) {
          return card.cost <= 1 || costFilters[card.cost.toString()] || card.cost >= 7;
        } else if (costFilters['1-']) {
          return card.cost <= 1 || costFilters[card.cost.toString()];
        } else if (costFilters['7+']) {
          return card.cost >= 7 || costFilters[card.cost.toString()];
        } else {
          return costFilters[card.cost.toString()];
        }
      })
      .sort((card1, card2) => card1.cost - card2.cost);
  }, [
    cards,
    category,
    cardsWhitelist,
    costFilters,
    regionFilters,
    combineBurstFocus,
    combineUnitLandmark,
  ]);

  // Intersection observer to check for moving between lists on mobile
  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const listObserver = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            if (cardList && cardList.current && cardList.current.parentNode) {
              const index = Array.from(cardList.current.parentNode.children).indexOf(
                cardList.current
              );
              setCurrentSwipeIndex(index);
            }
          }
        },
        { rootMargin: '-50%' }
      );
      if (cardList && cardList.current) {
        listObserver.observe(cardList.current);
      }
    }
  }, [setCurrentSwipeIndex]);

  if (
    (combineBurstFocus && category === 'Focus') ||
    (combineUnitLandmark && category === 'Landmark')
  ) {
    return <></>;
  } else {
    return (
      <div className="card-list" ref={cardList}>
        <h1 className="card-list__header">{category}</h1>
        <ul className="card-list__cards">
          {filteredCards.length > 0 ? (
            filteredCards.map((card) => {
              return (
                <CardListItem
                  card={card}
                  key={card.code}
                  updateTooltip={updateTooltip}
                  updateOverlay={updateOverlay}
                />
              );
            })
          ) : (
            <div className="card-list__no-cards">No matching cards.</div>
          )}
        </ul>
      </div>
    );
  }
};

export default CardList;
