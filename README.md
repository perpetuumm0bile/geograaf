The app is called Geograaf

This is a browser text game, similar to classic paper game "Hangman". As opposed to Hangman, Geograaf focuses solely on cities within a randomly chosen country. First version will support only Canada as a country.

Mechanics:

This is a single-player game. Computer thinks of a city within chosen country (using an API to retrieve a random city within a country), and the player tries to guess it by typing letters, within a certain number of guesses.

The city to guess is shown on the screen as a row of dashes, representing each letter of the word. If the guessing player suggests a letter which occurs in the word, the leter is immidiately shown in all its correct positions. If the suggested letter does not occur in the word, guess limit is decreased by one. The game continues until all the letters are guessed (win condition) or guess limit is exhausted (failure condition).

API:

Canadian Geographical Names Data Base (CGNDB) will be used to generate puzzles for Canada.
https://www.nrcan.gc.ca/earth-sciences/geography/application-programming-interface-api/9249





