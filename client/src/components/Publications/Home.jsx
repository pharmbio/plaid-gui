import React from "react";
import styled from "styled-components";
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

const StyledParagraph = styled.p`
  font-size: 17px;
  line-height: 1.7;
  font-weight: 400;
  font-style: normal;
  font-family: ${props => props.theme.fonts.secondary};
  margin: 10px;
`;


const Home = () => {
  return (
    <StyledContainer>
      <StyledInstructionsWrapper>
        <StyledHeading1>Publications</StyledHeading1>

        <StyledHeading2>Citing this Project</StyledHeading2>

        <StyledParagraph>
        The following manuscript can be used to cite this project:
        </StyledParagraph>

        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, J. Carreras Puigvert, and O. Spjuth. <br/>
	      <a href="https://doi.org/10.1016/j.ailsci.2023.100073">Designing Microplate Layouts Using Artificial Intelligence</a><br/>
	      Artificial Intelligence in the Life Sciences, Volume 3, 2023. <br/>
        </StyledParagraph>



        <StyledHeading2>Workshop Presentations</StyledHeading2>
        <StyledParagraph>
        Early versions of this work were presented at:
        </StyledParagraph>

        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, J. Carreras Puigvert, and O. Spjuth. <br/>
	      <a href="https://soafse.files.wordpress.com/2022/10/soak_2022_program-2.pdf">Using Constraint Programming to Design Microplate Layouts</a><br/>
	      SOAK 2022, October 2022<br/>
        </StyledParagraph>

        <StyledParagraph>
        M. A. Francisco Rodr&iacute;guez, and O. Spjuth. <br/>
	      <a href="https://modref.github.io/papers/ModRef2020_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">A Constraint Programming Approach to Microplate Layout Design</a><br/>
	      ModRef 2020, the 19th International Workshop on Constraint Modelling and Reformulation, held at CP 2020, September 2020. <br/>
        [<a href="https://modref.github.io/slides/ModRef2020_Slides_A%20Constraint%20Programming%20Approach%20to%20Microplate%20Layout%20Design.pdf">Slides</a>] [<a href="https://www.youtube.com/watch?v=naddH2TQIjE&ab_channel=CP2020">Video</a>]
        </StyledParagraph>

        


        <StyledHeading2>Publications Using PLAID</StyledHeading2>

        <StyledParagraph>
        E. Forsgren, J. Rietdijk, D. Holmberg, J. Juneblad, B. Migliori, M.M. Johansson, J. Carreras-Puigvert, J. Trygg, G. Lovell, O. Spjuth, and P. Jonsson. <br/>
        <a href="https://doi.org/10.1016/j.ailsci.2025.100152">The time dimension matters: Improving mode of action classification with live-cell imaging</a><br/>
	      Artificial Intelligence in the Life Sciences, Volume 9, 2026.
        </StyledParagraph>

        <StyledParagraph>
        B. Frey, D. Holmberg, P. Bystr&ouml;m, E. Bergman, P. Georgiev, M.M. Johansson, P. Hennig, J. Rietdijk, D. Ros&eacute;n, J. Carreras-Puigvert, and O. Spjuth. <br/>
        <a href="https://doi.org/10.1101/2025.01.15.633042">Single-Cell Morphological Profiling Reveals Insights into Programmed Cell Death</a><br/>
	      bioRxiv, 2025.
        </StyledParagraph>

        <StyledParagraph>
        L. Ju, A. Hellander, O. Spjuth. <br/> 
        <a href="https://doi.org/10.1016/j.ailsci.2024.100098">Federated learning for predicting compound mechanism of action based on image-data from cell painting</a><br/>
        Artificial Intelligence in the Life Sciences, Volume 5, 2024.
        </StyledParagraph>

        <StyledParagraph>
        G. Tian, P. J. Harrison, A. P. Sreenivasan, J. Carreras Puigvert, and O. Spjuth. <br/>
        <a href="https://doi.org/10.1016/j.ailsci.2023.100060">Combining molecular and cell painting image data for mechanism of action prediction</a><br/>
	      Artificial Intelligence in the Life Sciences, Volume 3, 2023.
        </StyledParagraph>
 
        <StyledParagraph>
        P.J. Harrison, A. Gupta, J. Rietdijk, H. Wieslander, J. Carreras-Puigvert, P. Georgiev, C. W&auml;hlby, O. Spjuth, I.M. Sintorn.<br/>
        <a href="https://doi.org/10.1371/journal.pcbi.1011323">Evaluating the utility of brightfield image data for mechanism of action prediction</a><br/>
        PLOS Computational Biology, 2023.
        </StyledParagraph>

        <StyledParagraph>
        J. Rietdijk, T. Aggarwal, P. Georgieva, M. Lapins, J. Carreras Puigvert, and O. Spjuth. <br/>
        <a href="https://www.sciencedirect.com/science/article/pii/S0048969722021519">Morphological profiling of environmental chemicals enables efficient and untargeted exploration of combination effects</a><br/>
        Science of The Total Environment, 832:155058, August 2022.
        </StyledParagraph>

        <br/>
        <br/>
        <StyledParagraph>If you use PLAID in your own research and would like your publications to be added to this list, please <a href="/contact">contact us!</a>.</StyledParagraph>
      </StyledInstructionsWrapper>
      <Footer/>
    </StyledContainer>
  );
};

export default Home;
