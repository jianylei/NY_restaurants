import CardHead from "./CardHead";
import CardSub from "./CardSub";

export default function CardMain({head, subHead, body}) {
    return (
        <div className="card-container">
            <CardHead head={head}/>
            <CardSub sub={subHead}/>
            {body}
        </div>
    )
}
