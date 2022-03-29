/* eslint-disable react/react-in-jsx-scope */
import { Component } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import '../App.css';
import Menu from './Menu';
import Header from './Header';
import Footer from './Footer';
import Home from './Home';
import Contacts from './Contacts';
import DishDetail from './DishDetail';
import About from './About';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => {
    console.log('mapStateToProps');
    return {
        dishes: state.dishes,
        comments: state.comments,
        leaders: state.leaders,
        promos: state.promos,
    };
};

class Main extends Component {

    render() {

        const HomePage = () => {
            return (<Home
                dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                promo={this.props.promos.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
            );
        };

        const DishWithId = ({ match }) => {
            return (
                <DishDetail dish={this.props.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    comments={this.props.comments.filter((c) => c.dishId === parseInt(match.params.dishId, 10))}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/menu' component={() => <Menu dishes={this.props.dishes} />} />
                    <Route path="/menu/:dishId" component={DishWithId} />
                    <Route exact path='/contactus' component={Contacts} />
                    <Route exact path='/aboutus' component={() => <About leaders={this.props.leaders} />} />
                    <Redirect to="/home" />
                </Switch>
                <Footer />
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps)(Main));
