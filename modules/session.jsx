// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Session = React.createClass({
	render: function() {
		return(
			<div>
				<h2 className="page-header">{this.props.post.title}</h2>
				<div dangerouslySetInnerHTML={{__html: this.props.post.content}} />
			</div>
		);
	}
});

var SessionList = React.createClass({
	render: function() {
		var sessionNodes = this.props.postData.map(function (post) {
			return (
				<Session post={post} key={post.ID}/ >
			);
		});
		return (
			<ul className="postList list-group">
				{sessionNodes}
			</ul>
		);
	}
});

var SessionBox = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				//console.log(data);
				this.setState({data: data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},
	getInitialState: function() {
		return {
			data: []
		};
	},
	componentDidMount: function() {
		this.loadPostsFromServer();
	},
	render: function() {
		return (
			<SessionList postData={this.state.data} />
		);
	}
});

module.exports = SessionBox;
