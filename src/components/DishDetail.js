import { Component } from "react";
import { Control, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Container, Form, FormGroup as div, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

class SubmitCommentForm extends Component {

    render() {
        return (
            <div></div>
        );
    }
}

/////////////////////////////////////////////////////
class DishDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitFormOpen: false,
        };

        this.toggleCommentDlg = this.toggleCommentDlg.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

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
        );
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

    toggleCommentDlg() {
        this.setState({ isSubmitFormOpen: !this.state.isSubmitFormOpen });
    }

    submitComment(data) {
        alert(JSON.stringify(data));
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
            <Button onClick={this.toggleCommentDlg}>Submit Comment...</Button>
            <Modal isOpen={this.state.isSubmitFormOpen} toggle={this.toggleCommentDlg}>
                <ModalHeader toggle={this.toggleCommentDlg}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={values => this.submitComment(values)}>
                        <FormGroup>
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select model=".rating" id="rating" name="rating" className="form-control-select">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </Control.select>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="name">Your name</Label>
                            <Control.text model=".name" id="name" name="name" className="form-control" />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea model=".comment" id="comment" name="comment" className="form-control" />
                        </FormGroup>
                        <FormGroup>
                            <Button type="submit" color="primary">Submit</Button>
                        </FormGroup>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </div>;
    }
}
/*
<Input type="text" name="name" />

*/

//{[1,2,3,4,5].map(val => {<option>{val}</option>})}

export default DishDetail;