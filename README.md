# Cengage Data Projects

## The Problem

As part of a larger initiative at Cengage - to upgrade processes and deliverables around digital learning products - I was tasked with tackling how charts and graphs are handled.

Because the internal creative team had been largely focused on print for many years, charts and graphs were developed as print assets, specifically Illustrator files. The data was set up in the file and designers updated the design to accommodate the data. When data needed to be updated, it went back to the designer. The final output from the source file was an SVG. So why not separate the data from the presentation with a graphing library?

## The Solution

After some research, I decided to use an application Chartist. The fact that it renders regular SVG elements and uses regular CSS and Javascript (as opposed to using canvas) made it compatible with the Cengage learning platform. It is a subset of d3.js, which means it is lightweight.

The data was converted from csv to json and processed to be organized into `labels` and `series`, the only data requirement by Chartist.

These were originally developed as javascript applications, and subsequently converted to React components. 

### Deployment
https://chartist-react-projects.netlify.app/

### TO DO's
- ~Update to latest version of Chartist~
- ~Eliminate outdated libraries (react-chartist)~
- ...More charts
