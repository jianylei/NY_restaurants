import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router"
import queryString from 'query-string';
import { Pagination, Table } from "react-bootstrap"
import CardMain from "./CardMain";

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

    //Reset page to 1 when searching Borough
    useEffect(() => {
        setPage(1)
    }, [location.search])

    const previousPage = () => {
        setPage(page > 1 ? page - 1 : page)
    }

    const nextPage = () => {
        setPage(page + 1)
    }

    //Capitalize strings: staten island -> Staten Island
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
        let jsxString
        try {
            jsxString = getList()
        } catch (err) {
            jsxString = ""
        }

        if (jsxString && Object.keys(restaurants).length) {
            return (
                <Table bordered hover responsive>
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
                <div className="not-found-msg">...No Restaurants Found</div>
            )
        }
    }

    //Remove pagination when no results are found
    const setPagination = () => {
        if (restaurants && Object.keys(restaurants).length) {
            return (
                <Pagination>
                    <Pagination.Prev onClick={previousPage} />
                    <Pagination.Item>{page}</Pagination.Item>
                    <Pagination.Next onClick={nextPage} />
                </Pagination>
            )
        }
    }

    const body = (
        <>
            {renderTable()}
            {setPagination()}
        </>
    )

    return (
        <CardMain head="Restuarant List" subHead="Local New York restaurants. Optionally sorted by borough" body={body} />
    )
}