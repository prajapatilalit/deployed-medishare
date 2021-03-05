const Hospital = require("../models/Hospital")

exports.createHospital = async  (req,res) => {

    try{
    
           // res.send(req.body);
           var newData = new Hospital(req.body)
       
           const savedHospital = await newData.save();
          return res.send(savedHospital)
           // await Restaurant.create(req.body).
           // then(data => data.json({message: 'patient Graph Details saved successfully', result: data}))
    
           
    
    } catch (err) {
     res.status(400).json({
       status: 'fail',
       message: err
     });
    }

}

exports.getAllHospitals = async (req,res) => {
  const rest = await Hospital.find({})

  res.json(rest);


}

exports.getHospital = async (req,res) => {

    const lat1 = req.params.lat
  
    const long1 = req.params.long
  
    const radius = req.params.radius
  
    console.log(radius)
  
    // console.log(lat1,long1,radius);
  
    const rest = await Hospital.find({})
          
    const final = [...rest]
  
    let resFound = []
  
  const resu =   final.filter( (item,index) => {
   const res =  getDistanceFromLatLonInKm(lat1,long1,item.location.lat,item.location.long) * 1000
   if(res <= radius){
     console.log(res);
     resFound.push(item)
   }
  } )
  
      res.json({resFound })
  }
  // Algorithm to find Distance Between two Locations using latitite and longitude of both places
  function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }
  
  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }