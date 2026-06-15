# Verification Feature Guidelines

## Component Architecture

To maintain maintainability and clean code, follow these component location rules based on reuse scope:

1.  **Screen-Specific Components**: If a component is intended for use **ONLY** within a single screen, define it in a local `components/` directory relative to that screen file:
    `src/features/[feature_name]/screens/[ScreenName]/components/`

2.  **Feature-Wide Components**: If a component is intended for use across multiple screens within the same feature, define it in the feature's shared components directory:
    `src/features/[feature_name]/components/`

3.  **Domain/Global Components**: If a component is intended to be reused across different features or throughout the entire application, define it in the domain/global components directory:
    `src/components/` (or specialized subfolders like `src/components/ui/` for primitive UI elements).

## State Management
Prefer local state management (e.g., `useState`, `useReducer`) within screen-level orchestrator components for state-heavy UIs. This keeps components "dumb" and reusable by delegating business logic and persistence to the screen orchestrator.
