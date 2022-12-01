import React from "react";
import styled from "styled-components";
import essence from "./assets/logos/essence_rgb.jpg";
import haste from "./assets/logos/haste-w200.png";
import pharmbio from "./assets/logos/pharmbio-logo.png";
import scilife from "./assets/logos/scilife-logo.jpg";
import uu from "./assets/logos/uu_logo.png";

const StyledFooter = styled.footer`
    padding: 0 1rem 2rem;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledScaledImage = styled.img.attrs((props) => ({
    src: props.src,
    alt: props.alt,
    width: props.width,
    height: props.height,
  }))`
    display: inline-block;
    vertical-align: top;
    padding: 0px 20px;
  `;

const Footer = () => (
  <StyledFooter>
    <StyledScaledImage
            src={pharmbio}
            alt="Pharmbio"
            height="90%"
          />

    <StyledScaledImage
            src={essence}
            alt="eSSENCE"
            height="100%"
          />
    
    <StyledScaledImage
            src={haste}
            alt="HASTE"
            height="100%"
          />

    <StyledScaledImage
            src={scilife}
            alt="scilife"
            height="100%"
          />

    <StyledScaledImage
            src={uu}
            alt="Uppsala University"
            height="100%"
          />
  </StyledFooter>
);

export default Footer; 