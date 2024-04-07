---
layout: "../../layouts/BlogPost.astro"
title: Automating my laptop setup process
description: Automated setup of devices is pretty great!
pubDate: Apr 07 2024
createdDate: 2024-04-07, 22:47
updateDate: 2024-04-08, 01:55
tags:
  - blog
  - tech
type: blog
publish: true
---

I have installed (and reinstalled due to screwing up my envs) my operating system for the devices I work with quite a few times.  I use [EndeavourOS](https://endeavouros.com/) with [KDE](https://kde.org) nowadays since my recent most [installation](install-linux-on-acer-aspire-7).

Starting afresh is pretty good, but the most arduous task every time has been re-installing all the software I require. Remembering package names, diving into settings and updating keybindings, appearance - to have your OS work as exactly as you like is great! But doing that once too many to bring it to your desired state is not a productive use of time.


##  Scripting is all you need? 

Initially I embarked on the task with underestimating it to be handled simply by a single bash script. A simple for-loop to go through a list of packages and do `yay -S` or `sudo pacman -S $PACKAGE_NAME`, backup all  necessary config files/assets to git beforehand and pull them in the script to necessary locations, run some init commands - and I should be done!

Only at the time of actually attempting to write it out, did I realize the things I would have had to handle - Error handling for lots of cases, verbose logging for each step, handling cases where script would need to restarted and it would start from scratch.

Writing only a bash script for me was not sustainable, which made me reach out for other tools, that would provide me a framework and handle the tedious bits for me.

## Konsave
`Konsave` is a CLI that backs up, export, import and switch KDE configurations as profiles. I tweaked a fresh KDE install to my liking and exported a profile to use. It works as advertised, but wallpaper change did not work for me no matter what. Keybindings and appearance changes work, so I am satisfied with it.

Changing wallpaper is handled by ansible by executing `plasma-apply-wallpaperimage /path/to/jpg`

## Chezmoi

I maintain a git repository for my [dotfiles](https://www.github.com/siddhantmaitra/dotfiles) that contain config files for most of the core software I use. Previously, I used a tool called `stow` to maintain them via  symlinking, but I ran into issues when not being careful. 

I moved to `chezmoi`, which is a dedicated dotfile/configuration management tool that is pretty good at what it does and stays out of the user's way once it is setup. Setting up dotfiles is as easy as running: 
```bash
chezmoi init --apply "$USERNAME" # github username
```

I currently manage my terminal, ssh, shell, git and neovim config with it.

## Ansible

`Ansible`, a configuration management tool, handles installs/commands in an idempotent fashion. It will bring the system to the desired state and make changes where it is necessary, not all over the system. I use this tool to:
1. Create an extensible framework [(code)](https://www.github.com/siddhantmaitra/device-setup) for future modifications/additions
2. Install arch linux packages from the standard repository as well as AUR
3. Install software binaries that usually have to be installed using `curl` 
4. Configure KDE with keybindings and appearance settings saved in `konsave` profile
5. Practice a hands-off/automation approach for installation. I can just start Ansible and leave it to check in back later to have my device at my desired state.

All of this is accomplished by running:

```bash
ansible-galaxy install -r requirements.yml

ansible-playbook -v playbook.yml --ask-become-pass
```


## Creating an abstraction

Automating all of the requirements, made me want to simplify the process even more.
I whipped up a [script](https://github.com/siddhantmaitra/scripts/blob/main/working/setup.sh) (finally!)  to run the above commands. Now I can simply run:

```bash
curl https://raw.githubusercontent.com/siddhantmaitra/scripts/main/working/setup.sh | bash
```


## Making the abstraction cool

I recently read a blogpost by [Mike Nikles](https://www.mikenikles.com/) with the title ["curl your landing page"](https://www.mikenikles.com/blog/curl-your-landing-page). The one-liner above works but the URL is a bit long. What if I can do the same as Mike? Use my own domain? 

That would be pretty neat. 

Mike's method did not work for me since I am using `Astro` for my website. So I came up with this after reading the docs: 

```ts
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {

const response = await fetch("https://raw.githubusercontent.com/siddhantmaitra/scripts/main/working/setup.sh");
return new Response(await response.text());
}
```

Adding this code to  `archbox.ts` file in `src/pages` directory of the project, now enables me to do:

```bash
curl www.smaitra.com/archbox | bash
```

And with this, any EndeavourOS running KDE will be setup in an automated manner with settings that work for me the best!

Looks cool too: 

<video width="100%" height="100%" controls loop>
<source src="https://github.com/siddhantmaitra/device-setup/assets/65553994/cd1cff30-7294-452b-9e1a-c6afffe10e45" type="video/mp4">
</video>
