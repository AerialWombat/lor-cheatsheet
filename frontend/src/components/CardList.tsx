import CardListItem from './CardListItem';

interface Props {
  cards: Card[];
  speed: 'Burst' | 'Fast' | 'Slow';
  costFilters: costFilters;
  regionFilters: regionFilters;
  updateTooltip: updateTooltip;
}

const CardList: React.FC<Props> = ({ cards, speed, costFilters, regionFilters, updateTooltip }) => {
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

  return (
    <div className="card-list">
      <h1 className="card-list__header">{speed}</h1>
      <ul className="card-list__cards">
        {filteredCards.length > 0 ? (
          filteredCards.map((card) => {
            return <CardListItem card={card} key={card.code} updateTooltip={updateTooltip} />;
          })
        ) : (
          <div className="card-list__no-cards">No matching cards.</div>
        )}
      </ul>
    </div>
  );
};

export default CardList;
