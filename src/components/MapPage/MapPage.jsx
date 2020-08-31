import React, { useEffect } from 'react'
import {connect} from 'react-redux';
import {getUserLocationRequest, updateMap, getLocationsRequest, getUser, reviews, newReview, openModal} from '../../redux';
import './mapPage.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
import ReactMapGL, {Marker, NavigationControl} from 'react-map-gl';
import {useHistory} from 'react-router-dom';
import Nav from '../NavBar/Nav';
import NewModal from '../NewModal/NewModal';
import Footer from '../Footer/Footer';

function MapPage(props) {

    const {openModal, viewport, locations, modalIsOpen, getUserLocationRequest, updateMap, getLocationsRequest, getUser, newReview, reviews, userId} = props;
    const history = useHistory();

    // Using hooks to get the user and their location, because what do we say to class components and componentDidMount? NOT TODAY!
    useEffect(() => {
        if(localStorage.token){
            getUser(localStorage.token);
            getUserLocationRequest();
        } else {
            history.push('/');
        }
    }, [getUser, updateMap, getUserLocationRequest, history]);

    // When the user drags the map, the coordinates are updated in the state and the map gets redrawn.
    const onViewportChange = (viewport) => {
        updateMap(viewport);
        getLocationsRequest(viewport.latitude, viewport.longitude);
        getMarkers();
    }

    // When the user drags the map into an area with reviews, markers are pulled to show how many reviews each location has.
    const getMarkers = () =>{
        return locations.map(location => {
            return (
                <Marker key={location.id} offsetLeft={-25} offsetTop={-70} latitude={parseFloat(location.lat)} longitude={parseFloat(location.lng)}>
                    <div className="marker-styles" onClick={async () => await locationClickHandler(location.id)} >
                        <p>{location.review_count}</p>
                    </div>
                </Marker>
            );
        });
    }

    const locationClickHandler = (id) => {
        openModal();
        reviews(id, userId);
    }

    // When the user clicks on the map, open a modal for creating a new location with review
    const mapClickHandler = event => {
        openModal();
        newReview('', event.lngLat[1], event.lngLat[0]);
    }

    // Importing Mapbox's API key from my environment variables.
    const TOKEN = process.env.REACT_APP_TOKEN;

    // This is the map component with its corresponding options.
    return (
        <>
            <Nav onViewportChange={onViewportChange} />
            <ReactMapGL 
            {...viewport}
            className={"map-container"}
            onClick={modalIsOpen === true ? null : (info) => mapClickHandler(info)}
            attributionControl={false} // sue me!
            onViewportChange={(viewport) => onViewportChange(viewport)}
            mapStyle="mapbox://styles/mapbox/streets-v10"
            mapboxApiAccessToken={TOKEN}>
            {getMarkers()}
            <div style={{position: 'absolute', right: 0, top: 100}} onClick={event => event.stopPropagation()}>
                <NavigationControl showCompass={false} />
            </div>
            </ReactMapGL>
            <NewModal updateViewport={onViewportChange} />
            <Footer />
        </>
    )
}

// Bringing the state from redux...
const mapStateToProps = (state) => {
    return {
        viewport: state.viewport,
        locations: state.locations,
        modalIsOpen: state.modals.modalIsOpen
    };
};

// ...as well as some actions...
const mapDispatchToProps = dispatch => {
    return {
        getUserLocationRequest: () => dispatch(getUserLocationRequest()),
        updateMap: (viewport) => dispatch(updateMap(viewport)),
        getLocationsRequest: (lat, lng) => dispatch(getLocationsRequest(lat, lng)),
        getUser: (token) => dispatch(getUser(token)),
        newReview: (id, lat, lng) => dispatch(newReview(id, lat, lng)),
        openModal: () => dispatch(openModal()),
        reviews: (id) => dispatch(reviews(id)),
    }
}

// ...and finally sending them back to the component as props.
export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
