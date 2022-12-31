---
layout: "../../layouts/BlogPost.astro"
title: "WSL2 config notes"
description: "Some convenient configs for using WSL2"
pubDate: "Jan 01 2023"
heroImage: "/wsl-preview.png"
---


[WSL](https://learn.microsoft.com/en-us/windows/wsl/install) (Windows Subsystem for Linux) provides significant increase in quality of life while working on software things. But it is immense PITA out of the box. I configure it to mainly address the high RAM usage and the activation of the GPU causing the laptop fans go wild. 

Other than that, WSL has been pretty nice to me.

The files needed for configuration are:
	
1. `.wslconfig` = does global config for all wsl distros installed ; found in `C:\Users\<USERNAME>`
2. `wsl.conf`  = config file for each wsl distro ; found in `/etc`

For more detailed information, checkout : https://learn.microsoft.com/en-us/windows/wsl/wsl-config

## My config : 

### 1. .wslconfig

```
[wsl2]
memory=4G
gpuSupport=false
```


This config was added mainly due to: 
- To limit WSL2 `vmem.exe` excessive RAM usage. Capping RAM usage to 4GB seems enough for most things I tend to do.

- `gpuSupport` to stop triggering of GPU everytime `wsl` is turned on. It helps lessen battery drain and laptop fans  remain quiet. I could not find this one in the official docs, found it through a [GitHub issue](https://github.com/microsoft/WSL/issues/8931). 

### 2. wsl.conf

```
[boot]
systemd=true
```
Having `systemd` is huge plus while running stuff like `docker` without bothering with docker desktop or running `k3d` for when expirementing with kubernetes.