04/23 - 3 hours, setting up new Hostile github repo, determining my goals for the project, refamiliarizing myself with the code, fixing bugs.

my goals:
patch security issues in the code, there are a number of ways a user can crash the app. I'd like to put precautions in place to prevent that. Some examples:

    logging in with a username that doesn't exist
    deleting an account that has made posts

improve the posts component of the app, show just the post title and have users click on the post to expand to show the body, allow users to make comments on posts

make a bullettin board

fix ssl issues, I originally set the ssl certificate up for a different domain and did a very lazy job adding in the hostile domain which is causing users to get a security warning when they visit the site

get rid of forced color inversion and changed icons.

Have log in error messages show up on the log in page instead of a new page where the user then has to go back

redesign the page to make a post

add a way for users to delete their posts

set limit for wrong password tries

