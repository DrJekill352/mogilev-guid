import React from 'react';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import FilterListIcon from '@material-ui/icons/FilterList';
import { YMaps, Map, Placemark, Button } from 'react-yandex-maps';
import './Map.css';
import { app } from '../../firebase';
import { Math } from 'core-js';

const propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string)
}
const defaultProps = {
    tags: ['museums', 'theatres', 'churches', 'events', 'cafes', 'restaurants', 'monuments', 'cinemas']
}

export class MapComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            attractions: [],
            coords: {
                latitude: 53.908906,
                longitude: 30.342816,
            },
        }
    }

    componentDidMount() {
        const { tags } = this.props
        const firebaseRows = app.firestore().collection('attractions');
        firebaseRows.onSnapshot(snapshot => {
            const attractions = snapshot.docs.reduce((accumulator, currentValue) => {
                const data = currentValue.data()
                if (data.tags.find(tag => tags.find(t => t === tag))) {
                    accumulator.push(data)
                }
                return accumulator
            }, [])
            this.setState({ attractions: attractions }, this.getGeoLocation)
        })
    }

    getGeoLocation = () => {
        navigator.geolocation.getCurrentPosition(({ coords }) => this.setState({ coords: coords }))
    }

    calculateTime = (coords) => {
        const { coords: userCoords } = this.state
        const lat = Math.abs(userCoords.latitude - coords.latitude)
        const long = Math.abs(userCoords.longitude - coords.longitude)
        const time = Math.round(Math.sqrt((lat * lat) + (long * long)) * 1000)

        if (time < 60) {
            return `~${time}m`
        }
        const hours = time / 60
        const minutes = time % 60
        return `~${hours}h ${minutes}m`
    }

    render() {
        const { attractions } = this.state

        return (
            <React.Fragment>
                <YMaps query={({
                    lang: 'en_RU',
                    load: 'Map,Placemark,control.ZoomControl,control.FullscreenControl,geoObject.addon.balloon'
                })}>
                    <Map className='map' defaultState={{ center: [53.908906, 30.342816], zoom: 16 }} >
                        {attractions.map(attraction => {
                            const id = attraction.name.split(' ').join('')

                            return (
                                <Placemark
                                    key={id}
                                    geometry={[attraction.geo.latitude, attraction.geo.longitude]}
                                    options={({
                                        preset: 'islands#circleIcon',
                                        interactivityModel: 'default#opaque'
                                    })}
                                    properties={({
                                        balloonContentHeader: `<span> ${attraction.name}</span> `,
                                        balloonContentBody: `<i>${this.calculateTime({ latitude: attraction.geo.latitude, longitude: attraction.geo.longitude })}</i>`,
                                        balloonContentFooter: `<a class="attraction-link" href="http://localhost:3000/attraction/${id}"> More details </a> `
                                    })}
                                />
                            )
                        })}
                        <FilterListIcon className="fab" />
                    </Map>
                </YMaps>
            </React.Fragment>
        )
    }
}

MapComponent.defaultProps = defaultProps
MapComponent.propTypes = propTypes
MapComponent.displayName = 'MapComponent'
