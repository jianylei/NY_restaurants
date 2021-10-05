import { useLocation } from "react-router"

export default function Restaurants() {
    let location = useLocation();
    return (
        <p>
            Restaurants query: {location.search}
        </p>
    )
}
