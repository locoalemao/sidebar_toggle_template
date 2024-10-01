# Sidebar + Toggle: A Lightweight and Responsive Solution

## Description

This repository provides a simple and flexible way to implement a collapsible sidebar navigation menu with a toggle button in your web applications. It's designed to be lightweight and responsive, adapting to different screen sizes gracefully.

## Features

- **Efficient Sidebar Content Loading**: Uses asynchronous fetching with the `fetch` API to load sidebar content dynamically.
- **Easy Customization**: Sidebar and toggle functionality is easily customizable through CSS classes like `.sidebar` and `.toggle-active`.
- **Responsive Behavior**:
  - Sidebar remains visible on larger screens (width >= 590px).
  - A toggle button appears on smaller screens, allowing users to show or hide the sidebar for improved usability.
- **Optional Automatic Sidebar Hiding**: For touch-enabled devices, the sidebar can automatically hide on scroll (this feature requires additional adjustments).

## File Structure

The repository contains the following files and directories:

/
|-- index.html
|-- sidebar.html
|
|-- assets/
|   |-- js/ 
|   |   |-- sidebar.js
|
|-- css/
|   |-- breakpoint.css
|   |-- sidebar.css

