/*globals document*/

var React = require('react');
var ApplicationStore = require('../stores/ApplicationStore');
var provideContext = require('fluxible/addons/provideContext');
var connectToStores = require('fluxible/addons/connectToStores');
var handleHistory = require('fluxible-router').handleHistory;
var NavBar = require('./NavBar');

var Application = React.createClass({
    render: function() {
        var Handler = this.props.currentRoute.get('handler');

        return (
            <div>
                <h1>Welcome to The Next Facebook!</h1>
                <NavBar />
                <Handler />
            </div>
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        const newProps = this.props;
        if (newProps.pageTitle === prevProps.pageTitle) {
            return;
        }
        document.title = newProps.pageTitle;
    }
});

module.exports = handleHistory(provideContext(connectToStores(
    Application,
    [ApplicationStore],
    function (stores, props) {
        var appStore = stores.ApplicationStore;
        return {
            currentPageName: appStore.getCurrentPageName(),
            pageTitle: appStore.getPageTitle(),
            pages: appStore.getPages()
        };
    }
)));
