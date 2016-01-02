// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// API URL
var apiUrl = 'https://central.wordcamp.org/wp-json/';
var centralApiUrl = 'https://central.wordcamp.org/wp-json/posts?type=wordcamp&filter[posts_per_page]=100';
var postUrl = apiUrl + 'posts';

//Load Component
var CentralBox = require('../modules/central.jsx');

// Component
var Post = React.createClass({
	render: function() {
		return(
			<div>
				<h3 className="page-header">{this.props.post.title}</h3>
				<div dangerouslySetInnerHTML={{__html: this.props.post.content}} />
			</div>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.postData.map(function (post) {
			return (
				<Post post={post} key={post.ID}/ >
			);
		});
		return (
			<div className="postList">
				<h2 className="page-header">WordCamp Central Informations</h2>
				{postNodes}
			</div>
		);
	}
});

var PostBox = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
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
			<PostList postData={this.state.data} />
		);
	}
});

// Render
ReactDOM.render(
	<PostBox apiUrl={postUrl}/>,
	document.getElementById('content')
);

ReactDOM.render(
	<CentralBox apiUrl={centralApiUrl}/>,
	document.getElementById('central')
);
