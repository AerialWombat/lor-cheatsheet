interface Props {
  code: string;
  position: {
    x: number;
    y: number;
  };
}

const CardToolTip: React.FC<Props> = ({ code, position }) => {
  const fullCardImageUrl = `${process.env.PUBLIC_URL}/images/card-art/${code}.png`;

  const positionStyles = {
    top: `${position.y}px`,
    left: `${position.x}px`,
  };

  return (
    <div style={positionStyles} className="card-tooltip">
      <img src={fullCardImageUrl} alt="Art for card ${code}" />
    </div>
  );
};

export default CardToolTip;
