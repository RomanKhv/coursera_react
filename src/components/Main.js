/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { actions } from 'react-redux-form';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import '../App.css';
import { postComment, fetchComments, fetchDishes, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import About from './About';
import Contacts from './Contacts';
import DishDetail from './DishDetail';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Menu from './Menu';

////////////////////////////////////////////////////////////

const mapStateToProps = state => {
    console.log('mapStateToProps');
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promos: state.promos,
    };
};

const mapDispatchToProps = (dispatch) => {
    console.log('mapDispatchToProps');
    // adds the following props to the component
    return ({
        postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
        fetchDishes: () => { dispatch(fetchDishes()); },
        fetchComments: () => { dispatch(fetchComments()); },
        fetchPromos: () => { dispatch(fetchPromos()); },
        fetchLeaders: () => { dispatch(fetchLeaders()); },
        resetFeedbackForm: () => dispatch(actions.reset('feedback')),
        postFeedback,
    });
};

////////////////////////////////////////////////////////////

class Main extends Component {

    componentDidMount() {
        console.log('Main::componentDidMount');
        this.props.fetchDishes();
        this.props.fetchComments();
        this.props.fetchPromos();
        this.props.fetchLeaders();
    }

    render() {

        const HomePage = () => {
            return (<Home
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMsg={this.props.dishes.errMSg}
                promo={this.props.promos.promos.filter((promo) => promo.featured)[0]}
                promosLoading={this.props.promos.isLoading}
                promosErrMsg={this.props.promos.errMSg}
                leader={this.props.leaders.leaders.filter((leader) => leader.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMsg={this.props.leaders.errMSg}
            />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={this.props.dishes.isLoading}
                    errMsg={this.props.dishes.errMSg}
                    comments={this.props.comments.comments.filter((c) => c.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMsg={this.props.comments.errMSg}
                    postComment={this.props.postComment}
                />
            );
        };

        return (
            <div>
                <Header />
                <TransitionGroup>
                    <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
                        <Switch>
                            <Route path='/home' component={HomePage} />
                            <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                            <Route path="/menu/:dishId" component={DishWithId} />
                            <Route exact path='/contactus' component={() => <Contacts resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />} />
                            <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                            <Redirect to="/home" />
                        </Switch>
                    </CSSTransition>
                </TransitionGroup>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
