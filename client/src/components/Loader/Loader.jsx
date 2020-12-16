import React from "react";
import styled from "styled-components";

/* 
inspired by: https://gist.github.com/knowbody/578b35164b69e867ed4913423f6bed30
*/
const StyledSpinner = styled.svg`
  animation: rotate 1s linear infinite;
  position: absolute;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: ${(props) => props.size}px;

  & .path {
    stroke: #584b4f;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes dash {
    0% {
      stroke-dasharray: 1, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dasharray: 90, 150;
      stroke-dashoffset: -120;
    }
  }
`;

const Loader = () => {
  const size = 45;
  return (
    <StyledSpinner size={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        className="path"
        cx={size / 2}
        cy={size / 2}
        r="20"
        fill="none"
        strokeWidth="2"
      />
    </StyledSpinner>
  );
};

export default Loader;