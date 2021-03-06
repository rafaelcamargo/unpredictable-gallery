# Unpredictable Gallery v0.2.1

[![Code Climate](https://codeclimate.com/repos/54d21ab269568078e0000eb9/badges/1ffd4043c9ff0d54a5cb/gpa.svg)](https://codeclimate.com/repos/54d21ab269568078e0000eb9/feed)

### What it is
Ugal (Unpredictable Gallery) is the solution I have found to build a random tetris-based image gallery.
Each time Ugal is initialized, its frames are randomly dimensioned and organized.

### How to use it

#### Basics

Ugal is ridiculously easy to use.
You don't need any specific lib or special effects installed in your site/application. Just identify a container in your HTML and call ugal.init(), in your javascript, passing an object with three required attributes (container, width and height) as you can see below:

``` html
<div id='container'>
  <img src='sample-image.jpg' />
  <img src='another-sample-image.jpg' />
  ...
</div>
```

``` javascript
ugal.init({
  container: 'container',
  width: 800,
  height: 600
});
```

#### Options

##### hFrames, vFrames

You can define the number of frames to be shown on gallery using the attributes *hFrames* and *vFrames* to inform the maximum number of horizontal and vertical frames, respectively:

``` javascript
ugal.init({
  container: 'container',
  width: 800,
  height: 600,
  hFrames: 5,
  vFrames: 3
});
```

##### theme

If you were looking for a non black/grey colour based gallery, you can specify some themes. They are *Blumenau*, *Floripa*, *Joinville* and *Lages*. You can see how they look like on the [Project's Page](http://rafaelcamargo.com/pro/ugal/welcome) or accessing the project's examples folder.

``` javascript
ugal.init({
  ...
  vFrames: 3,
  theme: 'Joinville'
});
```

### Where to find it

You can see it up and running on the [Project's Page](http://rafaelcamargo.com/pro/ugal/welcome)

### Release History

- 2015/01/05 **v0.2.1** : Fixed wrong behavior of the function emptyContainer (issue#12)
- 2015/01/04 **v0.2.0** : Added the *Coloured-Only Gallery* feature (issue#6)
- 2015/01/02 **v0.1.0** : First stable development version 
