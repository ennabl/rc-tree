# RC-Tree Development Guide

## Architecture Overview

RC-Tree is a React tree component built for high performance with virtual scrolling capabilities. The architecture follows a provider-consumer pattern with state management through React Context.

### Core Components

- **Tree.tsx** - Main orchestrating component managing state, events, and rendering
- **NodeList.tsx** - Virtual list renderer handling large datasets efficiently  
- **TreeNode.tsx** - Individual node component with drag/drop and interaction logic
- **MotionTreeNode.tsx** - Animation wrapper for expand/collapse transitions

### Key Data Flow Patterns

**State Management**: Tree uses `TreeContext` to pass down shared state (expandedKeys, selectedKeys, checkedKeys, etc.) and event handlers. The main state is managed in `Tree.tsx` with derived state patterns via `getDerivedStateFromProps`.

**Data Transformation Pipeline**:
1. `treeData` → `convertDataToEntities()` → keyEntities mapping
2. keyEntities + expandedKeys → `flattenTreeData()` → flattenNodes for virtual rendering
3. Event callbacks transform event data via `convertNodePropsToEventData()`

**Controlled vs Uncontrolled**: Components support both patterns. Use `setUncontrolledState()` to update state only when props aren't controlling it.

## Development Workflows

### Running Examples
```bash
npm start  # Starts dumi dev server at localhost:8000
```

### Testing Strategy
- Tests use `@testing-library/react` with custom utilities in `tests/util.ts`
- Use `spyConsole()` to suppress expected warnings in tests
- Mock `rc-virtual-list` for consistent test snapshots (see `tests/__mocks__/`)
- Test files follow `*.spec.tsx` pattern with descriptive describe blocks

### Building
```bash
npm run compile  # Builds dist files and compiles LESS to CSS
```

## Critical Patterns

### Event Data Conversion
Always use `convertNodePropsToEventData()` when passing node data to callbacks:
```typescript
onSelect?.(selectedKeys, {
  event: 'select',
  node: convertNodePropsToEventData(node.props),
  selectedNodes,
});
```

### Drag & Drop State Management
Drag operations use complex state tracking with reset patterns:
- `draggingNodeKey`, `dragOverNodeKey`, `dropPosition`, `dropTargetKey`
- Always call `resetDragState()` or `cleanDragState()` to prevent inconsistencies
- Use `calcDropPosition()` utility for position calculations

### Key Generation
Keys follow position-based fallback: `getKey(userKey, positionString)`. Position strings use format like "0-1-2" representing tree depth/index.

### Field Names Pattern
Support custom field mappings via `fieldNames` prop with `fillFieldNames()` utility:
```typescript
const { key: fieldKey, title: fieldTitle, children: fieldChildren } = fillFieldNames(fieldNames);
```

### Virtual List Integration
Use `flattenTreeData()` to convert tree structure to flat list for `rc-virtual-list`. The flattening respects `expandedKeys` to show only visible nodes.

## Testing Conventions

- Mock external motion libraries to avoid animation timing issues
- Use `objectMatcher()` utility for partial object matching in complex state assertions
- Test both TreeNode JSX and treeData prop patterns
- Include accessibility and keyboard navigation test coverage

## Dependencies & Integration

- **rc-util**: Shared utilities (KeyCode, warning, omit, pickAttrs)
- **rc-motion**: Animation for expand/collapse transitions
- **rc-virtual-list**: High-performance rendering for large trees
- **classnames**: CSS class composition

When adding features, follow the established patterns of state derivation, context provision, and event data transformation to maintain consistency with the existing architecture.