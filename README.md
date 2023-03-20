# Innowise Lab Internship: Level 2: Mini-Paint

[Task](https://drive.google.com/file/d/19cb4whI_HUVPzuaPyaj5r6hGotIVnhho/view)

App was created with the help of Firebase Storage architecture, React Redux and Typescript.
We have a basic routing with Authorization  / Registration pages.
After Firebase validate your data,  it's redirecting on the Homepage.

On the homepage we see the gallery of the painted images by the user, who is currently authorized.
With the addition to paint another image after clicking "Open Canvas" button.
After clicking there is open canvas modal, where you can pick brush, eraser, or some shape.
You can customize your choice by selecting size of brush on slider, or pick your colour.
Also you can pick the colour for your picked shape.
By the way,reset your current draw you can with clicking button "Clear".

At the end, when you are done with your drawing experience, you can upload your image to the Firepase storage.
After clicking "Upload" button, canvas will be automatically cleaning, modal close and your gallery will be updating.

This task was made with the help of the list of dependencies, such libraries as :
- MUI Components Library (Linear progress in Images List , Circular progress and Toasts in SignUp / Registration pages , etc.)
- React-router-dom (to help us work with app navigation)
- React-redux & reduxjs/toolkit (to configure your store and hide strong async logic)

There are some folders in the project:
- components (this folder includes list of components, such as custom Loader, Alert message and also our main component Canvas)
- pages (for each our page , we have individual folder, consists of .css file and full .tsx page)
- providers (this folder made for our theming responsibilities and logic for allowing throw our theme context throughout our full application)
- sources (for initializing our Firebase storage and authorization)
- redux (this branch for application store logic with firebase data-request)

Also we use strong linter alliance in our application : ESLint + Prettier + Pre-commit Hook.
After installing linter and prettier, we rewrite some rules for our code, such as no-console and use-brackets.
Adding new scripts 'npm run lint' and 'npm run lint:fix' allow us to catch and handle warnings / errors in our code.
Installing husky-library and lint-staged-library allow us to work with Git-hooks : we pick work with pre-commit.
This hook stop us before commiting , because it monitors the code for existence of warnings and throw us an error, if it exists.
