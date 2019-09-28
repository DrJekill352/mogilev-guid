import React from 'react';
import PropTypes from 'prop-types';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import './Map.css';
import { app } from '../../firebase';
import { attribute } from 'postcss-selector-parser';

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
            attractions: []
        }

        setTimeout(() => {

        }, 0)
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
            this.setState({ attractions: attractions })
        })
    }

    handlePlacemarkClick = () => {
        const { attractions } = this.state
        attractions.forEach(attraction => {
            const id = attraction.name.split(' ').join('')
            const element = document.querySelector(`#${id}`)
            console.log('WW', element)
            element && element.addEventListener('click', event => console.log('EVENT', event))
        })
    }

    render() {
        const { attractions } = this.state

        return (
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
                                onClick={this.handlePlacemarkClick}
                                geometry={[attraction.geo.latitude, attraction.geo.longitude]}
                                options={({
                                    preset: 'islands#circleIcon',
                                    interactivityModel: 'default#opaque'
                                })}
                                properties={({
                                    balloonContentHeader: `<button onclick="()=>console.log('Test')     " id=${id} >${attraction.name}</button>`
                                })}
                            />
                        )
                    })}
                </Map>
            </YMaps>
        )
    }
}

MapComponent.defaultProps = defaultProps
MapComponent.propTypes = propTypes
MapComponent.displayName = 'MapComponent'
