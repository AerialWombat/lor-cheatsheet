interface Props {
  type: 'cost' | 'region';
  value: string;
  filters: costFilters | regionFilters;
  clickHandler: toggleCostFilter | toggleRegionFilter;
}

const FilterButton: React.FC<Props> = ({ type, value, filters, clickHandler }) => {
  return (
    <div
      className={`${type}-filter` + (filters[value] ? ` ${type}-filter--active` : '')}
      onClick={(event) => clickHandler(value)}
    >
      {value}
    </div>
  );
};

export default FilterButton;
