```mermaid
flowchart LR
  A([Leave work]) --> B{Cook tonight?}
  B -->|Yes| C[Buy groceries]
  B -->|No| D[Pick up dinner]
  C --> E[Head home]
  D --> E
  E --> F([Eat together])
```
