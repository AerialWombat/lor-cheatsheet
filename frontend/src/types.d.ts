interface Card {
  code: string;
  name: string;
  cost: number;
  mainRegion: string;
  regions: string[];
  spellSpeed: string;
  type: string;
  keywords: string[];
}

interface CardOverlay {
  code: string;
  isVisible: boolean;
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
type updateOverlay = (code?: string) => void;
type handleMobileSwipe = (newSwipeIndex: number) => void;
