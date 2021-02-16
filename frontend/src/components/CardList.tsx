import CardListItem from './CardListItem';

interface Props {
  cards: Card[];
  speed: 'Burst' | 'Fast' | 'Slow';
  costFilters: costFilters;
}

const CardList: React.FC<Props> = ({ cards, speed, costFilters }) => {
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
    });

  return (
    <div className="card-list">
      <h1 className="card-list__header">{speed}</h1>
      <ul className="card-list__cards">
        {filteredCards
          // .sort((card1, card2) => card1.cost - card2.cost)
          .map((card) => {
            return <CardListItem card={card} key={card.code} />;
          })}
      </ul>
    </div>
  );
};

export default CardList;
