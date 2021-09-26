import ReactMarkdown from 'react-markdown'

const markdown = `

# David Lyon's Test

## Assumptions

### Ui Library

I added and heavily used Material UI for this test, since none was requested nor fobidden to use. It also made sense based on your tech stack.

`

const About = () => <ReactMarkdown children={markdown} />

export default About
