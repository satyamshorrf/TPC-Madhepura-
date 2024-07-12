                      
                       //////// ////  Background Animation Start  ///////////////////////


var renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("canvas"),
    powerPreference: "high-performance"
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  
  
  var scene = new THREE.Scene();
  
  //===================================================== Create a perpsective camera
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.001, 1000);
  camera.position.z = 400;
  
  
  //===================================================== resize
  window.addEventListener("resize", function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
  
  
  //===================================================== Array of points
  var points = [
    [68.5,185.5],
  
  
    [160.6,3.3],
    [68.5,185.5]
  ];
  
  //===================================================== Convert the array of points into vertices
  for (var i = 0; i < points.length; i++) {
    var x = points[i][0];
    var y = 0;
    var z = points[i][1];
    points[i] = new THREE.Vector3(x, y, z);
  }
  //===================================================== Create a path from the points
  var path = new THREE.CatmullRomCurve3(points);
  
  //===================================================== Create the tube geometry from the path
  var sides = 70;
  var geometry = new THREE.TubeGeometry( path, 500, .5, sides, true );
  
  //===================================================== Basic material
  const tex = new THREE.VideoTexture(video);
  video.play();
  var material = new THREE.MeshBasicMaterial({
    side : THREE.BackSide,
    map: tex
  });
   material.map.wrapS = THREE.RepeatWrapping;
  material.map.wrapT= THREE.RepeatWrapping;
  material.map.repeat.set(20, 1)
  
  //===================================================== Create a mesh
  var tube = new THREE.Mesh( geometry, material );
  tube.matrixAutoUpdate = false;//wont be moving so no need to update
  scene.add( tube );
  
  //===================================================== Create a point light in our scene
  var light = new THREE.PointLight(new THREE.Color("white"),1, 100);
  scene.add(light);
  
  
  //===================================================== Animate
  var startTime = performance.now(); // Record the start time
  
  function animate() {
    var currentTime = performance.now(); // Get the current time
    var elapsedTime = (currentTime - startTime) / 1000; // Calculate elapsed time in seconds
    percentage = (elapsedTime * 0.0005) % 1; // Use elapsed time to calculate percentage
  
    var p1 = path.getPointAt(percentage);
    var p2 = path.getPointAt((percentage + 0.03) % 1);
    camera.position.set(p1.x, p1.y, p1.z);
    camera.lookAt(p2);
    light.position.set(p2.x, p2.y, p2.z);
    
    // Increment the material map repeat.x value by 0.1
    material.map.repeat.y += 0.001;
    
    // Render the scene
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  
  animate();

  

                                   //////// ////  Background  Animation End  ///////////////////////









                