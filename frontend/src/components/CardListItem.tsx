import { useEffect, useState, useRef } from 'react';

interface Props {
  card: Card;
  updateTooltip: updateTooltip;
  updateOverlay: updateOverlay;
}

const regionColors: any = {
  Demacia: '191, 176, 131',
  Noxus: '194, 74, 67',
  Freljord: '90, 184, 218',
  Ionia: '220, 157, 178',
  ShadowIsles: '9, 162, 134',
  Bilgewater: '161, 73, 50',
  PiltoverZaun: '234, 173, 91',
  Targon: '83, 222, 217',
};

const CardListItem: React.FC<Props> = ({ card, updateTooltip, updateOverlay }) => {
  const { code, name, cost, region } = card;

  const [backgroundStyle, setBackgroundStyle] = useState({ background: '#333' });
  const [backgroundImageUrl] = useState<string>(
    `${process.env.PUBLIC_URL}/images/full-art/${code}-full.png`
  );
  const cardListItem = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        if (entries[0].isIntersecting) {
          setBackgroundStyle({
            background: `linear-gradient(to right,
                rgba(${regionColors[region]},1),
                rgba(${regionColors[region]},1) 60%,
                rgba(${regionColors[region]},0) 75%),
                url(${backgroundImageUrl}) no-repeat 125% 30%/55%`,
          });

          if (cardListItem && cardListItem.current) {
            imageObserver.unobserve(cardListItem.current);
          }
        }
      });

      if (cardListItem && cardListItem.current) {
        imageObserver.observe(cardListItem.current);
      }
    }
  }, []);

  return (
    <div
      style={backgroundStyle}
      className={`card-list-item`}
      data-code={code}
      onClick={() => updateOverlay(code)}
      onMouseEnter={(event) => updateTooltip(event, code)}
      onMouseLeave={(event) => updateTooltip(event, code)}
      ref={cardListItem}
    >
      <span className="card-list-item__cost">{cost}</span>
      <span className="card-list-item__name">{name}</span>
    </div>
  );
};

export default CardListItem;
