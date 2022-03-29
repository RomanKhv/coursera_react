import { Component } from "react";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle, Container, Row } from "reactstrap";

class DishDetail extends Component {
    componentDidMount() {
        console.log('DishDetail::componentDidMount()');
    }

    componentWillUnmount() {
        console.log('DishDetail::componentWillUnmount()');
    }

    componentDidUpdate() {
        console.log('DishDetail::componentDidUpdate()');
    }

    render() {
        console.log('DishDetail::render()');
        if (!this.props.dish)
            return (<div></div>);
        return (
            <Container>
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{this.props.dish.name}</h3>
                    <hr />
                </div>
                <Row>
                    {this.renderDish(this.props.dish)}
                    {this.renderComments(this.props.comments)}
                </Row>
            </Container>
        )
    }

    renderDish(dish) {
        return <div className="col-12 col-md-5 m-1">
            <Card>
                <CardImg top width="100%" src={dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle tag="h5">{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        </div>;
    }

    renderComments(comments) {
        if (comments.length === 0)
            return (<div></div>);
        let body = comments.map((comm) => {
            return (
                <li key={comm.id.toString()}>
                    <p>{comm.comment}</p>
                    <p>-- {comm.author}, {(new Date(comm.date)).toDateString()}</p>
                </li>
            );
        });
        return <div className="col-md-5">
            <h4>Comments</h4>
            <ul>
                {body}
            </ul>
        </div>;
    }
}

export default DishDetail;