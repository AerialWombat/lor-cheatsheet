interface Props {
  code: string;
  updateOverlay: updateOverlay;
}

const CardToolTip: React.FC<Props> = ({ code, updateOverlay }) => {
  const fullCardImageUrl = `${process.env.PUBLIC_URL}/images/card-art/${code}.png`;

  return (
    <div className="card-overlay" onClick={() => updateOverlay()}>
      <img src={fullCardImageUrl} alt={`Art for card ${code}`} />
    </div>
  );
};

export default CardToolTip;
