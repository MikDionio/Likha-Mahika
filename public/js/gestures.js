/*************************************************************
 * This script is developed by Arturs Sosins aka ar2rsawseen, http://webcodingeasy.com
 * Feel free to distribute and modify code, but keep reference to its creator
 *
 * Gestures class provides a way to define and detect gestures. 
 * You can define your own gestures, by providing array of points, 
 * that defines shape and provide callback function for each shape.
 *
 * For more information, examples and online documentation visit: 
 * http://webcodingeasy.com/JS-classes/Javascript-gesture-recognition
**************************************************************/
var gestures = function(config){

	var conf = {
		debug: true,
		draw: true,
		drawColor: "#000000",
		drawWidth: 5,
		autoTrack: true,
		allowRotation: true,
		inverseShape: true,
		points: 20
	};
	
	var d;
	var ctx;
	var tracking = false;
	var ob = this;
	var gestStart;
	var gestEnd;
	
	this.gestures = [];
	this.points = [];
	
	this.construct = function(){
		d = doc_size();
		//copying configuration
		for(var opt in config){
			conf[opt] = config[opt];
		}

		if(document.getElementById("gestures_canvas"))
		{
			ctx = document.getElementById("gestures_canvas").getContext("2d");
		}
		else if(conf.draw)
		{
			//create canvas for drawing
			var canvas = document.createElement("canvas");
			canvas.setAttribute("width", d.width + "px");
			canvas.setAttribute("height", d.height + "px");
			canvas.style.position = "absolute";
			canvas.style.top = "0px";
			canvas.style.left = "0px";
			canvas.id = "gestures_canvas";
			ctx = canvas.getContext("2d");
			document.getElementById("game").appendChild(canvas);//Insert canvas inside game div
		}
		if(conf.autoTrack || conf.draw)
		{
			add_event(document.body, "touchstart", this.Down);
			add_event(document.body, "touchend", this.Up);
			tracking = true;
		}
		
		this.reset();
	};

	this.pauseTracking = function(){
		tracking = false;
	};

	this.resumeTracking = function(){
		tracking = true;
	};

	this.addGesture = function(name, points, callback){
		if(conf.inverseShape){
			var inverse = [];
			for(var i = points.length-1; i >= 0; i--)
			{
				inverse.push(points[i]);
			}
			var gesture = {};
			gesture.name = name;
			gesture.callback = callback;
			var map = resample(inverse, inverse.length, conf);
			
			gesture.map = vectorize(map, conf.allowRotation);
			this.gestures.push(gesture);

		}
		
		var gesture = {};
		gesture.name = name;
		gesture.callback = callback;
		var map = resample(points, points.length, conf);
		gesture.map = vectorize(map, conf.allowRotation);
		this.gestures.push(gesture);
	};

	this.resolve = function(points){

		if(points.length > 1)
		{
			this.reset();
			var map = resample(points, points.length, conf);
			
			var ivect = vectorize(map, conf.allowRotation);
			
			var maxScore = 3;
			var match = "none";
			for(var i = 0; i < this.gestures.length-1; i++)
			{
				var dist = optCosDist(this.gestures[i].map, ivect);
				var score = 1/dist;
				
				console.log("Gesture score for " + this.gestures[i].name + ": " + score);
				if(score > maxScore)
				{
					maxScore = score;
					match = this.gestures[i];
				}
			}
			if(match.callback)
			{
				match.callback(match.name, points, maxScore, gestStart, gestEnd); //also send points to callback for logging
			}else{
				match = this.gestures[this.gestures.length-1];
				match.callback(match.name, points, maxScore, gestStart, gestEnd);
			}
		}
	};

	this.reset = function(){
		this.points = [];
	};
	
	this.clear = function(){
		ctx.clearRect(0, 0, d.width, d.height);
	};

	//gesture auto tracking
	//mouse down
	this.Down = function(event){
		gestStart = Date.now();
		ob.reset();
		if(conf.draw)
		{
			//ctx.clearRect(0, 0, d.width, d.height);
			ctx.lineWidth = conf.drawWidth;
			ctx.strokeStyle = conf.drawColor;
			ctx.lastX = (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX);
			ctx.lastY = (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY);
		}

		elem = event.target.id
		if(conf.autoTrack && tracking && elem == "gestures_canvas")
		{
			var point = {};
			point.x = (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX);
			point.y = (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY);
			ob.points.push(point);
		}
		add_event(document.body, "touchmove", ob.Move);
	};
	
	//mouse move
	this.Move = function(event){
		if(conf.draw)
		{
			ctx.beginPath();
			ctx.moveTo(ctx.lastX, ctx.lastY);
			ctx.lineTo((event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX), (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY));
			ctx.stroke();
			ctx.lastX = (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX);
			ctx.lastY = (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY);
		}

		elem = event.target.id
		if(conf.autoTrack && tracking && elem == "gestures_canvas")
		{
			var point = {};
			point.x = (event.targetTouches[0] ? event.targetTouches[0].pageX : event.changedTouches[event.changedTouches.length-1].pageX);
			point.y = (event.targetTouches[0] ? event.targetTouches[0].pageY : event.changedTouches[event.changedTouches.length-1].pageY);
			ob.points.push(point);
		}
	};
	//mouse up
	this.Up = function(event){
		gestEnd = Date.now();
		if(conf.autoTrack && tracking)
		{
			console.log(ob.points)
			ob.resolve(ob.points);
		}
		remove_event(document.body, "touchmove", ob.Move);
	};

	// give points
	this.getPoints = function(event){
		return ob.points;
	};

	//some helping internal functions

	var optCosDist = function(gestureV, inputV){
		var a = 0;
		var b = 0;
		
		for(i = 0; i < gestureV.length; i += 2)
		{
			a = a + gestureV[i]*inputV[i] + gestureV[i+1]*inputV[i+1];
			b = b + gestureV[i]*inputV[i+1] - gestureV[i+1]*inputV[i];
		}
		var angle = Math.atan2(b,a);

		return Math.acos(a*Math.cos(angle) + b*Math.sin(angle));
	};
	
	//distance [PROTRACTOR]
	var Distance = function(u, v){
		var x = (u.x - v.x);
		var y = (u.y - v.y);
		return Math.sqrt((x*x)+(y*y));
	};
	
	var pathLength = function(points, n){
		var distance = 0;
		for(i = 1; i < n; i++)
		{
			distance = distance + Distance(points[i-1], points[i]);
		}
		return distance;
	};
	
	var resample = function(points, n){
		var subLength = pathLength(points, n)/(conf.points-1);
		var distance = 0;
		var newpoints = [];
		var elem ={};
		elem.x = points[0].x;
		elem.y = points[0].y;
		newpoints.push(elem);

		var i = 1;
		while (i < points.length && newpoints.length < (conf.points-1))
		{
			var subdist = Distance(points[i-1], points[i]);
			if((distance + subdist) >= subLength)
			{
				var elem2 = {};
				elem2.x = points[i-1].x + ((subLength - distance)/subdist)*(points[i].x - points[i-1].x);
				elem2.y = points[i-1].y + ((subLength - distance)/subdist)*(points[i].y - points[i-1].y);
				//add point
				newpoints.push(elem2);
				points.splice(i,0,elem2);
				distance = 0;
			}
			else
			{
				distance = distance + subdist;
			}
			i = i + 1;
		}
		var elem3 = {};
		//adding last point
		elem3.x = points[points.length-1].x;
		elem3.y = points[points.length-1].y;
		newpoints.push(elem3);
		
		return newpoints;
	};
	
	var centroid = function(points){
		var center = {};
		center.x = 0;
		center.y = 0;
		
		for(i = 0; i < points.length; i++)
		{
			center.x = center.x + points[i].x;
			center.y = center.y + points[i].y;
		}
		center.x = center.x/(points.length-1);
		center.y = center.y/(points.length-1);
		return center;
	};
	
	var translate = function(points,center){
		for(var i = 0; i < points.length; i++)
		{
			points[i].x = points[i].x - center.x;
			points[i].y = points[i].y - center.y;
		}
		return points;
	};
	
	var vectorize = function(points, sensit){
		var vector = [];
		
		var center = centroid(points);
		var points = translate(points, center);
		
		var lenkis = Math.atan2(points[1].x, points[1].y);
		var delta = lenkis;
		if(sensit)
		{
			var base = (Math.PI/4)*Math.floor((lenkis+(Math.PI/8))*(4/Math.PI));
			delta = base-lenkis;
		}
		var summa = 0;
		for(var i = 0; i < points.length; i++)
		{
			var newx = points[i].x*Math.cos(delta) - points[i].y*Math.sin(delta);
			var newy = points[i].x*Math.sin(delta) + points[i].y*Math.cos(delta);
			vector.push(newx);
			vector.push(newy);
			summa = summa + newx*newx + newy*newy;
		}

		var magnitude = Math.sqrt(summa);
		for(var i = 0; i < vector.length; i++)
		{
			vector[i] = vector[i]/magnitude;
		}
		return vector;
	};
	
	//get document dimensions
	var doc_size = function(){
		var docsize = new Object();
		docsize.width = window.outerHeight*(2/3);
		docsize.height = window.outerHeight*(5/7);
		// docsize.width = Math.max(
		// 	Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
		// 	Math.max(document.body.offsetWidth, document.documentElement.offsetWidth),
		// 	Math.max(document.body.clientWidth, document.documentElement.clientWidth)
		// );
		// docsize.height = Math.max(
		// 	Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
		// 	Math.max(document.body.offsetHeight, document.documentElement.offsetHeight),
		// 	Math.max(document.body.clientHeight, document.documentElement.clientHeight)
		// );
		return docsize;
	};
	
	//add event
	var add_event = function(element, type, listener){
		if(element.addEventListener)
		{
			element.addEventListener(type, listener, false);
		}
		else
		{
			element.attachEvent('on' +  type, listener);
		}
	};
	
	//remove event
	var remove_event = function(element, type, listener){
		if(element.removeEventListener)
			element.removeEventListener(type, listener, false);
		else
			element.detachEvent('on' +  type, listener);
	};
	
	this.construct();
}