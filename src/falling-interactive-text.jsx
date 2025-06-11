import React, { useRef, useState, useEffect } from 'react';
import * as Matter from 'matter-js';

const FallingText = ({
  text = '',
  highlightWords = [],
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.56,
  mouseConstraintStiffness = 0.9,
  fontSize = '2rem'
}) => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const [effectStarted, setEffectStarted] = useState(false);

  useEffect(() => {
    if (!textRef.current) return;
    const words = text.split(' ');

    const newHTML = words
      .map(word => {
        const isHighlighted = highlightWords.some(hw => word.startsWith(hw));
        return `<span class="inline-block mx-[2px] select-none ${
          isHighlighted ? 'text-red-500 font-bold' : ''
        }">${word}</span>`;
      })
      .join(' ');

    textRef.current.innerHTML = newHTML;
  }, [text, highlightWords]);

  useEffect(() => {
    if (trigger === 'hover') {
      setEffectStarted(true);
    }
  }, [trigger]);

  useEffect(() => {
    if (!effectStarted) return;

    const { Engine, Render, World, Bodies, Runner, Mouse, MouseConstraint } = Matter;

    if (!containerRef.current || !canvasContainerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;

    if (width <= 0 || height <= 0) return;

    const engine = Engine.create();
    engine.world.gravity.y = gravity;

    const render = Render.create({
      element: canvasContainerRef.current,
      engine,
      options: {
        width,
        height,
        background: backgroundColor,
        wireframes,
      },
    });

    const boundaryOptions = {
      isStatic: true,
      render: { fillStyle: 'transparent' },
    };

    // Create floor with slight bounce
    const floor = Bodies.rectangle(
      width / 2,
      height + 25,
      width,
      50,
      {
        ...boundaryOptions,
        restitution: 0.2 // Slight bounce
      }
    );

    if (!textRef.current) return;
    const wordSpans = textRef.current.querySelectorAll('span');
    const wordBodies = Array.from(wordSpans).map((elem, index) => {
      const rect = elem.getBoundingClientRect();

      const x = rect.left - containerRect.left + rect.width / 2;
      const y = rect.top - containerRect.top + rect.height / 2;

      // Add random initial velocity and rotation
      const initialVelocity = {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 1
      };

      const body = Bodies.rectangle(x, y, rect.width, rect.height, {
        render: { fillStyle: 'transparent' },
        restitution: 0.8 + Math.random() * 0.2, // Random bounce
        frictionAir: 0.01,
        friction: 0.2,
        density: 0.004 + Math.random() * 0.002, // Random density
        angle: Math.random() * Math.PI * 2, // Random initial rotation
        angularVelocity: (Math.random() - 0.5) * 0.2 // Random angular velocity
      });

      // Add initial velocity
      Matter.Body.setVelocity(body, initialVelocity);

      // Add random color variation for highlighted words
      if (highlightWords.some(hw => elem.textContent.startsWith(hw))) {
        const hue = Math.random() * 360;
        elem.style.color = `hsl(${hue}, 100%, 50%)`;
      }

      return { elem, body };
    });

    wordBodies.forEach(({ elem, body }) => {
      elem.style.position = 'absolute';
      elem.style.left = `${body.position.x - body.bounds.max.x + body.bounds.min.x / 2}px`;
      elem.style.top = `${body.position.y - body.bounds.max.y + body.bounds.min.y / 2}px`;
      elem.style.transform = 'none';
    });

    const mouse = Mouse.create(containerRef.current);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: { visible: false },
        length: 0.1, // Make mouse interaction more responsive
        damping: 0.2 // Add some damping to mouse interaction
      },
    });
    render.mouse = mouse;

    World.add(engine.world, [
      floor,
      mouseConstraint,
      ...wordBodies.map(wb => wb.body),
    ]);

    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);

    const updateLoop = () => {
      wordBodies.forEach(({ body, elem }) => {
        const { x, y } = body.position;
        
        // Add some random wiggle effect
        const wiggle = Math.sin(Date.now() / 500 + body.position.x / 100) * 2;
        
        elem.style.left = `${x + wiggle}px`;
        elem.style.top = `${y}px`;
        
        // Add smooth rotation with some variation
        const rotation = body.angle + (Math.sin(Date.now() / 1000 + body.position.x / 50) * 0.1);
        elem.style.transform = `translate(-50%, -50%) rotate(${rotation}rad)`;
      });
      
      // Add some random force to make the words more dynamic
      wordBodies.forEach(({ body }, index) => {
        if (Math.random() < 0.05) { // 5% chance per frame
          Matter.Body.applyForce(body, {
            x: body.position.x,
            y: body.position.y
          }, {
            x: (Math.random() - 0.5) * 0.005,
            y: (Math.random() - 0.5) * 0.005
          });
        }
      });
      
      requestAnimationFrame(updateLoop);
    };
    updateLoop();

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas && canvasContainerRef.current) {
        canvasContainerRef.current.removeChild(render.canvas);
      }
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    effectStarted,
    gravity,
    wireframes,
    backgroundColor,
    mouseConstraintStiffness,
  ]);

  const handleTrigger = () => {
    if (!effectStarted && (trigger === 'click' || trigger === 'hover')) {
      setEffectStarted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full cursor-pointer overflow-hidden"
      onClick={trigger === 'click' ? handleTrigger : undefined}
      onMouseOver={trigger === 'hover' ? handleTrigger : undefined}
    >
      <div
        ref={textRef}
        style={{
          fontSize,
          lineHeight: 1.4,
          transition: 'all 0.3s ease',
          opacity: effectStarted ? 1 : 0
        }}
      />
      <div className="absolute top-0 left-0" ref={canvasContainerRef} />
    </div>
  );
};

export { FallingText };