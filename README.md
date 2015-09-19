DWN - Info Screen Software
==========================

This is an info screen software for offices or callcenters or wherever you may need notices about some important events
to be delivered.

In it's normal state the software will display a 24h clock with date. This can be replaced with a notice by using
REST API. There are different levels of messages with different sounds and screen color. Message is displayed for 20
seconds, after that the screen returns to clock display.

Installation
============

Install Node.js, clone or download this repository. Run:

```
npm install
npm start
```

Or launch the bin/www file.

Usage
=====

Go to http://localhost:3000 to see the info screen.

API
===

POST JSON messages to following url:

http://localhost:3000/message/[level]

Where level is one of:

* info (no sound, blue background)
* notice (bell sound, green background)
* warning (buzzing sound, orange background)
* error (dramatic sound, red background)

Message itself should contain title and message fields:

```
{ "title": "Hello World!", "message": "The screen has been set up correctly!" }
```

Client
======

Browser based client for the REST api can be accessed at /client path.