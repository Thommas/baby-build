Roadmap
=======

Short term
----------

- Isolate apollo queries
- Finish contact form with google captcha and lambda
- Implement add/remove/edit whitelist
- Implement add/remove/edit quest
- Design calendar for build
- Secure lambda with auth0
- Auth0 register should create User entity in DynamoDB
- Implement xp and level to unlock calendar


Mid term
--------

- Add unit tests
- Add generic fields (createdAt, updatedAt) to all entities
- Finish customizing homepage pictures


Long term
---------

- Implement giving access to a child to other family members


Deployment
----------

- Add icon for auth0
- Implement terms and privacy


Bonus ideas
-----------

- Messaging system for child
Santa claus or to report a problem like a confessional
The child needs to believe the message won't be read by his parents


Entities
--------

### User (parent)

Login
XP
Level

### Child

A child has a name, birthdate, xp and level, laziness gauge.

### Build

A build is the following:
- For each month a list of quests
- Rewards unlock progressively based on month and child xp/level or attributes
- Setting goals for each month and each year

### Month

- Past will record stats and consolidate build
- Present will present stuff to introduce to the child
- Future will plan

### Laziness

Monitor each month the amount of laziness of your child.
We want to prevent passively watching TV or youtube for instance.
Same for video game with empty gameplay (Candy crush)

### Quest

- Main quest
- Bonus quests
- Hidden quests

The goal is to encourage curiosity.

Type of quest:

1) 3 choices

Examples:
- At 6 year old pick a book (dinosaur, planets, flowers)
- At 9 year old pick a sport and register to local club (basket, tennis, soccer)
- At 12 year old pick an instrument (piano, guitar, other)

Finishing quest grants XP.

When the child level up, the parent can give points to primary and secondary attributes.
Primary and secondary attributes to be defined.

https://en.wikipedia.org/wiki/Attribute_(role-playing_games)
https://www.16personalities.com/articles/our-theory

### Reward

1) Activity

2) Access to tool or technology

3) Digital content

Examples:
- books
- movies
- tv show
- anime
- video game
- board game
- online video (spend X hours on youtube only whitelisted playlist)

4) Life tutorial

Parents accumulate knowledge with experience and wants to give a summary
for their children to access at some point in their life.
Create life tutorial dedicated to your child in the future.

Examples:
- How to deal with an aggressive girlfriend or boyfriend
- How to manage a car

5) Time capsule congratulation message

Store date it was written.

6) Build hidden achievement unlockable

Should be a short message.

7) Give some exploration time

Allow full access to internet with privacy
Should be unlocked as a reward and time should increase progressively
Permanent reward system with gauge

8) Eat oishii food

9) The child can ask for a reward


### Build a list of danger

- Sending photo/personal information online
- Online community
- Food
- Following stranger
- Drug
- Porno
- Internet
- Digital addiction
- Online shaming/harassment


Stack
-----

- Test many visualization libraries
- Need unique identifier for youtube video/book/anime/tv show/movie/video game/boardgame


Other
-----

- Thema for each year ?
- Primary and secondary stats +1 per year
- Parent also level up for every interaction with the platform
- Allow other family member to input data
- Make a list of what this platform should not be used for
- Lots of stories of parents who let their child play 10 hours per day.
  We have a whole generation of parents who have no idea what hardcore gaming is.
  They should know how to put limits.
  childs mimics parent behavior, it's important to show a good example.
- In Japan they get money for high grades


Links
-----

https://www.reddit.com/r/Parenting/comments/7ta1mk/1314_yr_olds_how_do_you_handle_technologyvideo/
https://www.reddit.com/r/Parenting/comments/64da9v/child_is_addicted_to_video_games/
https://www.reddit.com/r/Parenting/comments/53vl3e/precious_moment_after_finishing_our_first_video/
http://www.atlantico.fr/decryptage/protegezvosgosses-nikita-belluci-star-x-qui-alerte-parents-francais-inconscience-face-effarante-consommation-porno-enfants-et-3289001.html
https://thenextweb.com/virtual-reality/2018/02/21/how-a-16-year-old-in-a-village-in-france-taught-the-world-to-build-vr-headsets-for-100/
https://www.click2houston.com/news/investigates/danger-warning-about-popular-virtual-world-for-kids


Storyboard
----------

- Register to the website
- List without any child > create a new child
- Form to create a new child
- Select a child
- List without any build > create a new build
- Form to create a new build

### Main interface

1) Header

- Logo
- Selected child name, level and XP bar
- Button to switch child/build
- Link to settings

2) Build

Calendar per year or month
- Future and present: Setup goal, create quests with rewards
- Past: Upload picture select 1/2/3 quality, describe goal results

Note: calendar per month will be unlocked later (display both Mxx and Y-m)

3) Whitelist

- Add/remove/edit entries
- Dynamic categories ??
- Dynamic additional metadata (like minimum age) ??


Similar apps
------------

https://www.choremonster.com
https://www.classcraft.com


Homepage
--------

6 ideas:
- 3 year old Learn to count to ten
- 4 year old Learn politeness
- 5 year old Understand two languages
- 6 year old Learn multiplication tables
- 7 year old Learn to deal with strangers
- 8 year old Do sport in a club

Share ideas:
- Other family members can help
- Learn from experienced parents

5 jobs:
- Engineer
- Doctor
- Lawyer
- Accountant
- Manager

5 countries:
- USA
- Australia
- Singapore
- Amsterdam
- Seoul


Social network
--------------

- Open gmail account
- Open subreddit /r/pathofchild
- Open twitter account @pathofchild
- Open discord channel
