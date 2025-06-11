import React, { useRef, useEffect } from 'react';
import * as Matter from 'matter-js';

const FallingText = ({
  text,
  highlightWords = [],
  highlightClass = 'highlighted',
  trigger = 'hover',
  backgroundColor = 'transparent',
  wireframes = false,
  gravity = 0.56,
  fontSize = '2rem',
  mouseConstraintStiffness = 0.9
}) => {
  const containerRef = useRef(null);
  const engine = useRef(null);
  const world = useRef(null);
  const bodies = useRef([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Initialize Matter.js
    engine.current = Matter.Engine.create();
    world.current = engine.current.world;
    
    // Set gravity
    engine.current.gravity.y = gravity;

    // Create canvas
    const container = containerRef.current;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = width;
    canvas.height = height;
    container.appendChild(canvas);
    canvasRef.current = canvas;

    // Create floor
    Matter.World.add(world.current, [
      Matter.Bodies.rectangle(width / 2, height - 10, width, 20, { isStatic: true })
    ]);

    // Create text bodies
    const words = text.split(' ');
    const ctx = canvas.getContext('2d');
    ctx.font = `bold ${fontSize}`;

    words.forEach((word, index) => {
      const wordWidth = ctx.measureText(word).width;
      const x = Math.random() * (width - wordWidth);
      const y = -index * 50;
      
      const body = Matter.Bodies.rectangle(x, y, wordWidth, 20, {
        label: word,
        render: {
          fillStyle: highlightWords.includes(word) ? 'red' : 'black',
          strokeStyle: 'transparent',
          lineWidth: 0,
          wireframes: false
        }
      });
      
      bodies.current.push(body);
      Matter.World.add(world.current, body);
    });

    // Add mouse constraint
    const mouse = Matter.Mouse.create(canvas);
    const mouseConstraint = Matter.MouseConstraint.create(engine.current, {
      mouse: mouse,
      constraint: {
        stiffness: mouseConstraintStiffness,
        render: {
          visible: false
        }
      }
    });

    Matter.World.add(world.current, mouseConstraint);

    // Animation loop
    const animationLoop = () => {
      Matter.Engine.update(engine.current, 1000 / 60);
      
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw text
      bodies.current.forEach(body => {
        const word = body.label;
        const color = highlightWords.includes(word) ? 'red' : 'black';
        ctx.fillStyle = color;
        ctx.fillText(word, body.position.x - ctx.measureText(word).width / 2, body.position.y);
      });
      
      requestAnimationFrame(animationLoop);
    };

    animationLoop();

    // Cleanup
    return () => {
      Matter.World.clear(world.current);
      Matter.Engine.clear(engine.current);
      container.removeChild(canvas);
    };
  }, [text, highlightWords, gravity, wireframes, mouseConstraintStiffness, fontSize]);

  return (
    <div
      ref={containerRef}
      style={{
        backgroundColor,
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="text-container">
        {text.split(' ').map((word, index) => (
          <span
            key={index}
            className={highlightWords.includes(word) ? highlightClass : ''}
          >
            {word}{' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export { FallingText };