import React from "react";
import { Card, CardBody, CardImg, CardSubtitle, CardText, CardTitle } from "reactstrap";
import { Loading } from "./Loading";

////////////////////////////////////////////////////////////

function RenderCard({ item, isLoading, errMsg }) {
    if (isLoading) {
        return (
            <Loading />
        );
    }
    else if (errMsg) {
        return (
            <h4>{errMsg}</h4>
        );
    }
    else
        return (
            <Card>
                <CardImg src={item.image} alt={item.name} />
                <CardBody>
                    <CardTitle className="h4">{item.name}</CardTitle>
                    {item.designation ? <CardSubtitle className="h5">{item.designation}</CardSubtitle> : null}
                    <CardText>{item.description}</CardText>
                </CardBody>
            </Card>
        );
}

////////////////////////////////////////////////////////////

export default function Home(props) {
    return (
        <div className="container">
            <div className="row align-atems-start">
                <h2>Home</h2>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMsg={props.dishesErrMsg}
                    />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promo} />
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader} />
                </div>
            </div>
        </div>
    );
}
