# Unpredictable Gallery v0.1.0

### What it is
Ugal (Unpredictable Gallery) is the solution I have found to build a random tetris-based image gallery.
Each time Ugal is initialized, its frames are ramdomly dimensioned and organized.

### How to use it

#### Basics

Ugal is ridiculously easy to use.
You don't need any specific lib or special effects installed in your site/application. Just identify a container in your HTML and call ugal.init(), in your javascript, passing an object with three required attributes (container, width and height) as you can see below:

``` html
<div id='container'>
  <img src='sampleImageToBeUsed.jpg' />
  <img src='anotherSampleImageToBeUsed.jpg' />
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

Besides the basics params, you can define the number of frames to be shown on gallery using the attributes **hFrames** and **vFrames** to inform the maximum number of horizontal and vertical frames, respectively:

``` javascript
ugal.init({
  container: 'container',
  width: 800,
  height: 600,
  hFrames: 5,
  vFrames: 3
});
```

### Where to find it

You can see it up and running on the [Project's Page](http://rafaelcamargo.com/pro/ugal)
