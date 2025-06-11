import React from 'react';
import { FallingText } from './falling-interactive-text'

function OnHover() {
  return (
  <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-4xl h-96">
        <FallingText
          text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
          highlightWords={["React", "Bits", "animated", "components", "simplify"]}
          highlightClass="highlighted"
          trigger="hover"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="2rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    </div>
  );
}


function OnClick() {
  return (
  <div className="h-screen w-screen flex items-center justify-center">
      <div className="w-full max-w-4xl h-96">
        <FallingText
          text={`React Bits is a library of animated and interactive React components designed to streamline UI development and simplify your workflow.`}
          highlightWords={["React", "Bits", "animated", "components", "simplify"]}
          highlightClass="highlighted"
          trigger="click"
          backgroundColor="transparent"
          wireframes={false}
          gravity={0.56}
          fontSize="2rem"
          mouseConstraintStiffness={0.9}
        />
      </div>
    </div>
  );
}

export { OnClick, OnHover }