# Cengage Data Projects

## The Problem

As part of a larger initiative at Cengage - to upgrade processes and deliverables around digital learning products - I was tasked with tackling how charts and graphs are handled.

Because the internal creative team had been largely focused on print for many years, charts and graphs were developed as print assets, specifically Illustrator files. The data was set up in the file and designers updated the design to accommodate the data. When data needed to be updated, it went back to the designer. The final output from the source file was an SVG. So why not separate the data from the presentation with a graphing library?

## The Solution

After some research, I decided to use a charting application - Chartist - that was compatible (output in svg - not canvas, and lightweight) with the Cengage learning platform. It is based on, albeit a subset of d3.js.

The data was converted from csv to json, using a converter, and processed with javascript to be organized as required by Chartist.

Originally these were delivered as html, css and JS, but later I began to convert them to React components. Currently, I am updating them to use functional components, hooks, and refs.
### Demo
https://chartist-react-projects.netlify.app/

### TO DO's

- Add refs to generated svg elements, replacing vanilla js
- Update design :)
- ...More charts
