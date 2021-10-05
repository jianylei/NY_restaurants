import { useParams } from "react-router"

export default function Restaurant() {
    const {id} = useParams();
    return (
        <p>
            Restaurant id: {id}
        </p>
    )
}
