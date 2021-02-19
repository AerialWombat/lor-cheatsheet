interface Props {
  type: 'cost' | 'region';
  value: string;
  filters: costFilters | regionFilters;
  clickHandler: toggleCostFilter | toggleRegionFilter;
}

const FilterButton: React.FC<Props> = ({ type, value, filters, clickHandler }) => {
  const regionIconImageUrl = `${
    process.env.PUBLIC_URL
  }/images/icons/icon-${value.toLowerCase()}.png`;

  console.log('ICON URL:', regionIconImageUrl);

  return (
    <div
      className={`${type}-filter` + (filters[value] ? ` ${type}-filter--active` : '')}
      onClick={(event) => clickHandler(value)}
    >
      {type === 'cost' ? (
        value
      ) : (
        <img
          loading="lazy"
          className="region-filter__icon"
          src={regionIconImageUrl}
          alt={`${value} icon`}
        />
      )}
    </div>
  );
};

export default FilterButton;
