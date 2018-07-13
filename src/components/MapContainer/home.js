import React,{Component} from 'react';


    export default class HomeScreenn extends Component {
 
        
    static polyline (pickupaddress,destination) {
     try{
        fetch('https://maps.googleapis.com/maps/api/directions/json?origin=+'+(pickupaddress)+'+&destination='+(destination)+'&key=AIzaSyBWke_00RksOBNheCG6v3HSeF8UsGyZQus')
        .then((response) => response.json())
        .then((res) => {
          console.log('Address ' + JSON.stringify(res));
          if(status ="ok"){
            var encoded = res.routes[0].overview_polyline.points;
                     
                           
          // decoding the polyline by google api
            
       
         
          var points=[];
          var index = 0, len = encoded.length;
          var lat = 0, lng = 0;
          while (index < len) {
              var b, shift = 0, result = 0;
              do {
      
          b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                   } while (b >= 0x20);
      
      
             var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
             lat += dlat;
            shift = 0;
            result = 0;
           do {
              b = encoded.charAt(index++).charCodeAt(0) - 63;
              result |= (b & 0x1f) << shift;
            shift += 5;
               } while (b >= 0x20);
           var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
           lng += dlng;
       
         points.push({latitude:( lat / 1E5),longitude:( lng / 1E5)})  
       
         }
         console.log(points);
         return points
        
        }
        else{
          this.setState({
            poly:false   
          })
          console.log("can't find the status");
        } 
        }); 
        
      
      
      }  
      catch(error){
        console.log(error)
      }
    
    } 
    
    }

