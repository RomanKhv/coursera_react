import React, { Component } from "react";
import { Control, Errors, LocalForm } from "react-redux-form";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, Button, Card, CardBody, CardImg, CardText, CardTitle, Container, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";

const checkMinL = threshold => val => !!(val) && (val.length >= threshold);
const checkMaxL = threshold => val => !(val) || (val.length <= threshold);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isSubmitFormOpen: false,
        };

        this.toggleCommentDlg = this.toggleCommentDlg.bind(this);
        this.submitComment = this.submitComment.bind(this);
    }

    toggleCommentDlg() {
        this.setState({ isSubmitFormOpen: !this.state.isSubmitFormOpen });
    }

    submitComment(data) {
        alert(JSON.stringify(data));
    }

    render() {
        return (
            <React.Fragment>
                <Button onClick={this.toggleCommentDlg}>Submit Comment...</Button>
                <Modal isOpen={this.state.isSubmitFormOpen} toggle={this.toggleCommentDlg}>
                    <ModalHeader toggle={this.toggleCommentDlg}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.submitComment(values)}>
                            <FormGroup>
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control-select">
                                    {[1, 2, 3, 4, 5].map(val => { return (<option>{val}</option>); })}
                                </Control.select>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name">Your name</Label>
                                <Control.text model=".name" id="name" name="name" className="form-control"
                                    validators={{ minLength: checkMinL(3), maxLength: checkMaxL(15) }}
                                />
                                <Errors className="text-danger" model=".name" show={true}
                                    messages={{
                                        minLength: 'Name is too short',
                                        maxLength: 'Name should be shorter',
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea model=".comment" id="comment" name="comment" className="form-control" rows={6} />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">Submit</Button>
                            </FormGroup>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }
}

/////////////////////////////////////////////////////
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
            <CommentForm />
        </div>;
    }
}

export default DishDetail;