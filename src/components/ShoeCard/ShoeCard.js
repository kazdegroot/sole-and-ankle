import React from 'react';
import styled, { css } from 'styled-components/macro';

import { COLORS, WEIGHTS } from '../../constants';
import { formatPrice, pluralize, isNewShoe } from '../../utils';
import Spacer from '../Spacer';

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant === 'on-sale' ? <VariantLabel color="primary">Sale</VariantLabel> : null}
          {variant === 'new-release' ? <VariantLabel color="secondary">Just released!</VariantLabel> : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price $onSale={variant === 'on-sale'}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize('Color', numOfColors)}</ColorInfo>
          {variant === 'on-sale' ? <SalePrice>{formatPrice(salePrice)}</SalePrice> : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const VariantLabel = styled.div`
  position: absolute;
  right: -4px;
  top: 14px;

  border-radius: 2px;
  color: ${COLORS.white};
  background-color: ${p => COLORS[p.color]};
  font-weight: 700;
  font-size: 14px;
  padding: 6px 11px;
`;

const Link = styled.a`
  text-decoration: none;
  color: inherit;
  min-width: 300px;
  max-width: 632px;
  flex: 1;
`;

const Wrapper = styled.article`

`;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  min-width: 100%;
  line-height: 0;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  margin-left: auto;
  ${p => p.$onSale && css`
    text-decoration: line-through;
    color: ${COLORS.gray[700]};
  `}
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled(Price)`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

export default ShoeCard;
