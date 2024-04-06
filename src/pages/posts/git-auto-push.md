---
layout: "../../layouts/BlogPost.astro"
title: "Auto git push code on exit"
description: "Automate pushing of code to remote after logging out"
pubDate: "Jan 27 2024"
---

## Context 
I practice programming on platforms such as [exercism](https://www.exercism.org/) and [leetcode](https://exercism.org/), and prefer to do it locally inside WSL2. I tend to take markdown based notes for future reference in the same folder as the code solution files. I also back these up to a private git repo. 

I am trying to build the habit of working on problems from these sites daily. I realized I do not need to keep track of a proper history with git, so I created a simple bash script that would push my changes with a timestamp.

## Script:

```bash
#!/bin/bash

DIR="/home/sid/programs/practice/exercism"

cd $DIR

TIMESTAMP=$(date)

if [[ $(git status -s) ]]
then
    git add .

    git commit -m "Auto-commit on logout: $TIMESTAMP"

    git push origin main 
else
    COMMITS_TODAY=$(git log --since="midnight" --pretty=format:"%h" | wc -l)

    if [[ $COMMITS_TODAY -gt 0 ]]
    then
        echo "Number of commits made today in exercism: $COMMITS_TODAY"
    else
        echo "No commits were made today in exercism"
    fi
fi

```

The script works fine, but I was faced the challenge of automating the script's execution. Since I am using WSL which I do not keep running all the time, a cron job was not an option. 

At first, I thought of adding this to my shell rc file: 

```bash
exit() {
    /path/to/auto-push.sh
    
    builtin exit "$@"
}
```

This would execute everytime I type exit in the terminal and did what I wanted. But measurements (with `Measure-Command {wsl}`) showed it slowed down wsl startup time. I do not know why exactly, but it did.

After some googling, I found the option of `.zlogout`(`.bash_logout` for bash users). This file gets executed after each logout/exit. I promptly put it in `$HOME` and put the script file name inside it.

And it works! No extra time taken as well.

```
[sid@sid-acer ~/programs]$ exit
Number of commits made today in exercism: 2
PS C:\Users\Sid>
```
## Next steps
I think I will later modify this script to take a list of directories from a txt file, so that I can conveniently add and remove folders to be auto-pushed to their remotes.

