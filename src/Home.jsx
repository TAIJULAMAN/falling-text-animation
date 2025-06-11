import React from 'react';
import { FallingText } from './falling-interactive-text'

function OnHover() {
          return (
                    <div className="">
                              <div className="w-full h-[calc(100dvh-4rem)]">
                                        <FallingText
                                                  text={`an animated and interactive React components designed by Aman to streamline UI development and simplify your workflow.`}
                                                  highlightWords={['animated', 'Aman']}
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
                    <div className="">
                              <div className="w-full h-[calc(100dvh-4rem)]">
                                        <FallingText
                                                  text={`an animated and interactive React components designed by Aman to streamline UI development and simplify your workflow.`}
                                                  highlightWords={['animated', 'Aman']}
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