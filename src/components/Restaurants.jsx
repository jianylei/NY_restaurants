import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router"
import queryString from 'query-string';
import { Card, Pagination, Table } from "react-bootstrap"

export default function Restaurants() {
    const [restaurants, setRestaurants] = useState(null);
    const [page, setPage] = useState(1);
    const perPage = 10;
    let location = useLocation();
    let history = useHistory();

    useEffect(() => {
        let borough = queryString.parse(location.search)
        let tmp = captitalize(String(borough.borough))
        let uri = (borough.borough) ? `https://immense-hamlet-01820.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}&borough=${tmp}` :
            `https://immense-hamlet-01820.herokuapp.com/api/restaurants?page=${page}&perPage=${perPage}`;

        fetch(uri).then(res => res.json()).then(data => {
            setRestaurants(data)
        }).catch(err => {
            setRestaurants(null)
        })

    }, [location.search, page])

    const previousPage = () => {
        setPage(page > 1 ? page - 1 : page)
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

    const getList = () => {
        return (
            restaurants?.map((restaurant, index) => {
                return (
                    <tr key={index} onClick={() => { history.push(`/restaurant/${restaurant._id}`) }}>
                        <td>{restaurant.name}</td>
                        <td>{restaurant.address.building} {restaurant.address.street}</td>
                        <td>{restaurant.borough}</td>
                        <td>{restaurant.cuisine}</td>
                    </tr>
                )
            })
        )
    }

    const renderTable = () => {
        let errFlag = false
        let jsxString
        try {
            jsxString = getList()
        } catch (err) {
            jsxString = ""
            errFlag = true
        }

        if (jsxString) {
            return (
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
                        {jsxString}
                    </tbody>
                </Table>
            )
        } else {
            return (
                <Card>
                    <Card.Header>
                        <Card.Text>
                            {errFlag? "No Restaurants Found" : "...Loading Restaurants"}
                        </Card.Text>
                    </Card.Header>
                </Card>
            )
        }
    }
    return (
        <div>
            <Card className="card">
                <Card.Header>
                    <Card.Title>Restuarant List</Card.Title>
                    <Card.Text>
                        Full list of restaurants. Optionally sorted by borough
                    </Card.Text>
                </Card.Header>
            </Card>
            {renderTable()}
            <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
            </Pagination>
        </div>
    )
}