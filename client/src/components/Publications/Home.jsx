import React from "react";
import styled from "styled-components";
import HighlightedParahraph from "./HighlightedParagraph.jsx";
import Footer from '../../footer'

const StyledContainer = styled.div`
  height: 100vh;
  overflow-y: scroll;
`;
const StyledInstructionsWrapper = styled.main`
  margin-top: 2rem;
  margin-right: 5rem;
  margin-left: 5rem;
  margin-bottom: 7.5rem;
  display: flex;

  flex-direction: column;
  color: ${props => props.theme.colors.text};
`;

const StyledHeading1 = styled.h1`
  font-size: 60px;
  line-height: 65px;
  font-weight: 700;
  margin: 10px;
`;

const StyledHeading2 = styled.h2`
  font-size: 35px;
  line-height: 1.2;
  font-weight: 400;
  margin: 10px;
  margin-top: 50px;
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
  font-family: ${props => props.theme.fonts.secondary};
  margin: 10px;
`;

const StyledCenteredParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 10px;
  text-align: center;
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


const StyledScaledImage = styled.img.attrs((props) => ({
  src: props.src,
  alt: props.alt,
  width: props.width,
  height: props.height,
}))`
  display: inline-block;
  vertical-align: top;
`;


const Home = () => {
  return (
    <StyledContainer>
      <StyledInstructionsWrapper>
        <StyledHeading1>Publications</StyledHeading1>

        <StyledHeading2>Citation</StyledHeading2>
        <StyledParagraph>
        Our bioRxiv preprint can be used to cite this project:
        </StyledParagraph>

        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, J. Carreras Puigvert, and O. Spjuth. Designing Microplate Layouts Using Artificial Intelligence April, 2022. DOI: <a href="https://doi.org/10.1101/2022.03.31.486595">10.1101/2022.03.31.486595</a>
        </StyledParagraph>

        <StyledHeading2>Other Publications</StyledHeading2>
        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, and O. Spjuth. A Constraint Programming Approach to Microplate Layout Design In: J. Espasa and N. Dang (editors), Proceedings of ModRef 2020, the 19th International Workshop on Constraint Modelling and Reformulation, held at CP 2020, September 2020. 
        </StyledParagraph>

        <StyledParagraph>
        [<a href="https://modref.github.io/papers/ModRef2020_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">PDF</a>] [<a href="https://modref.github.io/slides/ModRef2020_Slides_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">Slides</a>] [<a href="https://www.youtube.com/watch?v=naddH2TQIjE&ab_channel=CP2020">Video</a>]
        </StyledParagraph>
        

        <StyledHeading2>Publications Using PLAID</StyledHeading2>
        <StyledParagraph>
        A. Gupta, P. J. Harrison, H. Wieslander, J. Rietdijk, J. Carreras Puigvert, P. Georgiev, C. Wählby, O. Spjuth, and I-M Sintorn. 
        <a href="https://www.biorxiv.org/content/10.1101/2022.10.12.511869v1">Is brightfield all you need for mechanism of action prediction?</a>, October 2022.
        </StyledParagraph>

        <StyledParagraph>
        G. Tian, P. J. Harrison, A. P. Sreenivasan, J. Carreras Puigvert, and O. Spjuth. 
        <a href="https://www.biorxiv.org/content/10.1101/2022.10.04.510834v1">Combining molecular and cell painting image data for mechanism of action prediction</a>, October 2022.
        </StyledParagraph>

        <StyledParagraph>
        J. Rietdijk, T. Aggarwal, P. Georgieva, M. Lapins, J. Carreras Puigvert, and O. Spjuth. 
        <a href="https://www.sciencedirect.com/science/article/pii/S0048969722021519">Morphological profiling of environmental chemicals enables efficient and untargeted exploration of combination effects</a>.
        Science of The Total Environment, 832:155058, August 2022.
        </StyledParagraph>

        <br/>
        <StyledParagraph>If you use PLAID in your own research and would like your publications to be added to this list, please <a href="/contact">contact us!</a>.</StyledParagraph>
      </StyledInstructionsWrapper>
      <Footer/>
    </StyledContainer>
  );
};

export default Home;
