// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// API URL
var apiUrl = 'https://2015.us.wordcamp.org/wp-json/';
var postUrl = apiUrl + 'posts?filter[posts_per_page]=-1';
var sessionUrl = postUrl + '&type=wcb_session';
var speakerUrl = postUrl + '&type=wcb_speaker';
var sponsorUrl = postUrl + '&type=wcb_sponsor';

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
			url: this.props.apiUrl,
			dataType: 'json',
			cache: false,
			success: function(data) {
				console.log(data);
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
	<PostBox apiUrl={sessionUrl}/>,
	document.getElementById('session')
);
ReactDOM.render(
	<PostBox apiUrl={speakerUrl}/>,
	document.getElementById('speaker')
);
ReactDOM.render(
	<PostBox apiUrl={sponsorUrl}/>,
	document.getElementById('sponsor')
);
