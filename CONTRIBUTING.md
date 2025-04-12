# Contributing to Tic-Tac-Toe Game

Thank you for your interest in contributing to the Tic-Tac-Toe game! This document provides guidelines for contributing to the project.

## Project Structure

```
├── components/
│   ├── Board.js         # Game board component
│   ├── Footer.js        # Footer component with credits
│   ├── Header.js        # Header with theme and sound controls
│   ├── Scoreboard.js    # Score tracking component
│   ├── Square.js        # Individual square component
│   └── ThemeToggle.js   # Theme toggle component
├── pages/
│   ├── _app.js          # App configuration and theme setup
│   └── index.js         # Main game page
├── utils/
│   ├── gameLogic.js     # Game winning logic
│   ├── sound.js         # Sound management
│   └── ThemeContext.js  # Theme context management
└── styles/
    └── globals.css      # Global styles
```

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/SamyakMishra072/Tic-Tac-Toe.git`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b feature/your-feature-name`

## Development Guidelines

### React Components
- Use functional components with hooks
- Follow the existing component structure
- Add PropTypes for component props
- Keep components focused and single-responsibility

### Styling
- Use MUI (Material-UI) components and styling system
- Follow the existing theme structure in `_app.js`
- Add responsive designs for all screen sizes
- Use the existing color scheme and transitions

### State Management
- Use React hooks for local state
- Maintain theme context for dark/light mode
- Keep game state in the main page component

### Game Features
- Maintain existing game modes (AI and Local Multiplayer)
- Follow the established sound implementation
- Keep animations smooth and consistent
- Ensure proper win/draw detection

### Code Style
- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing file structure
- Use ES6+ features appropriately
- Format code using Prettier

## Testing
- Add tests for new features
- Ensure all existing tests pass
- Test on multiple browsers
- Check both light and dark themes
- Verify sound functionality

## Pull Request Process

1. Update documentation for new features
2. Ensure code passes all tests
3. Update README.md if needed
4. Create a detailed PR description
5. Link relevant issues
6. Wait for review and address feedback

## Commit Guidelines

Format: `type(scope): description`

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance

Example: `feat(game): add difficulty levels to AI mode`

## Contact

For questions or discussions:
- Create an issue
- Comment on existing issues
- Contact maintainers directly

## License

By contributing, you agree that your contributions will be licensed under the project's license.
