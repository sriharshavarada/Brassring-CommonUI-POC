# Form Controls Implementations

Control implementations are split by control type and UI destination:

- `text/{custom,material}`
- `single-select/{custom,material}`
- `multi-select/{custom,material}`
- `checkbox/{custom,material}`
- `radio/{custom,material}`
- `autocomplete/{custom,material}`

Each `br-*` wrapper in `src/app/common/components/` acts as the facade:

- Reads runtime mode (`CUSTOM` / `MATERIAL`)
- Uses corresponding adapter
- Renders destination implementation component from this folder
