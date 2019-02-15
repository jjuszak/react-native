import React from 'react';
import { Alert, View  } from 'react-native';
import WebViewLeaflet from "react-native-webview-leaflet";

let latBuffer = .0001;
let lngBuffer = .0001;

export default class FetchExample extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            showZoomControls: true,
            bounds: [[39, -107], [41, -103]]
        }

        this.setCloseBounds = this.setCloseBounds.bind(this)
    }

    componentDidMount() {
        this.setCloseBounds()
    }

    setCloseBounds() {
        let that = this;
        navigator.geolocation.getCurrentPosition(function(e) {
            let bounds = [
                [e.coords.latitude - latBuffer, e.coords.longitude - lngBuffer],
                [e.coords.latitude + latBuffer, e.coords.longitude + lngBuffer]
            ]
            that.webViewLeaflet.sendMessage({
                bounds: bounds
            });
        });
    }

    onZoomEnd = ({ payload }) => {
        console.log(JSON.stringify(payload.bounds))
    }

    onMapClicked = ({ payload }) => {
        console.log(`Map Clicked: app received:`, payload);
    };

    render(){

        return(
            <View style={{flex: 1, paddingTop:40}}>
                <WebViewLeaflet style={{width: "100%"}}
                    ref={component => (this.webViewLeaflet = component)}
                    // Optional: a callback that will be called when the map is loaded
                    onLoad={this.onLoad}
                    // Optional: the component that will receive map events}
                    eventReceiver={this}

                    bounds={this.state.bounds}

                    // Optional: a list of markers that will be displayed on the map
                    // markers={this.state.markers}

                    // Required: the map layers that will be displayed on the map. See below for a description of the map layers object
                    mapLayers={[
                        {
                            name: 'streets',  // the name of the layer, this will be seen in the layer selection control
                            checked: 'true',  // if the layer is selected in the layer selection control
                            type: 'TileLayer',  // the type of layer as shown at https://react-leaflet.js.org/docs/en/components.html#raster-layers
                            baseLayer: true,
                            // url of tiles
                            url: 'https://maps.googleapis.com/maps/vt?pb=!1m5!1m4!1i{z}!2i{x}!3i{y}!4i256!2m3!1e0!2sm!3i349018013!3m9!2sen-US!3sUS!5e18!12m1!1e47!12m3!1e37!2m1!1ssmartmaps!4e0',
                        }
                    ]}

                    // Optional: display a marker to be at a given location
                    // ownPositionMarker={{
                    //     coords: this.state.currentLocation,
                    //     icon: "❤️",
                    //     size: [24, 24],
                    //     animation: {
                    //         name: "pulse",
                    //         duration: ".5",
                    //         delay: 0,
                    //         interationCount: "infinite"
                    //     }
                    // }}

                    // Optional (defaults to false): display a button that centers the map on the coordinates of ownPostionMarker. Requires that "ownPositionMarker" prop be set
                    // centerButton={true}

                    // Optional (defaults to false): cluster icons that are in the same area
                    // useMarkerClustering={true}
                />
            </View>
        );
    }
}
