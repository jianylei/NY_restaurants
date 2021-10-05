import { useEffect, useState } from "react";
import { useLocation } from "react-router"
import queryString from 'query-string';
import { Card, Table } from "react-bootstrap"

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    let location = useLocation();

    useEffect(() => {
        let borough = queryString.parse(location.search)
        let tmp = captitalize(String(borough.borough))
        let uri = (borough.borough) ? `https://immense-hamlet-01820.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${tmp}` :
            `https://immense-hamlet-01820.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

        fetch(uri).then(res => res.json()).then(data => {
            setRestaurants(data)
        })

    }, [location.search, page])

    const previousPage = () => {
        setPage(page > 0 ? page - 1 : page)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    const captitalize = (str) => {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const restaurantList = restaurants?.map((restaurant, index) => {
        return (
            <tr key={index}>
                <td>{restaurant.name}</td>
                <td>{restaurant.address.building} {restaurant.address.street}</td>
                <td>{restaurant.borough}</td>
                <td>{restaurant.cuisine}</td>
            </tr>

        )
    })

    return (
        <div>
            <Card className="card" style={{width: "100%"}}>
                <Card.Header>
                    <Card.Title>Restuarant List</Card.Title>
                    <Card.Text>
                        Full list of restaurants. Optionally sorted by borough
                    </Card.Text>
                </Card.Header>
            </Card>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Borough</th>
                        <th>Cuisine</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurantList}
                </tbody>
            </Table>
        </div>
    )
}
