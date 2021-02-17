interface Card {
  code: string;
  name: string;
  cost: number;
  region: string;
  spellSpeed: string;
  type: string;
}

interface Tooltip {
  code: string;
  isVisible: boolean;
  position: {
    x: number;
    y: number;
  };
}

interface costFilters {
  [value: string]: boolean;
}

interface regionFilters {
  [region: string]: boolean;
}

type toggleCostFilter = (selectedValue: string) => void;
type toggleRegionFilter = (selectedRegion: string) => void;
type updateTooltip = (Event, code: string) => void;

// type regionFilters = {
// 	demacia: boolean;
// 	noxus: boolean;
// 	freljord: boolean;
// 	ionia: boolean;
// 	shadowisles: boolean;
// 	bilgewater: boolean;
// 	piltoverzaun: boolean;
// };

// type Card = {
// 	cardCode: string;
// 	cost: number;
// 	name: string;
// 	region: string;
// 	spellSpeed: string;
// 	type: string;
// };

// type filterCardList = (type: string, cards: Array<Card>) => Array<Card>;
// type toggleManaFilter = (selectedValue: number) => void;
// type toggleRegionFilter = (selectedRegion: string) => void;
// type checkCost = (cardCost: number, manaFilters: manaFilters) => boolean;
