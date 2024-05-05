
Week 4

04/23 - 3 hours, setting up new Hostile github repo, determining my goals for the project, refamiliarizing myself with the code, fixing bugs.

04/24 - 2 hour researched how to build secure sites, primarily focused on jwt tokens 

04/25 - 2 hours, worked on account security. started rewriting account signup and login forms so they don't use the same form
 
04/26 - 4 hours, account security - worked on adding checks to account signup for password verification and minimum password length. researched how to to limit login attempts

Total hours: 11

Summary: fixed 2 bugs where a user could crash the sever, redesigned the signup page. Added a minimum required password length and password verification.


Week 5
Goals: Focus on the post component. Get the component to create a post to a place I'm happy with. Change how posts show up in the feed, add replies to posts.

Hours: I plan to spend 15-20 hours on this 

04/28 - 3 hours, worked on the post page, trying to improve its appearance and exploring using a modal instead 
04/29 - 3 hours, remade the create a post as a modal instead of a seprate page. the modal is accessed by clicking on the post icon on the desktop
05/02 - 5 hours, modifying feed so that only post title and username show up, and you click on the post to view the full post. now a user can click on a post and it takes them to a new page showing that post 
05/03 - 4 hours, rewriting prisma schema to include comments. needed to make changes to Post, User, Update, and add a Comment model. Rewriting handler for post to include comments, creating a handler to make a post. 
05/04 - 3 hours, worked on the page to show a single post so that users can comment on a post and comments show up under a post, added ability for user's to delete their posts from their profile, modified the deletepost handler to also delete comments on that post, added a deleteComment handler

Total Hours: 18
Summary: Substantially modified the post component. Post creation is now a modal instead of a separate page. Posts in the feed now only show the title and author. Each post in the feed is now a link that takes users to a separate page showing only that post. On that page users can view the post, other comments, and make a comment. Users can now delete their posts from their profile page.


Week 6:
Goals: This week I want to work on allowing picture uploads so that users can upload images for posts and have profile pictures. 
Hours: I plan to spend 15-20 hours on this


to do:

posts:

    [X]show just the post title and have users click on the post to expand to show the body
    [X]allow users to make comments on posts
    [X]add a way for users to delete their posts
    [X]redesign the page to make a post/ have the post creation be a modal instead of a separate page
    []on user's profile, make the posts shown linkable
    []add requirements to post submission so that a user can't submit a post without a title 
    

security issues:

    [X]logging in with a username that doesn't exist
    [X]deleting an account that has made posts
    [X]minimum password length
    [X]Password verification
    [] limited login attempts



- make a bullettin board

- fix ssl issues, I originally set the ssl certificate up for a different domain and did a very lazy job adding in the hostile domain which is causing users to get a security warning when they visit the site

- get rid of forced color inversion and changed icons.

- User Account customization- profile pictures, text color, site color scheme(?)

- Have log in error messages show up on the log in page instead of a new page where the user then has to go back






