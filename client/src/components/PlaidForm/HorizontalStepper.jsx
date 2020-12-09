import styled from "styled-components";
import { React } from 'react';
import { ReactComponent as Checkmark } from '../../assets/icons/check-solid.svg';

const HoriztonalStepperContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 60px;
  margin: 20px;
`;
const HoriztonalStepperProgress = styled.li`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding: 0 80px;
  height: 100%;
  font-size: 12px;
`;

const HoriztonalStepperProgressIcon = styled.div`
  position: relative; 
  height: 20px;
  width: 20px;
  background-color: ${(props) => props.current ? '#23A' : '#888'};
  border-radius: 100%;
  transition: all .3s ease-out;
  &:after {
    content: '';
    position: absolute;
    background-color: ${(props) => props.finished ? '#23A' : '#888'};
    height: 2px;
    width: 140px;
    top: 9px;
    left: 20px;
    display: ${(props) => props.isLast ? 'none' : 'inline-block'}
  }
`;
// TODO: Solve svg animations using styled components
const HoriztonalStepperCheckmark = styled.svg`
  stroke-dasharray: ${(props) => props.length};
  stroke-dashoffset: ${(props) => props.length};
  animation: dash 5s linear forwards;
  @keyframes dash {
    to {
        stroke-dashoffset: 0;
    }
  }
`;

const HoriztonalStepper = ({ currentStep, steps = [], labels = [] }) => {

    return (
        <HoriztonalStepperContainer>

            {steps.map((child, index) => (
                <HoriztonalStepperProgress >
                    <HoriztonalStepperProgressIcon
                        finished={currentStep > index}
                        current={currentStep >= index}
                        isLast={index === steps.length - 1} >
                        {currentStep > index ? <Checkmark length={30} /> : null}
                    </HoriztonalStepperProgressIcon >
                    {child.props.label}
                </HoriztonalStepperProgress>
            ))}
        </HoriztonalStepperContainer>
    );
}
export default HoriztonalStepper