# Cengage Data Projects 2018 - 2019

## The Problem

As part of a larger initiative at Cengage - to upgrade processes and deliverables around digital learning products - I was tasked with tackling how charts and graphs are handled.

Because the internal creative team had been largely focused on print for many years, charts and graphs were developed as print assets, specifically Illustrator files. The data was set up in the file and designers updated the look and feel. This meant of course that when data needed to be updated, it went back to the designer. Ultimately an SVG element was rendered on the "page" in the digital learning platform.

## The Solution

After some research, I decided to use a charting application - Chartist - that was compatible (output in svg - not canvas, and lightweight) with the Cengage learning platform.

The data was converted from csv to json, using a converter, and processed with javascript to be organized as required by Chartist.

Originally these were delivered as html, css and JS, but later I began to convert them to React components. Currently, I am updating them to use functional components, hooks, and refs.

### TO DO's

- Add refs to generated svg elements, replacing vanilla js
- Update design :)
- ...More charts
