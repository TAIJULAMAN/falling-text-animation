# Falling Text Animation

A React component that creates an interactive falling text animation with physics-based effects using Matter.js.

## Features

- Interactive falling text animation
- Two trigger modes: Hover and Click
- Physics-based movement with bouncing off walls and floor
- Highlighted words with random colors
- Mouse interaction for dragging words
- Smooth animations and transitions

## Installation

1. Clone the repository:
```bash
git clone https://github.com/TAIJULAMAN/falling-text-animation.git
cd falling-text-animation
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

The component can be used in two ways:

1. Hover Trigger:
```jsx
<OnHover
  text="Your text here"
  highlightWords={['highlight', 'words']}
  gravity={0.56}
  mouseConstraintStiffness={0.9}
  fontSize="2rem"
/>
```

2. Click Trigger:
```jsx
<OnClick
  text="Your text here"
  highlightWords={['highlight', 'words']}
  gravity={0.56}
  mouseConstraintStiffness={0.9}
  fontSize="2rem"
/>
```

## Props

The component accepts the following props:

- `text`: The text to animate (default: "")
- `highlightWords`: Array of words to highlight (default: [])
- `trigger`: Animation trigger type ("hover" or "click") (default: "hover")
- `gravity`: Physics gravity value (default: 0.56)
- `mouseConstraintStiffness`: Mouse interaction stiffness (default: 0.9)
- `fontSize`: Text size (default: "2rem")

## Technologies Used

- React
- Matter.js (Physics engine)
- Tailwind CSS
- Vite (Build tool)

## License

MIT License
