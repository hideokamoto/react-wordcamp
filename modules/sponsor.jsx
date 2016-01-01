// Load Reacts
var React = require('react');
var ReactDOM = require('react-dom');

// Component
var Sponsor = React.createClass({
	render: function() {
		return(
			<div>
				<h2 className="page-header">{this.props.post.title}</h2>
				<div dangerouslySetInnerHTML={{__html: this.props.post.content}} />
			</div>
		);
	}
});

var SponsorList = React.createClass({
	render: function() {
		var sponsorNodes = this.props.postData.map(function (post) {
			return (
				<Sponsor post={post} key={post.ID}/ >
			);
		});
		return (
			<ul className="postList list-group">
				{sponsorNodes}
			</ul>
		);
	}
});

var SponsorBox = React.createClass({
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
			<SponsorList postData={this.state.data} />
		);
	}
});

module.exports = SponsorBox;
