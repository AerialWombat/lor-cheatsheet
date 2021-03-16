import Whitelist from './Whitelist';

interface Props {
  cards: Card[];
  combineBurstFocus: boolean;
  setCombineBurstFocus: React.Dispatch<React.SetStateAction<boolean>>;
  combineUnitLandmark: boolean;
  setCombineUnitLandmark: React.Dispatch<React.SetStateAction<boolean>>;
  cardsWhitelist: string[];
  setCardsWhitelist: React.Dispatch<React.SetStateAction<string[]>>;
  settingsIsVisible: boolean;
  setSettingsIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const SettingsMenu: React.FC<Props> = ({
  cards,
  combineBurstFocus,
  setCombineBurstFocus,
  combineUnitLandmark,
  setCombineUnitLandmark,
  cardsWhitelist,
  setCardsWhitelist,
  settingsIsVisible,
  setSettingsIsVisible,
}) => {
  return (
    <>
      <div
        className={'settings__overlay' + (settingsIsVisible ? ' settings__overlay--visible' : '')}
        onClick={() => setSettingsIsVisible(!settingsIsVisible)}
      ></div>
      <div className={'settings' + (settingsIsVisible ? ' settings--visible' : '')}>
        <p className="settings__title">LoR Cheatsheet</p>
        <div className="settings__container">
          <div className="general-settings">
            <h2 className="settings__header">General Settings</h2>
            <div className="general-settings__controls">
              <div className="settings__toggle">
                <input
                  type="checkbox"
                  id="combine-burst-focus-toggle"
                  checked={combineBurstFocus}
                  onChange={(event) => setCombineBurstFocus(event.target.checked)}
                />
                <label htmlFor="combine-burst-focus-toggle">Combine burst and focus spells</label>
              </div>
              <div className="settings__toggle">
                <input
                  type="checkbox"
                  id="combine-unit-landmark-toggle"
                  checked={combineUnitLandmark}
                  onChange={(event) => setCombineUnitLandmark(event.target.checked)}
                />
                <label htmlFor="combine-unit-landmark-toggle">Combine units and landmarks</label>
              </div>
            </div>
          </div>
          <Whitelist
            cards={cards}
            cardsWhitelist={cardsWhitelist}
            setCardsWhitelist={setCardsWhitelist}
          />
        </div>

        <button className="settings__btn" onClick={() => setSettingsIsVisible(!settingsIsVisible)}>
          Close
        </button>
      </div>
    </>
  );
};

export default SettingsMenu;
