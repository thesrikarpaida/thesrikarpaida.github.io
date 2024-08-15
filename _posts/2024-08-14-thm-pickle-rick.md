---
title: TryHackMe Room - Pickle Rick
date: 2024-08-14 15:20:00 +0800
categories: [tryhackme, walkthrough]
tags: [ctf]
render_with_liquid: false
---

I wanted to write a blog in my portfolio site, and slowly fill it with stuff, and thought to myself, “What would be the fastest way to get some content for a blog?” and realized it would be to solve a TryHackMe room. I immediately logged in to TryHackMe and opened the first room I could find, “[Pickle Rick](https://tryhackme.com/r/room/picklerick)”.

I connected to THM’s OpenVPN and started the machine, along with my Kali VM.

<br>
As the target IP was released, I pasted it into the browser for it to reveal a webpage as below.
<!-- insert homepage.png -->

![Homepage](/_posts/20240814/homepage.png)

There wasn’t anything there, but going through the source code of the page, I found some commented code that revealed a username, R1ckRul3s. That meant we could login somewhere, so I used nmap to scan for any running services on this IP.
```
$ nmap 10.10.50.175
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-08-15 13:42 EDT
Nmap scan report for 10.10.50.175
Host is up (0.087s latency).
Not shown: 998 filtered tcp ports (no-response)
PORT   STATE SERVICE
22/tcp open  ssh
80/tcp open  http

Nmap done: 1 IP address (1 host up) scanned in 17.93 seconds
```

We have 2 services, _http_ and _ssh_ running on this machine. I checked the authentication methods for ssh using the nmap script, `ssh-auth-methods` and it revealed to be only public key login, so there was no use trying to brute force any passwords into ssh.
```
$ sudo nmap -sV --script=ssh-auth-methods -p22 10.10.50.175
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-08-15 14:18 EDT
Nmap scan report for 10.10.50.175
Host is up (0.011s latency).

PORT   STATE SERVICE VERSION
22/tcp open  ssh     OpenSSH 8.2p1 Ubuntu 4ubuntu0.11 (Ubuntu Linux; protocol 2.0)
| ssh-auth-methods: 
|   Supported authentication methods: 
|_    publickey
Service Info: OS: Linux; CPE: cpe:/o:linux:linux_kernel

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 1.90 second
```

I tried exploring the webpage more, and when in the robots.txt page, it had the following:
<!-- insert robots_page.png -->
`Wubbalubbadubdub`

Putting that aside, I tried the dirbuster tool on the target machine, to find out if there are any more hidden pages, and found the following:
<!-- insert dirbuster.png -->

I went to the portal.php page, and there voila! There’s a login page.
<!-- insert portal.png -->

The username would obviously be `R1ckRul3s`. For the password, I tried the text from the `robots.txt` and it worked.

Upon logging in, there was an option to execute commands on the machine there. I tried `ls` and it revealed a list of files in the current working directory, which included the file `Sup3rS3cretPickl3Ingred.txt`.
<!-- insert just_ls.png -->

I tried to read the file, but the following output showed up when I ran the command catSup3rS3cretPickl3Ingred.txt.
<!-- insert cat_not_working.png -->

So, I tried to check if it would work if I tried head, tail, etc. After a few tries, finally, less seemed to work and we got ourselves the first ingredient.
<!-- insert first_ingredient.png -->

I’ve checked the other pages on the top navigation menu, and all of them lead to a denied page, so we’ll ignore that for now.
<!-- insert denied.png -->

<!-- insert ls_home.png -->
<!-- insert ls_home_rick.png -->
<!-- insert second_ingredient.png -->

I then tried to check for sudo permissions using the command sudo -l.
<!-- insert sudo_l.png -->

It basically meant that you can use any sudo commands without a password, implying we have root access!

I then checked for files in the root folder, and there you have the final ingredient!!
<!-- insert ls_root.png -->

I printed its contents too using less.
<!-- insert third_ingredient.png -->

So, all the 3 ingredients for this room are:
> mr. meeseek hair<br>
> 1 jerry tear<br>
> fleeb juice
