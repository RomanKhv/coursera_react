import React from 'react';
import { Card, CardImg, CardTitle, CardImgOverlay, Breadcrumb, BreadcrumbItem, Container, Row } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './Loading';

function RenderMenuItem({ dish }) {
    return (
        <Card>
            <Link to={`/menu/${dish.id}`}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Link>
        </Card>
    );
}

const Menu = (props) => {
    console.log('Menu render()');

    const menu = props.dishes.dishes.map(
        (dish) => {
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} />
                </div>
            );
        }
    );

    if (props.dishes.isLoading) {
        return (
            <Container>
                <Row>
                    <Loading />
                </Row>
            </Container>
        );
    }
    else if (props.dishes.errMsg) {
        return (
            <Container>
                <Row>
                    <h4>{props.dishes.errMsg}</h4>
                </Row>
            </Container>
        );
    }
    else
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/home'>Home</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    {menu}
                </div>
            </div>
        );
};

export default Menu;