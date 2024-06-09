### Week 4

04/23 - 3 hours, setting up new Hostile github repo, determining my goals for the project, refamiliarizing myself with the code, fixing bugs.

04/24 - 2 hour researched how to build secure sites, primarily focused on jwt tokens 

04/25 - 2 hours, worked on account security. started rewriting account signup and login forms so they don't use the same form
 
04/26 - 4 hours, account security - worked on adding checks to account signup for password verification and minimum password length. researched how to to limit login attempts

**Total hours:** 11

**Summary:** fixed 2 bugs where a user could crash the sever, redesigned the signup page. Added a minimum required password length and password verification.


### Week 5

Goals: Focus on the post component. Get the component to create a post to a place I'm happy with. Change how posts show up in the feed, add replies to posts.

Hours: I plan to spend 15-20 hours on this 

04/28 - 3 hours, worked on the post page, trying to improve its appearance and exploring using a modal instead 

04/29 - 3 hours, remade the create a post as a modal instead of a seprate page. the modal is accessed by clicking on the post icon on the desktop

05/02 - 5 hours, modifying feed so that only post title and username show up, and you click on the post to view the full post. now a user can click on a post and it takes them to a new page showing that post 

05/03 - 4 hours, rewriting prisma schema to include comments. needed to make changes to Post, User, Update, and add a Comment model. Rewriting handler for post to include comments, creating a handler to make a post. 

05/04 - 3 hours, worked on the page to show a single post so that users can comment on a post and comments show up under a post, added ability for user's to delete their posts from their profile, modified the deletepost handler to also delete comments on that post, added a deleteComment handler

**Total Hours:** 18

**Summary:** Substantially modified the post component. Post creation is now a modal instead of a separate page. Posts in the feed now only show the title and author. Each post in the feed is now a link that takes users to a separate page showing only that post. On that page users can view the post, other comments, and make a comment. Users can now delete their posts from their profile page.


### Week 6

Goals: This week I want to work on allowing picture uploads so that users can upload images for posts and have profile pictures. 

Hours: I plan to spend 15-20 hours on this

05/06 - 4 hours, researching how to set image uploads and store those images. it looks like you need to set up an s3 bucket to store the images in and then store the s3 buckets path in the prisma database. Through my research on setting up image hosting I found out about next.js a full stack react framework. I'm unhappy with the current way the webapp is set up,and have been wanting to find a different solution. As I read about next.js it seems like it may be it. I've started the process of trying to migrate over to next.js   

05/07 - 2 hours, migrating site over to next.js

05/09 - 7 hours, migrating site over to next.js, reworking handlers and routes, redoing front end design of login and signup

05/10 - 4 hours, continuing site migration, changed browser component so that it's nested in Desktop component

**Total Hours:** 17

**Summary:** Worked on migrating site over to next.js. All pages displayed to the user, except profile, have been moved over as well as route handlers to retrieve posts and sign in a user. Redesigned user login, signup, feed, and single post pages and changed the Browser component so that the Desktop component wraps around it

### Week 7

Goals: I want to complete the migration over to next.js. My focus is going to be on authentication. Last week I had been trying to convert the code I'd already written for authentication but after reading through the next.js documentation I think it would be better to rewrtie it entirely because it's set up so differently. 

Hours: I plan to spend around 15 hours on this

05/14 - 2 hours, read next.js documentation on authentication, began rewriting code to authetnicate a user

05/15 - 3 hours, changed schema to add in a session, worked on setting up sessions to verify if a user is logged in or not

05/17 - 4 hours, rewrote code for users to login and register. running into a lot of issues with the session not being recognized, and trying to troubleshoot that. user registration and logon work but the user is not recognized as an authenticated user

05/18 - 8 hours, continued trying to fix issues with authentication and middleware so that authenticated users are recognized properly. tried rewriting login and registration again, read through next-auth and authjs documentation

Total Hours: 17

Summary: Authentication has been really difficult and is taking longer than I thought it would. I thought a week was a reasonable goal for getting it all set up but I'm still struggling with getting sessions to work properly. I've rewritten all of my route handlers to work in nextjs. But I'm still working on protecting them properly.

### Week 8 

Goals:get sessions to work properly and routes to be protected. have a user

Hours:
05/21 - 3 hours - reading through next-auth documentation rewriting nextauth configuration 

05/22 - 5 hours - authentication is finally complete! sessions now work exactly as they should, rewrote profile, posts, and signin/register components to change the way data is fetched and submitted

05/23 - 9 hours - redesigning appearance of site. reworking site to be one page and opening up individual components as windows in the page, making windows draggable, 

**Total Hours** : 17

**Summary**:Completed set up of authentication, 

### Week 9
Goals: Get site ready to be used by people, no major changes at this point. I just want to polish the look and make it easy and intuitive for people to use

05/27 - 4 hours - added the ability to minimize windows, now each open component is shown on the bottom navbar. clicking on the component will bring it to the front
05/29 - 3 hours - added the ability to maximize windows, now each component can be made to take up the whole screen. Clicking the button again will bring it back to its original size 
05/30 - 6 hours - added in a second window component to use with the Menu and Post Components. Changed create a post from a modal to a window
06/01 - 3 hours - added the comments users made to their profile, wrote route handler to delete comments, and added button to profile so users can delete their comments

**Total Hours**: 16

**Summary**:  added features to the windows so they can be minimized and maximized, added the ability to delete comments. 

### Week 10
Goals: stop using AWS to host my database, set it up local hosting

06/03 - 9 hours, making poster, creating proper linkage between signup and signin. made sure signup component closes when it opens signin, changed signin so that it will open up the profile component and close itself when a user successfully signs in.


to do:

posts:

    [X]show just the post title and have users click on the post to expand to show the body
    [X]allow users to make comments on posts
    [X]add a way for users to delete their posts
    [X]redesign the page to make a post/ have the post creation be a modal instead of a separate page
    [X]on user's profile, make the posts shown linkable
    [X]add requirements to post submission so that a user can't submit a post without a title
    [X]have single posts pop up as an additional window beside the feed instead of redirecting to a different page
    

security issues:

    [X]logging in with a username that doesn't exist
    [X]deleting an account that has made posts
    [X]minimum password length
    [X]Password verification
    [] limited login attempts



- fix ssl issues, I originally set the ssl certificate up for a different domain and did a very lazy job adding in the hostile domain which is causing users to get a security warning when they visit the site

[X]get rid of forced color inversion and changed icons.

- User Account customization- profile pictures, text color, site color scheme(?)

- change 404 page to be the under construction page previously built
- 
[X]Have log in error messages show up on the log in page instead of a new page where the user then has to go back






