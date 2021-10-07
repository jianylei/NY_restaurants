import { useParams } from "react-router"
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import CardMain from "./CardMain";

export default function Restaurant() {
    const [restaurant, setRestaurant] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams();

    useEffect(() => {
        setLoading(true)

        fetch(`https://immense-hamlet-01820.herokuapp.com/api/restaurants/${id}`).then(res => res.json()).then(data => {
            setLoading(false)
            if (data?.hasOwnProperty("_id")) {
                setRestaurant(data)
            } else {
                setRestaurant(null)
            }
        })
    }, [id])

    const setMap = () => {
        if (restaurant) {
            return (
                <div>
                    <MapContainer className="map-container" center={[restaurant?.address.coord[1], restaurant?.address.coord[0]]} zoom={17}
                        scrollWheelZoom={false}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <Marker position={[restaurant?.address.coord[1], restaurant?.address.coord[0]]}></Marker>
                    </MapContainer>
                </div>
            )
        }
    }

    const setGrades = () => {
        if (restaurant) {
            return (
                restaurant.grades.map((grade, index) => {
                    const date = new Date(grade.date).toISOString().slice(0, 10)
                    return (
                        <Card key={index} className="card-grade">
                            <Card.Body><h4 className="grade-letter" style={{ float: "left" }}> Grade: {grade.grade}</h4></Card.Body>
                            <Card.Footer className="card-date">
                                <small style={{ float: "right" }} className="text-muted">Date: {date}</small>
                            </Card.Footer>
                        </Card>
                    )
                })
            )
        } else return null
    }

    const checkLoading = () => {
        if(loading) {
            return "...Loading restaurant"
        }
        else{
            return `${restaurant?.address.building ?? "Unable to find restaurant"} ${restaurant?.address.street?? ""}`
        }
    }

    return (
        <>
            <CardMain head={restaurant?.name ?? `id: ${id}`} subHead={checkLoading()} body={setMap() ?? ""} />
            <div className="grade-container"> {setGrades()} </div>
        </>
    )
}