A Javascript function providing methods to help calculations on a CSS3 bézier curve.  
Much of the algorithm comes from [this gist](https://gist.github.com/MadRabbit/996893) by **Nikolay Nemshilov**.

----------

#How To Use

Start creating your bézier curve:
```javascript
    var myCurve = new cubicBezier(.42,.9,.81,.23);
```

#Methods

The object *myCurve* offers 3 methods to do calculations: 

 - `compute(t)`
 - `computeFromX(x,a)`
 - `computeFromY(y,a)`

##compute( *t* )

####Parameter :
**t** represents a point of the curve at a given time.  
The value of **t** must be included between 0 and 1.  

####Example :
```javascript
    var point = myCurve.compute(.6);
```

####Output :
It returns an object with 4 properties:

- **x**: position on x axis
- **y**: position on y axis
- **dx**: vector on x axis
- **dx**: vector on y axis

>You can use **dx** and **dy** to calculate the tangent to the curve for the given point:
```javascript
	Math.atan2(point.dx, point.dy)   // angle in radians
```

##computeFromX( *x* , *a* )

####Parameters :
**x** represents the position of the point on x axis.  
The value of **x** should be included between 0 and 1.  

 **a** represents a number of iteration:  `a > 0`.  
Default value if omitted: `a = 5`.  

>**How it works ?**
>
>The algorithm has to approximate the **t** time when the point reaches the given **x** position.  
>For this reason you can control the accuracy of the approximation by giving the **a** parameter.  
>The higher the accuracy is, the closer the output **x** will be to the input **x**  

####Output :
This method returns the same object as `compute(t)`.

##computeFromY( *y* , *a* )

Same thing for the **y** axis.
