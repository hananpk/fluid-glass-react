# Fluid Glass React

A beautiful fluid and liquid glass morphism component for React.

## Installation

```bash
npm install fluid-glass-react
```

## Usage

```tsx
import { FluidGlass } from 'fluid-glass-react';

function App() {
  return (

      Hello World

  );
}
```

## Props

| Prop                | Type             | Default               | Description         |
| ------------------- | ---------------- | --------------------- | ------------------- |
| `id`                | string           | "lg-dist"             | SVG filter id       |
| `padding`           | string           | "10px 20px"           | Inner padding       |
| `borderRadius`      | string \| number | "24px"                | Border radius       |
| `tintColor`         | string           | "rgba(0, 0, 0, 0.04)" | Glass tint color    |
| `displacementScale` | number           | -30                   | Distortion strength |
| `blurAmount`        | number           | 0                     | Blur intensity      |
| `saturation`        | number           | 1.2                   | Color saturation    |
| `elasticity`        | number           | 8                     | Effect elasticity   |

## License

MIT
