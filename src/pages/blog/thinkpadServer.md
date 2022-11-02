---
layout: "../../layouts/BlogPost.astro"
title: "How to keep your thinkpad running with the lid closed"
description: "Lid closed. Display off. Run your thinkpad as a linux server!"
pubDate: "Oct 10 2022"
---
<!-- heroImage: "/placeholder-hero.jpg"
--- -->


## Context 

I have a 2nd hand Lenovo Thinkpad x250 with i7 5600u processor that I bought in November 2021. It worked great even in 2022, I used it as my daily driver with EndeavourOS. Really enjoyed the experience. Recently, the external battery was not being detected and that cut the battery life more than half, taking away the utility of having a portable machine. It was collecting dust for a few weeks in my room, so I finally decided to use it as a linux server. 

## Laptops as servers

From what I gathered on the internet, old laptops can be great servers. I tried installing Debian, which already runs on my other server, but installing non-free firmware stuff additionally proved to be a pain. Instead, I just went with Ubuntu 22.04 and it was set up in no time. 

Although it is pretty handy to have an attached screen with your server, having an open lid turned on screen running 24/7 can be more costly than running a headless one. To mitigate that, one can configure to turn off the display and keep it running even when the lid is closed.

>Note: The steps mentioned below are what worked for me after intense googling sessions and constant trial and error. It is hard to guarantee that the steps would work for every other laptop running linux.

## To close the lid

To disable entering the sleep mode I had to edit the `/etc/systemd/logind.conf` file and modify the line:

```bash
#HandleLidSwitch=suspend
```

to

```bash
HandleLidSwitch=ignore
```

Additionally, ensure that the file also has this line:

```bash
LidSwitchIgnoreInhibited=no
```

Then restart the OS via:
```bash
sudo systemctl restart systemd-logind.service
```

Now, you should be able to close the lid, without suspending the running processes. 

## To turn off the display

This was the hard to get it right. All the methods I found online did not work or it was not up to my liking. After finding one [good enough config](https://askubuntu.com/a/1194293) and editing it a bit, the display now turns off by itself after 1 minute and wakes up on any keypress. 

Create a script which would blank the screen after 1 min and turn it off after 2 mins. 
```bash

#!/bin/bash
setterm --blank 1 --powerdown 2
```


And make script file executable by systemctl. Create file `/etc/systemd/system/screen-off.service`

```bash
[Unit]
Description=Blank screen after 1 min and turn it off after 2 min. Any keypress will turn it back on.
After=ssh.service

[Service]
Type=oneshot
Environment=TERM=linux
StandardOutput=tty
TTYPath=/dev/console
ExecStart=/usr/local/bin/screenOff.sh

[Install]
WantedBy=default.target

```

Make it executable:

```bash
sudo chmod +x /usr/local/bin/screenOff.sh
sudo chmod +x /etc/systemd/system/screen-off.service
```

And finally start it and enable at boot with systemctl:

```bash
sudo systemctl start screen-off.service
sudo systemctl enable screen-off.service
```

The display now should turn off in 1 minute and should turn on at any keypress. Nice!


## References: 

Few forum links that can be referred: 
1.  [https://askubuntu.com/questions/62858/turn-off-monitor-using-command-line](https://askubuntu.com/questions/62858/turn-off-monitor-using-command-line)
    -   [https://askubuntu.com/a/1194293](https://askubuntu.com/a/1194293)
2.  [https://askubuntu.com/questions/1244358/ubuntu-20-04-server-turn-off-screen-until-i-press-a-key](https://askubuntu.com/questions/1244358/ubuntu-20-04-server-turn-off-screen-until-i-press-a-key)
    
3.  [https://superuser.com/questions/374637/how-to-turn-off-screen-with-shortcut-in-linux](https://superuser.com/questions/374637/how-to-turn-off-screen-with-shortcut-in-linux)
    
4.  [https://systembash.com/how-to-turn-off-your-monitor-via-command-line-in-ubuntu/](https://systembash.com/how-to-turn-off-your-monitor-via-command-line-in-ubuntu/)