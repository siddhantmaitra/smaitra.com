---
layout: "../../layouts/BlogPost.astro"
tags:
  - draft
  - linux
  - tech
type: blog

publish: true
title: "Install Linux on Acer Aspire 7"
description: "Install Linux on Acer Aspire 7"
createdDate: 2024-03-02, 00:22
updateDate: 2024-03-02, 01:47
pubDate: March 02 2024
---

I bought my first laptop, an Acer Aspire 7 (Aspire A715-75G) in 2020. It has been the most powerful piece of hardware (i5 9300H, GTX 1650, 16GB RAM) I own till now and I mostly used it for games and content heavy work.

Previously I used a 2nd hand thinkpad x250 running Endeavour OS for daily needs, but have now parted ways with it, because travelling with multiple heavy laptops is a pain. Windows with WSL2 is nice and [I still use it](https://www.smaitra.com/blog/my-wsl-setup), but the comfort of a device running Linux for programming tasks is hard to match.

The process for installing Linux on this device was not straight-forward. So I am documenting the steps I took to enable dual boot, for somebody's (perhaps myself too) reference in the future. The following steps are necessary since SSD might not appear during installation phase of the Linux based OS on devices which have Intel RST.[details](https://help.ubuntu.com/rst/).

## Steps

1. Boot into Windows, open `cmd` (not `powershell`, why idk though) in Admin mode. Then, run the following command to boot into Windows safe mode from next boot.  
```powershell
bcdedit /set {current} safeboot minimal
```

2. Reboot computer, open BIOS using `F2` key, disable fast boot
3. Visit Main tab of BIOS, press `Ctrl + S` to enable editing SATA option
4. Change the SATA operation mode to `AHCI`
5. Reboot into Windows.  Windows in Safe Mode should be loaded.

>If step no. 1 is skipped, rebooting into Windows give you the  _Blue Screen Of Death_. Ensuring safe mode boot, enables installing of necessary drivers for AHCI after entering that mode.
1. Run `cmd` again in admin mode and set Windows to boot normally.
```powershell
bcdedit /deletealue {current} safeboot
```
7. Now for every reboot, windows 10 can load up normally. Also,  the storage device would be now available in options during the OS installation.

