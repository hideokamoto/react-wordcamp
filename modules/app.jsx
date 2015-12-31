// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// API URL
var apiUrl = 'https://kansai.wordcamp.org/2015/wp-json/';

// Component
var Post = React.createClass({
	render: function() {
		return(
			<div>
				<h2 className="page-header">{this.props.post.title}</h2>
				<div dangerouslySetInnerHTML={{__html: this.props.post.content}} />
			</div>
		);
	}
});

var PostList = React.createClass({
	render: function() {
		var postNodes = this.props.postData.map(function (post) {
		console.log(post);
			return (
				<Post post={post} key={post.ID}/ >
			);
		});
		return (
			<ul className="postList list-group">
				{postNodes}
			</ul>
		);
	}
});

var PostBox = React.createClass({
	loadPostsFromServer: function() {
		$.ajax({
			url: this.props.apiUrl + 'posts',
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
	<PostBox apiUrl={apiUrl}/>,
	document.getElementById('content')
);
