import { useState } from 'react';

interface Props {
  cards: Card[];
  cardsWhitelist: string[];
  setCardsWhitelist: React.Dispatch<React.SetStateAction<string[]>>;
}

const Whitelist: React.FC<Props> = ({ cards, cardsWhitelist, setCardsWhitelist }) => {
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearchInput = (searchValue: string) => {
    setSearchValue(searchValue);
  };

  const handleCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cardCode = event.target.value;

    if (event.target.checked) {
      setCardsWhitelist([...cardsWhitelist, cardCode]);
    } else {
      const index = cardsWhitelist.indexOf(cardCode);
      if (index > -1) setCardsWhitelist(cardsWhitelist.filter((code) => code !== cardCode));
    }
  };

  const results: Card[] = !searchValue
    ? cards.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        } else if (a.name < b.name) {
          return -1;
        } else {
          return 0;
        }
      })
    : cards.filter((card) => {
        return card.name.toLowerCase().includes(searchValue.toLowerCase());
      });

  return (
    <div className="whitelist">
      <h2 className="whitelist__header">Whitelisted Cards</h2>
      <input
        className="whitelist__search"
        type="text"
        value={searchValue}
        placeholder="Search for cards"
        onChange={(e) => handleSearchInput(e.target.value)}
      />
      <ul className="whitelist__list">
        {results.map((card) => {
          return (
            <div className={'whitelist__toggle'} key={card.code}>
              <input
                type="checkbox"
                id={`${card.code}-toggle`}
                value={card.code}
                checked={cardsWhitelist.includes(card.code)}
                onChange={(event) => handleCheckbox(event)}
              />
              <label htmlFor={`${card.code}-toggle`}>{card.name}</label>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Whitelist;
