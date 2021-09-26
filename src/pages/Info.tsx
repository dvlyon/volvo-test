import ReactMarkdown from 'react-markdown'

const markdown = `
# David Lyon's Test

## Library Assumptions

### CRA + TypeScript

Ended up using the TypeScript template of create-react-app to have the basics of a react app and save in configuration time.

### Ui Library

I added and heavily used Material UI for this test, since none was requested nor fobidden to use. It also made sense based on your tech stack.

### React Router

I initially intended to more heavily utilise react-router but ended up going a different way to focus on functionality.

### State Management Library

I went for little-state-machine as it's very fast and easy to set-up and use, and I had no need for the extra complexity of Redux or similar libraries. This also provides me with sessionStorage to persist data which is nice for testing.

## Test Assumptions

### Data attributes

I used the provided 'vehicles.json' and 'equipments.json' files to determine the data attributes of vehicles and equipments, respectively. However, since there were no guidelines on required/optional or enums for any values, I went for optional strings except for ids, which I handled as required and unique.

### File Upload Mechanics

As per my implementation, when uploading a list of vehicles/equipments, those with an id already existing in the application will be ignored (not updated / replaced).
`

const Info = () => <ReactMarkdown children={markdown} />

export default Info
