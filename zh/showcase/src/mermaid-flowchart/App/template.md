```mermaid
flowchart LR
  A([下班]) --> B{今晚做饭吗？}
  B -->|做饭| C[买菜]
  B -->|不做| D[带饭回家]
  C --> E[回家]
  D --> E
  E --> F([一起吃饭])
```
