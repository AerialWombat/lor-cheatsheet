import { useEffect, useRef } from 'react';
import CardListItem from './CardListItem';

interface Props {
  cards: Card[];
  speed: string;
  costFilters: costFilters;
  regionFilters: regionFilters;
  updateTooltip: updateTooltip;
  updateOverlay: updateOverlay;
  handleMobileSwipe: any;
}

const CardList: React.FC<Props> = ({
  cards,
  speed,
  costFilters,
  regionFilters,
  updateTooltip,
  updateOverlay,
  handleMobileSwipe,
}) => {
  const cardList = useRef<HTMLDivElement>(null);
  const filteredCards = cards
    .filter((card) => card.spellSpeed === speed) // Filter based on speed
    .filter((card) => {
      // Filter based on cost
      if (Object.values(costFilters).every((filter) => filter === false)) {
        return card;
      } else if (costFilters['-1'] && costFilters['7+']) {
        return card.cost <= 1 || costFilters[card.cost.toString()] || card.cost >= 7;
      } else if (costFilters['-1']) {
        return card.cost <= 1 || costFilters[card.cost.toString()];
      } else if (costFilters['7+']) {
        return card.cost >= 7 || costFilters[card.cost.toString()];
      } else {
        return costFilters[card.cost.toString()];
      }
    })
    .filter((card) => {
      // Filter based on region
      if (Object.values(regionFilters).every((filter) => filter === false)) {
        return card;
      } else {
        return regionFilters[card.region];
      }
    });

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const listObserver = new IntersectionObserver(
        (entries, observer) => {
          if (entries[0].isIntersecting) {
            if (cardList && cardList.current && cardList.current.parentNode) {
              const index = Array.from(cardList.current.parentNode.children).indexOf(
                cardList.current
              );
              handleMobileSwipe(index);
            }
          }
        },
        { rootMargin: '-50%' }
      );
      if (cardList && cardList.current) {
        listObserver.observe(cardList.current);
      }
    }
  }, []);

  return (
    <div className="card-list" ref={cardList}>
      <h1 className="card-list__header">{speed}</h1>
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
};

export default CardList;
