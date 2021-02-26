import Whitelist from './Whitelist';

interface Props {
  cards: Card[];
  cardsWhitelist: string[];
  setCardsWhitelist: React.Dispatch<React.SetStateAction<string[]>>;
  settingsIsVisible: boolean;
  setSettingsIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenu: React.FC<Props> = ({
  cards,
  cardsWhitelist,
  setCardsWhitelist,
  settingsIsVisible,
  setSettingsIsVisible,
}) => {
  return (
    <>
      <div
        className={
          'settings-menu__overlay' + (settingsIsVisible ? ' settings-menu__overlay--visible' : '')
        }
        onClick={() => setSettingsIsVisible(!settingsIsVisible)}
      ></div>
      <div className={'settings-menu' + (settingsIsVisible ? ' settings-menu--visible' : '')}>
        <p className="settings-menu__title">LoR Cheatsheet</p>
        <Whitelist
          cards={cards}
          cardsWhitelist={cardsWhitelist}
          setCardsWhitelist={setCardsWhitelist}
        />
        <button
          className="settings-menu__btn"
          onClick={() => setSettingsIsVisible(!settingsIsVisible)}
        >
          Close
        </button>
      </div>
    </>
  );
};

export default SettingsMenu;
