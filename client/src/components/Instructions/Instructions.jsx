import React from "react";
import styled from "styled-components";
import HighlightedParahraph from "./HighlightedParagraph.jsx";
import img1 from "./../../assets/img1.png";

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;
const StyledInstructionsWrapper = styled.main`
  margin-top: 7.5rem;
  margin-right: 15rem;
  margin-left: 5rem;
  margin-bottom: 7.5rem;
  display: flex;

  flex-direction: column;
  color: #000;
`;

const StyledHeading1 = styled.h1`
  font-size: 60px;
  line-height: 65px;
  font-weight: 700;
  margin: 10px;
  background-color: #18d176;
  filter: brightness(150%);
`;

const StyledHeading2 = styled.h2`
  font-size: 35px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
`;

const StyledHeading3 = styled.h3`
  font-size: 27px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
`;

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: "Lato", sans-serif;
  margin: 10px;
`;

const StyledImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
}))`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  height: 100%;
`;

const Instructions = () => {
  return (
    <StyledContainer>
      <StyledInstructionsWrapper>
        <StyledHeading1>Tutorial</StyledHeading1>
        <StyledHeading2>How to Read This Guide</StyledHeading2>
        <StyledParagraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          egestas imperdiet nibh. Cras vehicula molestie mi, ut vestibulum odio
          varius quis. Sed mattis faucibus laoreet. Phasellus tellus neque,
          hendrerit vel hendrerit vitae, blandit et magna. Etiam a urna ex. Orci
          varius natoque penatibus et magnis dis parturient montes, nascetur
          ridiculus mus. Phasellus a vulputate ex, ut volutpat leo. Vestibulum
          et interdum massa. Aenean hendrerit purus a dolor lobortis varius. In
          scelerisque elit libero, eget cursus metus bibendum in. Suspendisse
          rutrum finibus tortor sed accumsan. Aenean congue vehicula purus, vel
          venenatis felis vulputate quis. Pellentesque id sollicitudin sapien,
          vitae scelerisque lacus. Proin rutrum, mauris sed varius bibendum,
          enim tellus tincidunt lacus, non aliquet nunc risus egestas libero.{" "}
        </StyledParagraph>
        <HighlightedParahraph title={"Note"} type={"Normal"}>
          <StyledParagraph>
            Nullam imperdiet blandit eleifend. Mauris efficitur fermentum sem,
            non malesuada sem gravida in. Donec ac turpis ut arcu auctor
            luctus.In fringilla id purus sit amet eleifend. Morbi pretium magna
            sem, in pellentesque velit fringilla sit amet. Nullam vehicula velit
            id faucibus mattis
          </StyledParagraph>
        </HighlightedParahraph>
        <HighlightedParahraph title={"Warning"} type={"Warning"}>
          <StyledParagraph>
            Nullam imperdiet blandit eleifend. Mauris efficitur fermentum sem,
            non malesuada sem gravida in. Donec ac turpis ut arcu auctor
            luctus.In fringilla id purus sit amet eleifend. Morbi pretium magna
            sem, in pellentesque velit fringilla sit amet. Nullam vehicula velit
            id faucibus mattis
          </StyledParagraph>
        </HighlightedParahraph>
        <StyledHeading3>This is an image</StyledHeading3>
        <StyledParagraph>
          <StyledImage
            src={img1}
            alt="A microplate layout generated by Plaid "
          />
        </StyledParagraph>
      </StyledInstructionsWrapper>
    </StyledContainer>
  );
};

export default Instructions;
