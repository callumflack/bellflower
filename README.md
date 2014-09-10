Bellflower
=========================================

A responsive blog/marketing site for Bellflower Chinese Medicine. Built using [Harp](http://harpjs.com), hosted on [Heroku](http://heroku.com).

Visit: www.bellflowerchinesemedicine.com.au

The site design is an exercise in clean, legible typography with a reductive, high-contrast color palette. The aim is for a quick understanding, with clear calls-to-action that speak for themselves, never hurried.

There's a series of round 2 updates (both business-related and code-related) to be made in the next few months. 

In this site I've experimented with Harp, Jade, the exemplar [SuitCSS](https://github.com/suitcss/suit) and I've done alot of work on my sass library as a set of bases, components and utilities: a work in progress.

I originally chose Jade because of it's terse syntax, which clarifies the markup so that it's quick and easy to scan, but the templating features were a fantastic to discover. I guess that's cause I'm not well versed in serious templating languages. Jade is fast to learn, and provides big gains without much knowhow.

I've used Rem as my scale unit through-out the site (type & structure), but with a great dependency on adapting measures according to media queries, I've had to override many font-sizes in pixels to manage sizing responsively (the ratio of font-sizes was not great when when scaled linearly — a tip to remember is that good typography and interface scaling has nothing to do with being linear), which became too obvious too late. I can't find a reason to use Rem any more.

