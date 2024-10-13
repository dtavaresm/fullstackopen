```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note left of server: Create and add new note to the notes list
    Note left of server: Rerenders the note list on the page
    Note left of server: Send new note to the server
```
