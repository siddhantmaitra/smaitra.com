---
layout: "../../layouts/BlogPost.astro"
title: "How this site came to be"
description: "I wanted to chuck few text files to internet. So I made this blog in few hours."
pubDate: "Jul 06 2022"
updatedDate: "Nov 02 2022"
---
<!-- heroImage: "/placeholder-hero.jpg"
--- -->
>Note: **Old Post! No more using this stack!!**

Over the past 2 years,I have learnt a lot (tech and more) from reading blogs of random people on the internet.
Out of them, the most useful/interesting ones were those that were hosted under their own domain with a custom, unique design and 
was not a medium article behind a paywall or mandatory login.

I was heavily inspired by their work to make a website for myself as well. 
A website for showcasing my work as well as a section where I can write stuff or document my thoughts.
I got this idea in mid 2021, but kept pushing back working on it since I felt lazy. 

On December 31st 2021, while I was browsing the internet, I found I could get a domain for myself 
for ~5 USD on [porkbun.com](https://www.porkbun.com) (very good site) and bought [smaitra.com](https://www.smaitra.com) on a whim.
Spending cash on something is a pretty good motivator. I quickly created a landing page with HTML and CSS in a day,
deployed it and linked it with the domain name. It looks like [this](https://owler.needs.rest/smaitra-website-01.png).
I had left it at that, thinking I would restyle it, add features soon. Soon turned out to be weeks and then weeks turned into six months.

## Considerations
I usually write notes in markdown. To put few of those files on the internet, I would have to consider the choices: 
* Write each post again in HTML (tedious) and maintain an index of it. 
* Use tools like `pandoc` and [convert the markdown to HTML](https://www.arthurkoziel.com/convert-md-to-html-pandoc/).
A good choice, but I would have to consider both `.md` and `.html` files containing same content. Also, I would be limited to 
mostly static content with this choice.
* Use MDX to just write in markdown, while automating the repetitive parts and having overall more flexibility with what
I want to display in each post. 

I finally chose MDX and decided to use stuff I am relatively unfamiliar with, for the sake of experimenting.
* [Remix](https://remix.run/) : I have seen lots of praises for this framework and wanted to try it out. 
* [TailwindCSS](https://tailwindcss.com/) : Styling with utility classes, pretty cool. 
* [MDX](https://mdxjs.com/): For reasons stated above.


Just by reading the documentations and searching the web for relevant examples, I was able to create this website 
in few hours(most of my time was spent styling the landing page). 

There are many more features that I want to add (maybe a dark mode?) and there are
few things that do not work as intended that require further investigation, which I would do.....someday. 
## At the End
Overall, as of writing this post, I am pretty satisfied with this website. I intend to keep it this way, while posting time to time, 
until I get another wave of motivation to rewrite everything from scratch. Thank you for reading my first blog post!

---